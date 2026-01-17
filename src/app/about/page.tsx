"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { useEffect, useRef, useState } from "react";

// ========================================
// DESIGN SYSTEM - kotail トンマナ準拠
// ========================================
// Primary: #00a0e9
// Gradient: #0B4A6B → #0A6EA8 → #15B1C9
// Accent: #4E8DA5
// Background: bg-slate-50, bg-white
// Border Radius: rounded-2xl
// ========================================

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function Section({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@400;600;700&display=swap');

        .font-serif-jp {
          font-family: 'Noto Serif JP', serif;
        }
        .font-sans-jp {
          font-family: 'Noto Sans JP', sans-serif;
        }
      `}</style>

      <div className="min-h-screen bg-white font-sans-jp">
        <Header />

        {/* ========================================
            HERO - kotailグラデーション
        ======================================== */}
        <section className="relative bg-gradient-to-br from-[#0B4A6B] via-[#0A6EA8] to-[#15B1C9] overflow-hidden">
          {/* Subtle pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.2),transparent_50%)]" />
          </div>

          <div className="max-w-4xl mx-auto px-6 py-32 md:py-40 text-center relative">
            <Section>
              <p className="text-sky-200 text-sm tracking-[0.2em] uppercase mb-6">
                About
              </p>
            </Section>

            <Section delay={100}>
              <h1 className="font-serif-jp text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-8">
                このサイトについて
              </h1>
            </Section>

            <Section delay={200}>
              <p className="text-xl md:text-2xl text-sky-100 leading-relaxed max-w-2xl mx-auto">
                コタエルは、口コミや評判に対して<br className="hidden md:block" />
                <span className="text-white font-medium">企業が公式な見解を残せる</span>第三者メディアです。
              </p>
            </Section>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>

        {/* ========================================
            MAIN CONTENT - 読みやすさ最優先
        ======================================== */}
        <main className="max-w-3xl mx-auto px-6">

          {/* INTRO - 重要な前提 */}
          <section className="py-20 border-b border-slate-100">
            <Section>
              <div className="bg-slate-50 border-l-4 border-[#4E8DA5] pl-6 py-6 rounded-r-2xl">
                <p className="text-lg text-slate-700 leading-relaxed mb-3">
                  削除や反論を目的とする場では<strong className="text-slate-900">ありません。</strong>
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  また、企業を一方的に擁護するサイトでも<strong className="text-slate-900">ありません。</strong>
                </p>
              </div>
            </Section>
          </section>

          {/* MISSION - コアメッセージ */}
          <section className="py-20 border-b border-slate-100">
            <Section>
              <p className="text-lg text-slate-600 leading-loose mb-10 text-center">
                過去に書かれた口コミや評判に対して、<br />
                その<em className="not-italic text-slate-800 font-medium">背景</em>、
                <em className="not-italic text-slate-800 font-medium">当時の状況</em>、
                <em className="not-italic text-slate-800 font-medium">現在の実態</em>を<br />
                企業自身の言葉で整理し、残していく。
              </p>
            </Section>

            <Section delay={100}>
              <h2 className="font-serif-jp text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900 text-center leading-snug mb-6">
                見る人が「正しい判断」を<br />できる状態をつくる。
              </h2>
              <p className="text-center text-slate-500">
                それが、コタエルの役割です。
              </p>
            </Section>
          </section>

          {/* WHY - なぜ必要か */}
          <section className="py-20 border-b border-slate-100">
            <Section>
              <p className="text-[#00a0e9] text-sm font-medium tracking-wider uppercase mb-4">Why</p>
              <h2 className="font-serif-jp text-2xl md:text-3xl font-semibold text-slate-900 mb-10">
                なぜ、コタエルが必要なのか
              </h2>
            </Section>

            <Section delay={100}>
              <div className="space-y-8 text-lg text-slate-700 leading-loose">
                <p>
                  インターネット上の口コミや評判は、一度書かれると、<strong className="text-slate-900">半永久的に残り続けます。</strong>
                </p>

                <p className="text-base text-slate-500 pl-4 border-l-2 border-slate-200">
                  過去の一時点の話、個人の体験や感情に基づくもの、すでに改善された内容であることも少なくありません。
                </p>

                <p>
                  それでも現実には、口コミは検索結果に残り、<span className="text-rose-600 font-medium">採用や購買の意思決定に強い影響を与え続けます。</span>
                </p>

                <p>
                  企業側が「今は違う」「すでに改善している」と思っていても、それを整理して伝える場所は、ほとんど存在していませんでした。
                </p>
              </div>
            </Section>

            <Section delay={200}>
              <div className="mt-12 bg-gradient-to-r from-[#0B4A6B] to-[#0A6EA8] rounded-2xl p-8 text-center">
                <p className="text-lg md:text-xl text-white font-medium">
                  コタエルは、その空白を埋めるために生まれました。
                </p>
              </div>
            </Section>
          </section>

          {/* WHAT - できること */}
          <section className="py-20 border-b border-slate-100">
            <Section>
              <p className="text-[#00a0e9] text-sm font-medium tracking-wider uppercase mb-4">What</p>
              <h2 className="font-serif-jp text-2xl md:text-3xl font-semibold text-slate-900 mb-6">
                コタエルでできること
              </h2>
              <p className="text-lg text-slate-600 mb-10">
                第三者サイト上に存在する口コミを起点に、企業が公式な見解を残すことができます。
              </p>
            </Section>

            <Section delay={100}>
              <ul className="space-y-4 mb-12">
                {[
                  "事実として何が起きていたのか",
                  "なぜそのような状況になったのか",
                  "現在はどうなっているのか",
                  "どのような改善が行われているのか",
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#00a0e9] text-white text-sm font-medium flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-lg text-slate-700">{text}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section delay={200}>
              <div className="bg-sky-50 rounded-2xl p-6 border border-sky-100">
                <p className="text-slate-700 leading-relaxed">
                  感情的な主張や否定ではなく、<strong className="text-[#00a0e9]">事実と経緯を整理して重ねる</strong>ことを重視しています。その回答は、判断材料として誰でも閲覧できる形で公開されます。
                </p>
              </div>
            </Section>
          </section>

          {/* VISION - 目指すもの */}
          <section className="py-20 border-b border-slate-100">
            <Section>
              <p className="text-[#00a0e9] text-sm font-medium tracking-wider uppercase mb-4">Vision</p>
              <h2 className="font-serif-jp text-2xl md:text-3xl font-semibold text-slate-900 mb-6">
                コタエルが目指しているもの
              </h2>
              <p className="text-base text-slate-500 mb-10">
                口コミを消すことでも、評価を操作することでもありません。
              </p>
            </Section>

            <Section delay={100}>
              <div className="bg-gradient-to-br from-[#0B4A6B] via-[#0A6EA8] to-[#15B1C9] rounded-2xl p-8 md:p-10 text-center mb-12">
                <p className="font-serif-jp text-xl md:text-2xl lg:text-3xl text-white font-medium leading-relaxed">
                  過去の情報だけで、<br />誰かの意思決定が歪んでしまう<br />状態を減らすこと。
                </p>
              </div>
            </Section>

            <Section delay={200}>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { label: "企業にとっては", value: "説明責任を果たすための場所" },
                  { label: "ユーザーにとっては", value: "判断の解像度を上げるための場所" },
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
                    <p className="text-sm text-slate-500 mb-2">{item.label}</p>
                    <p className="text-lg font-semibold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </Section>
          </section>

          {/* VALUE STATEMENT */}
          <section className="py-20 border-b border-slate-100">
            <Section>
              <div className="text-center">
                <p className="text-slate-500 mb-4">「書かれたまま」で終わらせない。</p>
                <p className="font-serif-jp text-xl md:text-2xl font-semibold text-slate-900 mb-4">
                  「今どうなのか」まで含めて、<br />判断できる状態をつくる。
                </p>
                <p className="text-slate-500">それが、コタエルの価値です。</p>
              </div>
            </Section>
          </section>

          {/* FOR BUSINESS */}
          <section className="py-20 border-b border-slate-100">
            <Section>
              <p className="text-[#00a0e9] text-sm font-medium tracking-wider uppercase mb-4">For Business</p>
              <h2 className="font-serif-jp text-2xl md:text-3xl font-semibold text-slate-900 mb-10">
                企業の方へ
              </h2>
            </Section>

            <Section delay={100}>
              <div className="space-y-6 text-lg text-slate-700 leading-loose">
                <p>
                  コタエルは、<strong className="text-slate-900">炎上時や悪評対策のためだけのサービスではありません。</strong>
                </p>

                <ul className="space-y-3 pl-4 border-l-2 border-[#00a0e9]/30">
                  {[
                    "過去の口コミが採用に影響している",
                    "事実と異なる情報が残り続けている",
                    "改善したことを、正しく伝える場所がない",
                  ].map((text, i) => (
                    <li key={i} className="text-slate-600">• {text}</li>
                  ))}
                </ul>

                <p>
                  そうした課題を感じたとき、公式な形で整理し、残す選択肢としてコタエルを使っていただけます。
                </p>

                <p className="font-serif-jp text-xl font-semibold text-slate-900 pt-4">
                  削除できないからこそ、放置しない。<br />
                  <span className="text-slate-500 font-normal text-base">そのための手段です。</span>
                </p>
              </div>
            </Section>
          </section>

          {/* FOR USERS */}
          <section className="py-20 border-b border-slate-100">
            <Section>
              <p className="text-[#00a0e9] text-sm font-medium tracking-wider uppercase mb-4">For Users</p>
              <h2 className="font-serif-jp text-2xl md:text-3xl font-semibold text-slate-900 mb-10">
                見ているユーザーの方へ
              </h2>
            </Section>

            <Section delay={100}>
              <div className="space-y-6 text-lg text-slate-700 leading-loose">
                <p>
                  このサイトに掲載されている内容は、<strong className="text-slate-900">企業が自らの責任で公開している公式見解</strong>です。
                </p>

                <p className="text-slate-600">
                  口コミや評判そのものを否定するものではなく、当時の背景や現在の状況を補足するための情報です。
                </p>

                <div className="bg-sky-50 rounded-2xl p-6 border border-sky-100">
                  <p className="text-slate-700">
                    一つの声だけでなく、その後に何が起き、今どうなっているのか。<span className="text-[#00a0e9] font-medium">その情報も含めて、判断してもらうことを前提としています。</span>
                  </p>
                </div>
              </div>
            </Section>
          </section>

          {/* CLOSING */}
          <section className="py-24">
            <Section>
              <h2 className="font-serif-jp text-2xl md:text-3xl font-semibold text-slate-900 text-center mb-12">
                最後に
              </h2>
            </Section>

            <Section delay={100}>
              <div className="text-center space-y-8">
                <p className="text-lg text-slate-600 leading-loose">
                  コタエルは、口コミと企業の間に、<br />
                  <strong className="text-slate-900">「説明」と「更新」</strong>を置くためのメディアです。
                </p>

                <div className="flex items-center justify-center gap-4 text-lg md:text-xl text-slate-700">
                  <span className="px-4 py-2 bg-slate-100 rounded-xl">書かれた過去</span>
                  <span className="text-[#00a0e9] font-bold text-2xl">⟷</span>
                  <span className="px-4 py-2 bg-slate-100 rounded-xl">今の実態</span>
                </div>

                <p className="text-lg text-slate-600">
                  その間にある情報を、ユーザーに<strong className="text-[#00a0e9]">「コタエル」</strong>
                </p>

                <div className="pt-6">
                  <p className="font-serif-jp text-xl md:text-2xl font-semibold text-slate-900">
                    それがコタエルの役割です。
                  </p>
                </div>
              </div>
            </Section>

            <Section delay={200}>
              <div className="mt-16 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-slate-500 hover:text-[#00a0e9] transition-colors text-sm"
                >
                  <span>←</span>
                  <span>トップページへ戻る</span>
                </Link>
              </div>
            </Section>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="border-t border-slate-100 py-10 text-center">
          <div className="text-sm text-slate-400">
            <a
              href="https://www.genai-ai.co.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00a0e9] transition-colors"
            >
              運営会社
            </a>
            <span className="mx-3">·</span>
            <span>© 2026 コタエル Project.</span>
          </div>
        </footer>
      </div>
    </>
  );
}
