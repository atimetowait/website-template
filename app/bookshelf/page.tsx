"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BookshelfList } from "@/components/bookshelf-list"
import { BookReader } from "@/components/book-reader"
import { ContentPanel } from "@/components/content-panel"
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
    </div>
  )
}
