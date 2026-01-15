"use client";

interface HeroBannerProps {
  imageUrl?: string;
  tagline?: string;
}

export default function HeroBanner({
  imageUrl,
  tagline = "動かすのは、ココロとミライ。",
}: HeroBannerProps) {
  return (
    <div className="relative w-full h-48 md:h-64 overflow-hidden">
      {imageUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://jjshrbvqpmiwsefeizqy.supabase.co/storage/v1/object/public/company-images/genai-hero.png)` }}
        />
      )}
    </div>
  );
}
