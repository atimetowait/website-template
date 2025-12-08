"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { BookshelfList } from "@/components/bookshelf-list"
import { Sidebar } from "@/components/sidebar"

const sidebarWidth = 320

export default function BookshelfPage() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSelectBook = (slug: string) => {
    router.push(`/bookshelf/${slug}`)
  }

  return (
    <div className="flex min-h-screen">
      {/* Mobile menu toggle button, same as homepage */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-6 left-6 z-50 md:hidden bg-background border border-border rounded-lg p-2.5 hover:bg-muted shadow-sm"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <Sidebar
        activeTab="bookshelf"
        onTabChange={(tab) => {
          if (tab === "about") router.push("/")
          else if (tab === "bookshelf") router.push("/bookshelf")
          else if (tab === "notes") router.push("/notes")
        }}
        width={sidebarWidth}
        isDragging={false}
        onMouseDown={() => {}}
        mobileMenuOpen={mobileMenuOpen}
      />

      <BookshelfList
        selectedBook={null}
        onSelectBook={handleSelectBook}
        width={600}
        isDragging={false}
        onMouseDown={() => {}}
      />

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}
