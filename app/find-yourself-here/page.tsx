"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Menu, X, RefreshCw } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { generatePoeticLine } from "@/lib/poetic-generator"

const sidebarWidth = 320

export default function FindYourselfHerePage() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [lineData, setLineData] = useState<{ line: string; theme: string } | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  // Generate initial lines on mount
  useEffect(() => {
    generateNewLines()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const generateNewLines = () => {
    setIsGenerating(true)
    // Small delay for visual feedback
    setTimeout(() => {
      const newLine = generatePoeticLine()
      setLineData(newLine)
      setIsGenerating(false)
    }, 100)
  }

  return (
    <div className="flex min-h-screen">
      {/* Mobile menu toggle button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-6 left-6 z-50 md:hidden bg-background border border-border rounded-lg p-2.5 hover:bg-muted shadow-sm"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <Sidebar
        activeTab="poetic-lines"
        onTabChange={(tab) => {
          if (tab === "formalities") router.push("/")
          else if (tab === "musings") router.push("/musings")
          else if (tab === "whats-your-name") router.push("/whats-your-name")
          else if (tab === "this-bias-is-beginning-to-show") router.push("/this-bias-is-beginning-to-show")
          else if (tab === "bookshelf") router.push("/bookshelf")
          else if (tab === "poetic-lines") router.push("/find-yourself-here")
        }}
        width={sidebarWidth}
        isDragging={false}
        onMouseDown={() => {}}
        mobileMenuOpen={mobileMenuOpen}
      />

      <main className="flex-1 px-8 md:px-16 max-w-4xl overflow-y-auto pt-28 md:pt-16 flex flex-col min-h-screen pb-0">
        <div className="space-y-12 flex-1">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-light tracking-wide">Find yourself here</h1>
              <button
                onClick={generateNewLines}
                disabled={isGenerating}
                className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
                <span className="text-sm uppercase tracking-wider">Find yourself here</span>
              </button>
            </div>

            <p className="text-foreground/60 text-sm max-w-2xl">
              Out of place, fragmented lines from various material throughout the site. Many make sense, some won't, and are written to simply be spliced together.
              But with the parsing of the site's content, disjointed. I hope you find yourself here.
            </p>
          </div>

          <div className="space-y-8">
            {!lineData && !isGenerating && (
              <p className="text-foreground/40 italic">Click generate to reveal a line.</p>
            )}
            
            {isGenerating && (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-6 h-6 animate-spin text-foreground/40" />
              </div>
            )}

            {lineData && !isGenerating && (
              <div
                className="text-2xl md:text-3xl leading-relaxed text-foreground font-light tracking-wide"
                style={{
                  animation: "fadeIn 0.5s ease-in both",
                }}
              >
                {lineData.line}
              </div>
            )}
          </div>
        </div>

        <Footer />
      </main>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}


