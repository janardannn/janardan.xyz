"use client";

import { useState, type CSSProperties } from "react";
import { markdownUrlTransform } from "@/lib/markdownForDisplay";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { AnimatePresence } from "framer-motion";
import { track } from "@/lib/tracker";

type MarkdownImgProps = React.ImgHTMLAttributes<HTMLImageElement> & { node?: unknown };

export default function MarkdownArticleImage(props: MarkdownImgProps) {
  const { node: _node, src, alt, title, className, width, height } = props;
  const [isOpen, setIsOpen] = useState(false);
  
  // Clean the src: remove accidental whitespace or trailing brackets
  let rawSrc = (src || "").trim().replace(/\]+$/, "");
  
  if (rawSrc.includes(" ")) {
    rawSrc = rawSrc.replace(/ /g, "%20");
  }

  const transformedSrc = markdownUrlTransform(rawSrc);

  const altParts = (alt || "").split("|");
  const type = altParts[0]; // 'image' or 'video' or custom alt
  const widthStr = altParts[1];
  const heightStr = altParts[2];

  const isVideo = type === 'video' || /\.(mp4|webm|ogg|mov)$/i.test(transformedSrc);

  const style: CSSProperties = {
    maxWidth: "100%",
    margin: "2rem auto",
    display: "block",
    borderRadius: "0.75rem",
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  if (!isVideo) {
    style.cursor = "zoom-in";
  }

  if (widthStr) {
    if (widthStr.endsWith("%")) {
      style.width = widthStr;
    } else if (!isNaN(Number(widthStr))) {
      style.width = `${widthStr}px`;
    } else {
      style.width = widthStr;
    }
  }

  if (heightStr) {
    if (heightStr.endsWith("%")) {
      style.height = heightStr;
    } else if (!isNaN(Number(heightStr))) {
      style.height = `${heightStr}px`;
    } else {
      style.height = heightStr;
    }
    style.objectFit = "cover";
  }

  if (!transformedSrc) {
    return (
      <span className="my-8 block rounded-xl border border-dashed border-border bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground">
        Missing or invalid media URL
      </span>
    );
  }

  if (isVideo) {
    return (
      <video
        src={transformedSrc}
        controls
        muted
        loop
        playsInline
        className={`${className} overflow-hidden`}
        style={style}
        title={title || "Video player"}
      />
    );
  }

  const handleOpen = () => {
    setIsOpen(true);
    track("image_click", "engagement", { 
      src: transformedSrc, 
      alt: type,
      action: "open_lightbox"
    });
  };

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={type === 'image' ? '' : type}
        className={`${className} hover:scale-[1.01] hover:shadow-2xl`}
        height={height}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        src={transformedSrc}
        style={style}
        title={title || type || "Click to enlarge"}
        width={width}
        onClick={handleOpen}
      />

      <AnimatePresence>
        {isOpen && (
          <ImageLightbox
            images={[transformedSrc]}
            startIndex={0}
            alt={type}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
