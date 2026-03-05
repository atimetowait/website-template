"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { thisBias } from "@/content/this-bias-is-beginning-to-show"

function isWhitespaceOrBr(node: ChildNode): boolean {
  if (node instanceof Element && node.tagName === "BR") return true
  if (node.nodeType === Node.TEXT_NODE && !node.textContent?.trim()) return true
  return false
}

function cleanHtml(raw: string): string {
  const tmp = document.createElement("div")
  tmp.innerHTML = raw

  for (const el of Array.from(tmp.querySelectorAll("h1, h2, p"))) {
    while (el.lastChild && isWhitespaceOrBr(el.lastChild)) {
      el.removeChild(el.lastChild)
    }
    while (el.firstChild && isWhitespaceOrBr(el.firstChild)) {
      el.removeChild(el.firstChild)
    }
  }

  const children = Array.from(tmp.childNodes)
  for (const node of children) {
    if (isWhitespaceOrBr(node)) {
      tmp.removeChild(node)
    }
  }

  return tmp.innerHTML
}

function trimPageEdges(pageHtml: string): string {
  const tmp = document.createElement("div")
  tmp.innerHTML = pageHtml

  while (tmp.firstChild && isWhitespaceOrBr(tmp.firstChild)) {
    tmp.removeChild(tmp.firstChild)
  }
  while (tmp.lastChild && isWhitespaceOrBr(tmp.lastChild)) {
    tmp.removeChild(tmp.lastChild)
  }

  return tmp.innerHTML
}

function breakLargeParagraphs(container: HTMLElement): void {
  for (const p of Array.from(container.querySelectorAll("p"))) {
    const brs = p.querySelectorAll("br")
    if (brs.length === 0) continue

    const fragments: DocumentFragment[] = []
    let current = document.createDocumentFragment()

    for (const child of Array.from(p.childNodes)) {
      if (child instanceof Element && child.tagName === "BR") {
        if (current.childNodes.length > 0) fragments.push(current)
        current = document.createDocumentFragment()
      } else {
        current.appendChild(child.cloneNode(true))
      }
    }
    if (current.childNodes.length > 0) fragments.push(current)

    if (fragments.length <= 1) continue

    const parent = p.parentNode!
    const wrapper = document.createElement("div")
    wrapper.className = "bias-para-group"
    for (const frag of fragments) {
      const hasText = frag.textContent?.trim()
      if (!hasText) continue
      const line = document.createElement("div")
      line.className = "bias-line"
      line.appendChild(frag)
      wrapper.appendChild(line)
    }
    parent.insertBefore(wrapper, p)
    parent.removeChild(p)
  }
}

function splitByHeight(html: string, maxHeight: number, containerWidth?: number): string[] {
  if (typeof document === "undefined") return [html]

  const cleaned = cleanHtml(html)
  const container = document.createElement("div")
  container.innerHTML = cleaned
  breakLargeParagraphs(container)
  const allNodes = Array.from(container.childNodes)

  const measure = document.createElement("div")
  measure.className = "prose prose-neutral dark:prose-invert max-w-none text-foreground this-bias-content"
  const widthCss = containerWidth
    ? `width: ${containerWidth}px;`
    : `max-width: 48rem; padding: 0 4rem;`
  measure.style.cssText = `
    position: absolute; top: 0; left: 0;
    visibility: hidden; pointer-events: none;
    ${widthCss}
  `
  document.body.appendChild(measure)

  function isHeading(node: ChildNode): boolean {
    return node instanceof Element && /^H[1-3]$/.test(node.tagName)
  }

  const pages: string[] = []
  let cursor = 0

  while (cursor < allNodes.length) {
    measure.innerHTML = ""
    let lastFit = cursor

    for (let i = cursor; i < allNodes.length; i++) {
      measure.appendChild(allNodes[i].cloneNode(true))
      if (measure.scrollHeight > maxHeight) {
        break
      }
      lastFit = i
    }

    if (lastFit < cursor) lastFit = cursor

    while (lastFit > cursor && isHeading(allNodes[lastFit])) {
      lastFit--
    }

    if (isHeading(allNodes[cursor]) && lastFit === cursor && cursor + 1 < allNodes.length) {
      lastFit = cursor + 1
    }

    const tmp = document.createElement("div")
    for (let i = cursor; i <= lastFit; i++) {
      tmp.appendChild(allNodes[i].cloneNode(true))
    }
    const trimmed = trimPageEdges(tmp.innerHTML)
    if (trimmed.trim()) pages.push(trimmed)
    cursor = lastFit + 1
  }

  document.body.removeChild(measure)
  return pages
}

