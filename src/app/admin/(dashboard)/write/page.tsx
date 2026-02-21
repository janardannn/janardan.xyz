import PostEditor from "@/components/admin/PostEditor";

export default function WritePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">New Post</h1>
      <PostEditor />
    </div>
  );
}
