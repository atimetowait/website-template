"use client"

import { useParams, useRouter } from "next/navigation"
import { NoteReader } from "@/components/note-reader"
import { ContentPanel } from "@/components/content-panel"
import { Sidebar } from "@/components/sidebar"
import { NotesList } from "@/components/notes-list"

const sidebarWidth = 320

export default function MusingPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  return (
    <div className="flex min-h-screen">
      <Sidebar
        activeTab="musings"
        onTabChange={(tab) => {
          if (tab === "formalities") router.push("/")
          else if (tab === "bookshelf") router.push("/bookshelf")
          else if (tab === "musings") router.push("/musings")
        }}
        width={sidebarWidth}
        isDragging={false}
        onMouseDown={() => {}}
        mobileMenuOpen={false}
      />

      <NotesList
        selectedNote={slug}
        onSelectNote={(noteSlug) => router.push(`/musings/${noteSlug}`)}
        width={600}
        isDragging={false}
        onMouseDown={() => {}}
      />

      <ContentPanel onClose={() => router.push("/musings")}>
        <NoteReader slug={slug} />
      </ContentPanel>
    </div>
  )
}


