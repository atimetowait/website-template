import { notes } from "@/content/notes"

interface NoteReaderProps {
  slug: string
}

export function NoteReader({ slug }: NoteReaderProps) {
  const note = notes.find((n) => n.slug === slug)

  if (!note) return null

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none w-full break-words overflow-wrap-anywhere word-break-break-word">
      <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">{note.date}</p>
      <h1 className="text-3xl font-mono mb-8">{note.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: note.content }} />
    </article>
  )
}
