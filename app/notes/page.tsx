"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { NotesList } from "@/components/notes-list"
import { NoteReader } from "@/components/note-reader"
import { ContentPanel } from "@/components/content-panel"
import { Sidebar } from "@/components/sidebar"

const sidebarWidth = 320

export default function NotesPage() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSelectNote = (slug: string) => {
    router.push(`/notes/${slug}`)
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar
        activeTab="notes"
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

      <NotesList
        selectedNote={null}
        onSelectNote={handleSelectNote}
        width={600}
        isDragging={false}
        onMouseDown={() => {}}
      />
    </div>
  )
}
