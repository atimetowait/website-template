"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { ThisBiasSection } from "@/components/this-bias-section"

const sidebarWidth = 320

export default function ThisBiasPage() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Mobile menu toggle button, same as other pages */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-6 right-6 z-50 md:hidden bg-background border border-border rounded-lg p-2.5 hover:bg-muted shadow-sm"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <Sidebar
        activeTab="this-bias-is-beginning-to-show"
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

      <main className="flex-1 flex justify-center overflow-hidden">
        <div className="w-full max-w-3xl px-5 md:px-16 pt-16 md:pt-12 h-full">
          <ThisBiasSection />
        </div>
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