function getInitialPage(): number {
  if (typeof window === "undefined") return 0
  const params = new URLSearchParams(window.location.search)
  const p = parseInt(params.get("page") ?? "", 10)
  return isNaN(p) || p < 1 ? 0 : p - 1
}

export function ThisBiasSection() {
  const router = useRouter()
  const [pages, setPages] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(getInitialPage)
  const [prevPage, setPrevPage] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const updateUrl = useCallback((page: number) => {
    const url = page === 0
      ? "/this-bias-is-beginning-to-show"
      : `/this-bias-is-beginning-to-show?page=${page + 1}`
    router.replace(url, { scroll: false })
  }, [router])

  const paginate = useCallback(() => {
    const headerHeight = 80
    const navHeight = 70
    const padding = 100
    const available = window.innerHeight - headerHeight - navHeight - padding
    const width = contentRef.current?.clientWidth
    setPages(splitByHeight(thisBias.content, available, width))
  }, [])

  useEffect(() => {
    paginate()
    const onResize = () => {
      setCurrentPage(0)
      updateUrl(0)
      paginate()
    }
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [paginate, updateUrl])

  useEffect(() => {
    if (pages.length > 0 && currentPage >= pages.length) {
      setCurrentPage(pages.length - 1)
      updateUrl(pages.length - 1)
    }
  }, [pages, currentPage, updateUrl])

  useEffect(() => {
    if (!menuOpen) return
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [menuOpen])

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next >= pages.length || next === currentPage || transitioning) return
      setPrevPage(currentPage)
      setCurrentPage(next)
      setTransitioning(true)
      setMenuOpen(false)
      updateUrl(next)

      timeoutRef.current = setTimeout(() => {
        setTransitioning(false)
        setPrevPage(null)
      }, 420)
    },
    [currentPage, pages.length, transitioning, updateUrl]
  )

  if (pages.length === 0) return null

  return (
    <div className="bias-reader-layout">
      <header className="bias-reader-header">
        <h1 className="text-4x1 font-mono">{thisBias.title}</h1>
      </header>

      <article
        ref={contentRef}
        className="bias-reader-body prose prose-neutral dark:prose-invert max-w-none text-foreground this-bias-content"
      >
        <div className="bias-page-container">
          {transitioning && prevPage !== null && (
            <div
              className="bias-page-outgoing"
              dangerouslySetInnerHTML={{ __html: pages[prevPage] }}
            />
          )}
          <div
            key={currentPage}
            className={`this-bias-page ${transitioning ? "bias-page-entering" : ""}`}
            dangerouslySetInnerHTML={{ __html: pages[currentPage] }}
          />
        </div>
      </article>

      <nav className="bias-page-nav">
        <div className="bias-page-nav-inner" ref={menuRef}>
          <button
            onClick={() => goTo(currentPage - 1)}
            disabled={currentPage === 0}
            className="bias-nav-arrow disabled:opacity-0 disabled:pointer-events-none"
            aria-label="Previous page"
          >
            &larr;
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bias-nav-counter"
          >
            {currentPage + 1} / {pages.length}
          </button>

          <button
            onClick={() => goTo(currentPage + 1)}
            disabled={currentPage === pages.length - 1}
            className="bias-nav-arrow disabled:opacity-0 disabled:pointer-events-none"
            aria-label="Next page"
          >
            &rarr;
          </button>

          {menuOpen && (
            <div className="bias-page-menu">
              {pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`bias-page-menu-item ${i === currentPage ? "active" : ""}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}
