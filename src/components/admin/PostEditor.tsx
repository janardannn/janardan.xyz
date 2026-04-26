"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Columns2, Eye, FileText, PanelLeftClose, PanelLeft, Sparkles } from "lucide-react";
import MarkdownArticleImage from "@/components/markdown/MarkdownArticleImage";
import { markdownUrlTransform, prepareMarkdownForDisplay } from "@/lib/markdownForDisplay";
import "highlight.js/styles/atom-one-dark-reasonable.min.css";

type PaneMode = "split" | "source" | "reading";

interface PostEditorProps {
  initialData?: {
    id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    readTime: string;
    tags: string[];
    category: string;
    featured: boolean;
    published: boolean;
    bannerImage?: string | null;
  };
}

function fieldLabel(text: string) {
  return (
    <span className="block text-[11px] font-medium uppercase tracking-wider text-zinc-500 mb-1.5">
      {text}
    </span>
  );
}

const inputClass =
  "w-full rounded-md border border-zinc-700/90 bg-zinc-900/60 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 shadow-sm focus:border-violet-500/60 focus:outline-none focus:ring-1 focus:ring-violet-500/40 transition-colors";

const textareaClass =
  `${inputClass} resize-y min-h-[4.5rem] leading-relaxed`;

export default function PostEditor({ initialData }: PostEditorProps) {
  const router = useRouter();
  const isEditing = !!initialData?.id;

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [readTime, setReadTime] = useState(initialData?.readTime || "");
  const [bannerImage, setBannerImage] = useState(initialData?.bannerImage || "");
  const [tagsInput, setTagsInput] = useState(initialData?.tags.join(", ") || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [published, setPublished] = useState(initialData?.published || false);
  const [paneMode, setPaneMode] = useState<PaneMode>("split");
  const [propsOpen, setPropsOpen] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const processedMarkdown = useMemo(() => prepareMarkdownForDisplay(content), [content]);

  function generateSlug(text: string) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!isEditing && !slug) {
      setSlug(generateSlug(value));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);

    const body = { title, slug, excerpt, content, readTime, tags, category, featured, published, bannerImage };

    const url = isEditing ? `/api/posts/${initialData!.id}` : "/api/posts";
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError((data as { error?: string }).error || "Something went wrong");
      setSaving(false);
      return;
    }

    if (isEditing) {
      router.refresh();
      setSaving(false);
      return;
    }

    const created = (await res.json()) as { id?: string };
    if (created?.id) {
      router.replace(`/admin/edit/${created.id}`);
    }
    router.refresh();
    setSaving(false);
  }

  const showSource = paneMode === "split" || paneMode === "source";
  const showReading = paneMode === "split" || paneMode === "reading";

  const propertiesPanel = (
    <div className="flex flex-col gap-5 p-4 sm:p-5">
      <div className="flex items-center gap-2 text-zinc-400">
        <Sparkles className="h-3.5 w-3.5 text-violet-400/90" />
        <span className="text-[11px] font-semibold uppercase tracking-widest">Properties</span>
      </div>

      {error ? (
        <div className="rounded-md border border-red-500/25 bg-red-950/40 px-3 py-2 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      <div>
        {fieldLabel("Slug")}
        <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className={inputClass} required />
      </div>
      <div>
        {fieldLabel("Excerpt")}
        <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className={textareaClass} rows={3} required />
      </div>
      <div>
        {fieldLabel("Banner Image URL")}
        <input type="text" value={bannerImage} onChange={(e) => setBannerImage(e.target.value)} className={inputClass} placeholder="https://..." />
      </div>
      <div>
        {fieldLabel("Category")}
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass} required />
      </div>
      <div>
        {fieldLabel("Read time")}
        <input
          type="text"
          value={readTime}
          onChange={(e) => setReadTime(e.target.value)}
          placeholder="5 min read"
          className={inputClass}
          required
        />
      </div>
      <div>
        {fieldLabel("Tags")}
        <input
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="comma separated"
          className={inputClass}
        />
      </div>
      <div className="flex flex-col gap-3 pt-1 border-t border-zinc-800/80">
        <label className="flex cursor-pointer items-center gap-3 text-sm text-zinc-300">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-600 bg-zinc-900 text-violet-500 focus:ring-violet-500/50"
          />
          Featured
        </label>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-zinc-300">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-600 bg-zinc-900 text-violet-500 focus:ring-violet-500/50"
          />
          Published
        </label>
      </div>
    </div>
  );

  const modeButton = (mode: PaneMode, label: string, icon: React.ReactNode) => (
    <button
      key={mode}
      type="button"
      onClick={() => setPaneMode(mode)}
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
        paneMode === mode
          ? "bg-zinc-800 text-zinc-100 ring-1 ring-zinc-600/80 shadow-sm"
          : "text-zinc-500 hover:bg-zinc-800/60 hover:text-zinc-300"
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-h-[calc(100dvh-5.5rem)] flex-col rounded-xl border border-zinc-800/90 bg-zinc-900/25 shadow-[inset_0_1px_0_0_oklch(1_0_0/4%)] -mx-1 sm:-mx-2"
    >
      <header className="sticky top-14 z-20 flex flex-col gap-3 border-b border-zinc-800/90 bg-zinc-950/95 px-3 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-zinc-950/80 sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <button
            type="button"
            onClick={() => setPropsOpen((o) => !o)}
            className="hidden shrink-0 rounded-md p-2 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200 lg:inline-flex"
            title={propsOpen ? "Hide properties" : "Show properties"}
          >
            {propsOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
          </button>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Note title…"
            className="min-w-0 flex-1 border-0 bg-transparent text-lg font-semibold tracking-tight text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-0 sm:text-xl"
            required
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 sm:justify-end">
          <div className="flex items-center rounded-lg bg-zinc-900/80 p-0.5 ring-1 ring-zinc-800/90">
            {modeButton("source", "Source", <FileText className="h-3.5 w-3.5 opacity-80" />)}
            {modeButton("split", "Split", <Columns2 className="h-3.5 w-3.5 opacity-80" />)}
            {modeButton("reading", "Reading", <Eye className="h-3.5 w-3.5 opacity-80" />)}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="rounded-md px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400 transition-colors"
            >
              {saving ? "Saving…" : isEditing ? "Save" : "Publish"}
            </button>
          </div>
        </div>
      </header>

      <div className="flex min-h-0 min-h-[28rem] flex-1 flex-col lg:flex-row">
        <aside
          className={`flex w-full shrink-0 flex-col border-b border-zinc-800/90 bg-zinc-950/40 lg:w-[17.5rem] lg:border-b-0 lg:border-r lg:border-zinc-800/90 ${propsOpen ? "" : "lg:hidden"}`}
        >
          <details className="group border-b border-zinc-800/80 lg:hidden" open>
            <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-zinc-400 marker:hidden [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between">
                Properties
                <span className="text-xs text-zinc-600 group-open:rotate-180 transition-transform">▼</span>
              </span>
            </summary>
            <div className="border-t border-zinc-800/60">{propertiesPanel}</div>
          </details>
          <div className="hidden max-h-[calc(100dvh-12rem)] flex-1 overflow-y-auto lg:block">{propertiesPanel}</div>
        </aside>

        <div
          className={`grid min-h-0 flex-1 ${
            paneMode === "split"
              ? "grid-rows-2 lg:grid-cols-2 lg:grid-rows-1"
              : "grid-cols-1 grid-rows-1"
          }`}
        >
          {showSource ? (
            <div className="flex min-h-0 min-h-[14rem] flex-col border-b border-zinc-800/80 bg-zinc-950/30 lg:min-h-0 lg:border-b-0 lg:border-r lg:border-zinc-800/80">
              <div className="flex items-center justify-between border-b border-zinc-800/50 px-3 py-2">
                <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-600">Markdown</span>
                <span className="text-[11px] text-zinc-600 tabular-nums">{content.length} chars</span>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                spellCheck={false}
                className="min-h-0 flex-1 w-full resize-none border-0 bg-transparent px-4 py-4 font-mono text-[14px] leading-[1.65] text-zinc-200 caret-violet-400 placeholder:text-zinc-600 focus:outline-none focus:ring-0 sm:px-6 sm:py-6 sm:text-[15px]"
                placeholder="# Start writing&#10;&#10;Obsidian-style `![[image.png]]` embeds are supported."
                required
              />
            </div>
          ) : null}

          {showReading ? (
            <div className="flex min-h-0 min-h-[14rem] flex-col overflow-hidden bg-zinc-950/40 lg:min-h-0 relative z-10">
              <div className="flex shrink-0 items-center justify-between border-b border-zinc-800/50 px-3 py-2">
                <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-600">Reading</span>
              </div>
              <div className="markdown-reading prose prose-invert min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[[rehypeHighlight, { detect: true }]]}
                  urlTransform={markdownUrlTransform}
                  components={{ img: MarkdownArticleImage }}
                >
                  {processedMarkdown}
                </ReactMarkdown>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </form>
  );
}
