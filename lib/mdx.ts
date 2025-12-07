import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"

const notesDirectory = path.join(process.cwd(), "content/notes")
const booksDirectory = path.join(process.cwd(), "content/books")

export interface NoteMetadata {
  slug: string
  title: string
  date: string
  excerpt: string
}

export interface NoteWithContent extends NoteMetadata {
  content: string
}

export interface BookMetadata {
  slug: string
  title: string
  author: string
  year: number
  lastUpdated?: string
  hasNotes: boolean
  isReading: boolean
}

export interface BookWithContent extends BookMetadata {
  content: string
}

// Helper to get all note files
export function getNoteFiles() {
  if (!fs.existsSync(notesDirectory)) {
    return []
  }
  return fs.readdirSync(notesDirectory).filter((file) => file.endsWith(".mdx"))
}

// Get all notes metadata
export function getAllNotes(): NoteMetadata[] {
  const files = getNoteFiles()

  const notes = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "")
    const fullPath = path.join(notesDirectory, filename)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      excerpt: data.excerpt || "",
    }
  })

  return notes.sort((a, b) => (a.date > b.date ? -1 : 1))
}

// Get a single note by slug
export function getNoteBySlug(slug: string): NoteWithContent | null {
  try {
    const fullPath = path.join(notesDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      excerpt: data.excerpt || "",
      content,
    }
  } catch {
    return null
  }
}

// Book helper functions
export function getBookFiles() {
  if (!fs.existsSync(booksDirectory)) {
    return []
  }
  return fs.readdirSync(booksDirectory).filter((file) => file.endsWith(".mdx"))
}

export function getAllBooks(): BookMetadata[] {
  const files = getBookFiles()

  const books = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "")
    const fullPath = path.join(booksDirectory, filename)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      author: data.author || "",
      year: data.year || 0,
      lastUpdated: data.lastUpdated,
      hasNotes: data.hasNotes ?? (content.trim().length > 0),
      isReading: data.isReading ?? false,
    }
  })

  return books
}

export function getBookBySlug(slug: string): BookWithContent | null {
  try {
    const fullPath = path.join(booksDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || slug,
      author: data.author || "",
      year: data.year || 0,
      lastUpdated: data.lastUpdated,
      hasNotes: data.hasNotes ?? (content.trim().length > 0),
      isReading: data.isReading ?? false,
      content,
    }
  } catch {
    return null
  }
}

// Convert Markdown to HTML using marked with full markdown support
// Supports: headings, paragraphs, blockquotes, lists, links, code blocks,
// bold/italic, strikethrough, tables, task lists, and more (GitHub Flavored Markdown)
export function markdownToHtml(markdown: string): string {
  // marked v12 exposes a named export `marked` with a `.parse` method
  return marked.parse(markdown)
}
