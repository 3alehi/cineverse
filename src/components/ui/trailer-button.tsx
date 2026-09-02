"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Dialog } from "./dialog";
import { buttonVariants } from "./button";
import { cn } from "@/lib/cn";

interface TrailerButtonProps {
  videoKey: string | null;
  title: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export function TrailerButton({
  videoKey,
  title,
  variant = "primary",
  className,
}: TrailerButtonProps) {
  const [open, setOpen] = useState(false);

  if (!videoKey) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(buttonVariants({ variant }), className)}
      >
        <Play className="h-4 w-4 fill-current" aria-hidden="true" />
        Watch Trailer
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} title={`${title} — Trailer`}>
        <div className="aspect-video w-full bg-black">
          {open && (
            <iframe
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
              title={`${title} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          )}
        </div>
      </Dialog>
    </>
  );
}
