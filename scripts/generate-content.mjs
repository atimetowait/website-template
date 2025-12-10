import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { fileURLToPath } from "url"
import { marked } from "marked"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, "..")

// Convert Markdown to HTML using marked with full markdown support
function markdownToHtml(markdown) {
  // marked v12 exposes a named export `marked` with a `.parse` method
  return marked.parse(markdown)
}

// Generate about content
function generateAbout() {
  const aboutPath = path.join(rootDir, "content/about.mdx")
  if (!fs.existsSync(aboutPath)) return

  const fileContents = fs.readFileSync(aboutPath, "utf8")
  const { data, content } = matter(fileContents)

  const html = markdownToHtml(content)

  const about = {
    title: data.title || "About",
    content: html,
  }

  const output = `export interface About {
  title: string
  content: string
}

export const about: About = ${JSON.stringify(about, null, 2)}
`

  fs.writeFileSync(path.join(rootDir, "content/about.tsx"), output)
  console.log("✓ Generated about content")
}

// Generate \"what's your name?\" content
function generateWhatsYourName() {
  const pagePath = path.join(rootDir, "content/whats-your-name.mdx")
  if (!fs.existsSync(pagePath)) return

  const fileContents = fs.readFileSync(pagePath, "utf8")
  const { data, content } = matter(fileContents)

  const html = markdownToHtml(content)

  const page = {
    title: data.title || "What's your name?",
    content: html,
  }

  const output = `export interface WhatsYourName {
  title: string
  content: string
}

export const whatsYourName: WhatsYourName = ${JSON.stringify(page, null, 2)}
`

  fs.writeFileSync(path.join(rootDir, "content/whats-your-name.tsx"), output)
  console.log("✓ Generated what's your name? content")
}

// Generate notes content
function generateNotes() {
  const notesDir = path.join(rootDir, "content/notes")
  const files = fs.readdirSync(notesDir).filter((f) => f.endsWith(".mdx"))

  const notes = files.map((filename) => {
      const slug = filename.replace(/\.mdx$/, "")
      const fullPath = path.join(notesDir, filename)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        excerpt: data.excerpt || "",
        content: markdownToHtml(content),
      }
    })

  const output = `export interface Note {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
}

export const notes: Note[] = ${JSON.stringify(notes, null, 2)}
`

  fs.writeFileSync(path.join(rootDir, "content/notes.tsx"), output)
  console.log(`✓ Generated content for ${notes.length} notes`)
}

// Generate books content
function generateBooks() {
  const booksDir = path.join(rootDir, "content/books")
  const files = fs.readdirSync(booksDir).filter((f) => f.endsWith(".mdx"))

  const books = files.map((filename) => {
      const slug = filename.replace(/\.mdx$/, "")
      const fullPath = path.join(booksDir, filename)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content: mdxContent } = matter(fileContents)

      // Read metadata from frontmatter with defaults
      const title = data.title || slug
      const author = data.author || ""
      const year = data.year || 0
      const lastUpdated = data.lastUpdated
      const hasNotes = data.hasNotes ?? (mdxContent.trim().length > 0)
      const isReading = data.isReading ?? false
      const content = markdownToHtml(mdxContent)

      return {
        slug,
        title,
        author,
        year,
        ...(lastUpdated && { lastUpdated }),
        hasNotes,
        isReading,
        content,
      }
    })

  const output = `export interface Book {
  slug: string
  title: string
  author: string
  year: number
  lastUpdated?: string
  hasNotes: boolean
  isReading: boolean
  content: string
}

export const books: Book[] = ${JSON.stringify(books, null, 2)}
`

  fs.writeFileSync(path.join(rootDir, "content/books.tsx"), output)
  console.log(`✓ Generated content for ${books.length} books`)
}

// Run generators
generateAbout()
generateNotes()
generateBooks()
generateWhatsYourName()
