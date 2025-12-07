"use client"

import { useParams, useRouter } from "next/navigation"
import { BookReader } from "@/components/book-reader"
import { ContentPanel } from "@/components/content-panel"
import { Sidebar } from "@/components/sidebar"
import { BookshelfList } from "@/components/bookshelf-list"

const sidebarWidth = 320

export default function BookPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

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
        mobileMenuOpen={false}
      />

      <BookshelfList
        selectedBook={slug}
        onSelectBook={(bookSlug) => router.push(`/bookshelf/${bookSlug}`)}
        width={600}
        isDragging={false}
        onMouseDown={() => {}}
      />

      <ContentPanel onClose={() => router.push("/bookshelf")}>
        <BookReader slug={slug} />
      </ContentPanel>
    </div>
  )
}
