"use client";
import React from "react";

// Simplified and highly performant VideoLoop for ping-pong videos
export const SeamlessVideoLoop = ({ src }: { src: string }) => {
  return (
    <div className="absolute inset-0 w-full h-full bg-black">
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        style={{
          // Fade in gently on load
          animation: "fadeIn 2s ease-in-out forwards"
        }}
      />
    </div>
  );
};
