"use client";
import React from "react";

// Standard native video loop
export const SeamlessVideoLoop = ({ src }: { src: string }) => {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#050505]">
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          // Fade in gently only once on initial load
          animation: "fadeIn 1s ease-in-out forwards"
        }}
      />
    </div>
  );
};
