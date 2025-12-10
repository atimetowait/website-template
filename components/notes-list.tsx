import Link from "next/link"
import { notes } from "@/content/notes"
import { cn } from "@/lib/utils"
import { Footer } from "./footer"

interface NotesListProps {
  selectedNote: string | null
  onSelectNote: (slug: string) => void
  width: number
  isDragging: boolean
  onMouseDown: (e: React.MouseEvent) => void
}

// Custom sort: force \"the_paracausal_forces\" to appear first,
// keep the rest in their existing order.
function sortNotesForDisplay() {
  return [...notes].sort((a, b) => {
    if (a.slug === "the_paracausal_forces") return -1
    if (b.slug === "the_paracausal_forces") return 1
    return 0
  })
}

export function NotesList({ selectedNote, onSelectNote, width, isDragging, onMouseDown }: NotesListProps) {
  const sortedNotes = sortNotesForDisplay()
  return (
    <div
      style={{ width: width ? `${width}px` : '100%' }}
      className={cn(
        "relative overflow-y-auto shrink-0 md:border-r border-border",
        "max-md:w-full max-md:max-w-full",
        selectedNote && "max-md:hidden",
      )}
    >
      <div className="px-8 md:px-11 pt-28 md:pt-16 pb-0 max-w-3xl flex flex-col justify-between min-h-full">
        <div>
          <h1 className="text-3x1 font-mono mb-7">Musings</h1>
          <p className="text-muted-foreground mb-8">Field observations & works-in-progress—</p>
          <div className="space-y-0">
            {sortedNotes.map((note, index) => (
              <div key={note.slug} className="relative">
                <Link
                  href={`/musings/${note.slug}`}
                  onClick={() => onSelectNote(note.slug)}
                  className="w-full text-left space-y-1.5 py-3 transition-colors group block"
                >
                  <div className="flex items-baseline gap-2 min-w-0">
                    <h2 className="text-base font-medium text-foreground break-words flex-1 min-w-0">{note.title}</h2>
                    <span className="text-muted-foreground text-sm transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0">↗</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">{note.date}</p>
                </Link>
                {index < sortedNotes.length - 1 && (
                  <div className="h-px bg-border my-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}