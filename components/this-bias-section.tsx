"use client"

import { useState, useEffect, useRef } from "react"
import { thisBias } from "@/content/this-bias-is-beginning-to-show"

interface ContentBlock {
  type: "chapter" | "prose" | "break"
  html: string
}

function isEmptyBlock(el: Element): boolean {
  if (el.tagName === "BR") return true
  if (el.tagName !== "P") return false
  const text = el.textContent?.replace(/[\s\u00A0]/g, "") || ""
  return text.length === 0
}

function parseContentBlocks(html: string): ContentBlock[] {
  if (typeof document === "undefined") return []
  const container = document.createElement("div")
  container.innerHTML = html
  const blocks: ContentBlock[] = []
  for (const child of Array.from(container.children)) {
    if (child.tagName === "H1") {
      blocks.push({ type: "chapter", html: child.innerHTML })
    } else if (isEmptyBlock(child)) {
      blocks.push({ type: "break", html: "" })
    } else {
      blocks.push({ type: "prose", html: child.outerHTML })
    }
  }
  return blocks
}

function RevealBlock({ block }: { block: ContentBlock }) {
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (block.type === "chapter") {
    return (
      <div ref={ref} className={`bias-chapter ${revealed ? "bias-visible" : ""}`}>
        <div className="bias-chapter-rule" aria-hidden="true" />
        <h1
          className="bias-chapter-title"
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={`bias-block ${revealed ? "bias-visible" : ""}`}
      dangerouslySetInnerHTML={{ __html: block.html }}
    />
  )
}

export function ThisBiasSection() {
  const [blocks, setBlocks] = useState<ContentBlock[]>([])
  const [progress, setProgress] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setBlocks(parseContentBlocks(thisBias.content))
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el
      setProgress(
        scrollHeight > clientHeight ? scrollTop / (scrollHeight - clientHeight) : 0
      )
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [])

  if (blocks.length === 0) return null

  return (
    <div className="bias-wrapper">
      <div className="bias-scroll" ref={scrollRef}>
        <div className="bias-progress-track">
          <div
            className="bias-progress-fill"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>

        <header className="bias-hero">
          <h1 className="bias-hero-title">{thisBias.title}</h1>
          <div className="bias-hero-hint" aria-hidden="true">
            <span className="bias-hero-arrow">&#8595;</span>
          </div>
        </header>

        <article className="bias-article prose prose-neutral dark:prose-invert max-w-none text-foreground this-bias-content">
          {blocks.map((block, i) =>
            block.type === "break"
              ? <div key={i} className="bias-line-break" aria-hidden="true" />
              : <RevealBlock key={i} block={block} />
          )}
        </article>

        <div className="bias-end" aria-hidden="true" />
      </div>
    </div>
  )
}
