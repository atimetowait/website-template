"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { NoteReader } from "@/components/note-reader"
import { ContentPanel } from "@/components/content-panel"
import { Sidebar } from "@/components/sidebar"
import { NotesList } from "@/components/notes-list"
import { cn } from "@/lib/utils"

const sidebarWidth = 320

export default function MusingPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const [notesListCollapsed, setNotesListCollapsed] = useState(true)

  return (
    <div className="flex min-h-screen">
      <Sidebar
        activeTab="musings"
        onTabChange={(tab) => {
          if (tab === "formalities") router.push("/")
          else if (tab === "bookshelf") router.push("/bookshelf")
          else if (tab === "musings") router.push("/musings")
          else if (tab === "whats-your-name") router.push("/whats-your-name")
          else if (tab === "this-bias-is-beginning-to-show") router.push("/this-bias-is-beginning-to-show")
          else if (tab === "poetic-lines") router.push("/find-yourself-here")
        }}
        width={sidebarWidth}
        isDragging={false}
        onMouseDown={() => {}}
        mobileMenuOpen={false}
      />

      {/* Toggle button for notes list */}
      <button
        onClick={() => setNotesListCollapsed(!notesListCollapsed)}
        className={cn(
          "fixed top-6 z-50 bg-background border border-border rounded-lg p-2.5 hover:bg-muted shadow-sm transition-all hidden md:block",
          notesListCollapsed ? "left-[340px]" : "left-[920px]"
        )}
        aria-label="Toggle notes list"
        title={notesListCollapsed ? "Show notes list" : "Hide notes list"}
      >
        {notesListCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
      </button>

      <div className={cn(
        "transition-all duration-300 ease-in-out overflow-hidden shrink-0",
        notesListCollapsed ? "w-0 md:w-0" : "w-full md:w-[600px]",
        "max-md:hidden"
      )}>
        <NotesList
          selectedNote={slug}
          onSelectNote={(noteSlug) => router.push(`/musings/${noteSlug}`)}
          width={600}
          isDragging={false}
          onMouseDown={() => {}}
        />
      </div>

      <ContentPanel onClose={() => router.push("/musings")}>
        <NoteReader slug={slug} />
      </ContentPanel>
    </div>
  )
}


