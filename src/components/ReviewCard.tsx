"use client";

import { useEffect, useRef, useState } from "react";

interface ReviewCardProps {
  date: string;
  question: string;
  answer: string;
  maxLines?: number;
}

export default function ReviewCard({
  date,
  question,
  answer,
  maxLines = 5,
}: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandable, setIsExpandable] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState(120);
  const [fullHeight, setFullHeight] = useState(0);
  const contentRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const contentEl = contentRef.current;
    if (!contentEl) return;

    const measure = () => {
      const styles = window.getComputedStyle(contentEl);
      const lineHeightValue = parseFloat(styles.lineHeight);
      const lineHeight = Number.isNaN(lineHeightValue) ? 24 : lineHeightValue;
      const nextCollapsedHeight = lineHeight * maxLines;
      const nextFullHeight = contentEl.scrollHeight;

      setCollapsedHeight(nextCollapsedHeight);
      setFullHeight(nextFullHeight);
      setIsExpandable(nextFullHeight > nextCollapsedHeight + 1);

      if (nextFullHeight <= nextCollapsedHeight + 1) {
        setIsExpanded(false);
      }
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(contentEl);

    return () => observer.disconnect();
  }, [answer, maxLines]);

  const isOpen = !isExpandable || isExpanded;
  const maxHeightStyle = isOpen
    ? fullHeight
      ? `${fullHeight}px`
      : "none"
    : `${collapsedHeight}px`;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      {/* 質問者セクション */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 mt-1 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
          <svg
            className="w-9 h-9"
            viewBox="0 0 354.879 354.879"
            aria-hidden="true"
          >
            <g>
              <g>
                <path
                  fill="#545465"
                  d="M288.076,141.27c0,56.17-43.91,89.12-43.91,89.12l-66.73-56.72l-66.72,56.72c0,0-43.92-34.617-43.92-89.12c0-46.4,13.86-85.76,38.34-111.06c4.62-4.78,9.62-9.05,14.97-12.77C136.196,6.24,155.506,0,177.436,0c21.94,0,41.24,6.24,57.33,17.44c4.83,3.35,9.37,7.16,13.6,11.37C273.696,54.05,288.076,94.02,288.076,141.27z"
                />
                <path
                  fill="#494857"
                  d="M248.366,28.81c-4.23-4.21-8.77-8.02-13.6-11.37C218.677,6.24,199.378,0,177.439,0v173.672l66.727,56.718c0,0,43.91-32.95,43.91-89.12C288.076,94.02,273.696,54.05,248.366,28.81z"
                />
              </g>
              <g>
                <path
                  fill="#F3D8B6"
                  d="M220.628,263.334c0,0-14.458-18.417-14.458-81.376h-26.23h-5.002h-26.23c0,62.959-14.458,81.376-14.458,81.376c0,47.368,28.832,48.824,40.688,53.239v1.537c0,0,0.922-0.188,2.501-0.68c1.579,0.492,2.501,0.68,2.501,0.68v-1.537C191.796,312.158,220.628,310.702,220.628,263.334z"
                />
                <path
                  fill="#EEC8A2"
                  d="M206.17,181.958h-26.23h-2.501V317.43c1.579,0.492,2.501,0.68,2.501,0.68v-1.537c11.856-4.414,40.688-5.871,40.688-53.239C220.628,263.334,206.17,244.917,206.17,181.958z"
                />
              </g>
              <g>
                <path
                  fill="#682234"
                  d="M294.421,314.198v40.681H60.458v-40.681c0-30.431,14.377-56.963,37.605-70.913c6.043-3.641,12.69-6.43,19.844-8.196c5.953-1.488,12.254-2.272,18.842-2.272l40.691,24.002l40.691-24.002c6.588,0,12.889,0.784,18.842,2.272c7.154,1.766,13.802,4.554,19.844,8.196C280.044,257.235,294.421,283.767,294.421,314.198z"
                />
                <path
                  fill="#521627"
                  d="M256.816,243.285c-6.042-3.641-12.69-6.43-19.844-8.196c-5.953-1.488-12.254-2.272-18.842-2.272l-40.691,24.002v98.06h116.982v-40.681C294.421,283.767,280.044,257.235,256.816,243.285z"
                />
              </g>
              <g>
                <path
                  fill="#F3DBC4"
                  d="M230.186,115.21l-22.73-22.72l-16,16l-16-16l-22.72,22.72h-39.477c0.623,23.341,4.264,44.877,8.525,52.744c9.042,16.694,29.221,38.957,55.657,38.957c26.431,0,46.607-22.262,55.652-38.957c4.261-7.867,7.903-29.403,8.526-52.744L230.186,115.21L230.186,115.21z"
                />
                <path
                  fill="#EDCEAE"
                  d="M230.186,115.21l-22.73-22.72l-16,16l-14.017-14.017V206.91h0.002c26.431,0,46.607-22.262,55.652-38.957c4.261-7.867,7.903-29.403,8.526-52.744H230.186z"
                />
              </g>
              <path
                fill="#DEDDE0"
                d="M233.204,335.879h-10.333c-9.205,0-16.667-7.462-16.667-16.667v-22h43.667v22C249.871,328.417,242.409,335.879,233.204,335.879z"
              />
              <g>
                <path
                  fill="#FFFFFF"
                  d="M223.324,234.118c-3.59-2.949-8.721-4.162-14.417-3.806l-31.468,26.507l-31.468-26.507c-5.697-0.356-10.827,0.857-14.417,3.806c-8.592,7.058-5.109,31.957,7.779,42.543c12.507,10.273,29.273-3.09,38.106-9.371c8.833,6.281,25.6,19.644,38.106,9.371C228.434,266.075,231.916,241.175,223.324,234.118z"
                />
                <path
                  fill="#DEDDE0"
                  d="M223.324,234.118c-3.59-2.949-8.721-4.162-14.417-3.806l-31.468,26.507v10.472c8.833,6.281,25.6,19.644,38.106,9.371C228.434,266.075,231.916,241.175,223.324,234.118z"
                />
              </g>
            </g>
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-sm text-gray-500">{date}</span>
          <p className="text-lg font-bold text-gray-900 mt-1">{question}</p>
        </div>
      </div>

      {/* 企業回答セクション */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 mt-1 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg
            className="w-6 h-6 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <div className="bg-slate-50 rounded-lg py-4 pr-4 pl-0 text-base text-gray-700 leading-relaxed">
            <div
              className="relative overflow-hidden transition-all duration-300 ease-in-out"
              style={{ maxHeight: maxHeightStyle }}
            >
              <p ref={contentRef} className="whitespace-pre-wrap">
                {answer}
              </p>
              {!isOpen && isExpandable && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-50 to-transparent" />
              )}
            </div>

            {isExpandable && (
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-teal-600 transition hover:text-teal-700 hover:underline"
                aria-expanded={isOpen}
              >
                {isOpen ? "閉じる" : "もっと見る"}
                <svg
                  className={`h-4 w-4 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
