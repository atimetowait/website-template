"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { AboutSection } from "@/components/about-section"
import { NotesList } from "@/components/notes-list"
import { BookshelfList } from "@/components/bookshelf-list"
import { NoteReader } from "@/components/note-reader"
import { BookReader } from "@/components/book-reader"
import { ContentPanel } from "@/components/content-panel"

type Tab = "formalities" | "musings" | "whats-your-name" | "this-bias-is-beginning-to-show" | "bookshelf"

export default function PersonalWebsite() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>("formalities")
  const [selectedNote, setSelectedNote] = useState<string | null>(null)
  const [selectedBook, setSelectedBook] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

 const sidebarWidth = 320 // Change this number to adjust sidebar width
const notesListWidth = 600
const bookListWidth = 600

const sidebar = {
  width: sidebarWidth,
  isDragging: false,
  handleMouseDown: () => {}
}
const notesList = {
  width: notesListWidth,
  isDragging: false,
  handleMouseDown: () => {}
}
const bookList = {
  width: bookListWidth,
  isDragging: false,
  handleMouseDown: () => {}
}

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    setMobileMenuOpen(false)
    // Navigate to dedicated routes for tabs
    if (tab === "formalities") {
      router.push("/")
    } else if (tab === "musings") {
      router.push("/musings")
    } else if (tab === "whats-your-name") {
      router.push("/whats-your-name")
    } else if (tab === "this-bias-is-beginning-to-show") {
      router.push("/this-bias-is-beginning-to-show")
    } else if (tab === "bookshelf") {
      router.push("/bookshelf")
    }
  }

  return (
    <div className="flex min-h-screen">
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-6 left-6 z-50 md:hidden bg-background border border-border rounded-lg p-2.5 hover:bg-muted shadow-sm"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        width={sidebar.width}
        isDragging={sidebar.isDragging}
        onMouseDown={sidebar.handleMouseDown}
        mobileMenuOpen={mobileMenuOpen}
      />

      {activeTab === "musings" ? (
        <>
          <NotesList
            selectedNote={selectedNote}
            onSelectNote={(slug) => router.push(`/musings/${slug}`)}
            width={notesList.width}
            isDragging={notesList.isDragging}
            onMouseDown={notesList.handleMouseDown}
          />
          {selectedNote && (
            <ContentPanel onClose={() => setSelectedNote(null)}>
              <NoteReader slug={selectedNote} />
            </ContentPanel>
          )}
        </>
      ) : activeTab === "bookshelf" ? (
        <>
          <BookshelfList
            selectedBook={selectedBook}
            onSelectBook={(slug) => router.push(`/bookshelf/${slug}`)}
            width={bookList.width}
            isDragging={bookList.isDragging}
            onMouseDown={bookList.handleMouseDown}
          />
          {selectedBook && (
            <ContentPanel onClose={() => setSelectedBook(null)}>
              <BookReader slug={selectedBook} />
            </ContentPanel>
          )}
        </>
      ) : (
        <main className="flex-1 px-8 md:px-16 max-w-3xl overflow-y-auto pt-28 md:pt-16 flex flex-col justify-between min-h-screen pb-0">
          <AboutSection />
        </main>
      )}

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}
    </div>
  )
}
