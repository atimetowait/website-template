"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { WhatsYourNameSection } from "@/components/whats-your-name-section"
import { Footer } from "@/components/footer"

const sidebarWidth = 320

export default function WhatsYourNamePage() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || status === "submitting") return

    setStatus("submitting")
    setError(null)

    try {
      const res = await fetch("/api/whats-your-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      })

      if (!res.ok) {
        throw new Error("Failed to send response")
      }

      setStatus("success")
      setMessage("")
    } catch (err) {
      console.error(err)
      setStatus("error")
      setError("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Mobile menu toggle button, same as other pages */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-6 left-6 z-50 md:hidden bg-background border border-border rounded-lg p-2.5 hover:bg-muted shadow-sm"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <Sidebar
        activeTab="whats-your-name"
        onTabChange={(tab) => {
          if (tab === "formalities") router.push("/")
          else if (tab === "musings") router.push("/musings")
          else if (tab === "whats-your-name") router.push("/whats-your-name")
          else if (tab === "bookshelf") router.push("/bookshelf")
        }}
        width={sidebarWidth}
        isDragging={false}
        onMouseDown={() => {}}
        mobileMenuOpen={mobileMenuOpen}
      />

      <main className="flex-1 px-8 md:px-16 max-w-3xl overflow-y-auto pt-28 md:pt-16 flex flex-col justify-between min-h-screen pb-0">
        <div className="space-y-10">
          <WhatsYourNameSection />

          <section className="space-y-4">
            <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
              Who are you when no one is watching?
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3 max-w-xl">
              <label className="block">
                <span className="sr-only">Who are you when no one is watching?</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                  placeholder="Write as much or as little as you'd like..."
                />
              </label>
              <button
                type="submit"
                disabled={status === "submitting" || !message.trim()}
                className="inline-flex items-center rounded-md border border-border bg-foreground px-3 py-1.5 text-xs font-mono uppercase tracking-widest text-background hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Sending..." : "Send"}
              </button>
              {status === "success" && (
                <p className="text-xs text-muted-foreground">
                  Thank you! Above all else — you have been seen.
                </p>
              )}
              {status === "error" && error && <p className="text-xs text-destructive">{error}</p>}
            </form>
          </section>
        </div>

        <Footer />
      </main>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}


