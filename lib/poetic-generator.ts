import { notes } from "@/content/notes"
import { thisBias } from "@/content/this-bias-is-beginning-to-show"

// Extract plain text from HTML content
function extractText(html: string): string {
  let text = html.replace(/<[^>]*>/g, " ")
  text = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&emsp;/g, " ")
  text = text.replace(/\s+/g, " ").trim()
  return text
}

// Themes for categorization
const themes = [
  "loss of control",
  "mortality",
  "struggle",
  "identity",
  "time",
  "transformation",
  "isolation",
  "resilience"
] as const

type Theme = typeof themes[number]

// Pre-curated lines from source material with clear themes
const curatedLines: Array<{ line: string; theme: Theme }> = [
  // Loss of control
  { line: "I'm slowly losing control—and maybe that's just what I want", theme: "loss of control" },
  { line: "The undertow unravels all, it'll even make a warrior out of you", theme: "loss of control" },
  { line: "You don't have anything to hide still…do you?", theme: "loss of control" },
  { line: "Forever hold your peace", theme: "loss of control" },
  { line: "It was never meant to hold you this close yet, you're still in its wake", theme: "loss of control" },
  
  // Mortality
  { line: "A husk with bones, a husk with feelings that need reminded of life, and not death", theme: "mortality" },
  { line: "Mortal forms in selfless acts", theme: "mortality" },
  { line: "The last thing on your face before death, the last thing on your mind", theme: "mortality" },
  { line: "Nothing is born broken, after all", theme: "mortality" },
  { line: "Stars would never mean to die", theme: "mortality" },
  
  // Struggle
  { line: "It's sinister to have to stand aside, and watch as something fails inside you", theme: "struggle" },
  { line: "I've always found meaning in struggle", theme: "struggle" },
  { line: "How easy it is to just...give up", theme: "struggle" },
  { line: "For six years he fought to make something out of lost time", theme: "struggle" },
  { line: "The more you worry, the more it drills farther into this husk", theme: "struggle" },
  
  // Identity  
  { line: "To lose is to have to seek—is to have to find", theme: "identity" },
  { line: "One that you didn't know was just—you, all along", theme: "identity" },
  { line: "I think losing yourself is a beautiful thing too", theme: "identity" },
  { line: "Whatever is inside of you, it is something remarkable", theme: "identity" },
  { line: "Does your nature change when you are thrust into the light?", theme: "identity" },
  
  // Time
  { line: "There has been this incessant…ticking-like sensation in my head", theme: "time" },
  { line: "Caught in-between a broken clock, and the undoing of time itself", theme: "time" },
  { line: "A lifetime of standing tall does that to you", theme: "time" },
  { line: "Hope, wish, pray—for bit of a better day than the one previous", theme: "time" },
  { line: "That's all I'll ever do is think", theme: "time" },
  
  // Transformation
  { line: "Let it happen, let you succumb to flashes of an aura", theme: "transformation" },
  { line: "A better tomorrow always starts—new", theme: "transformation" },
  { line: "Does your nature change when you are thrust into the light?", theme: "transformation" },
  { line: "You now…only light into rebirths", theme: "transformation" },
  { line: "To be beautiful is to have timing, sequence, and luck billow up over cadences", theme: "transformation" },
  
  // Isolation
  { line: "I laid there in the dark for some while", theme: "isolation" },
  { line: "I thought indifference couldn't follow me here", theme: "isolation" },
  { line: "Yourself lingers down below", theme: "isolation" },
  { line: "It's still there, right here actually—beaming in my chest", theme: "isolation" },
  
  // Resilience
  { line: "But to understand yourself, that may be the only thing you can do", theme: "resilience" },
  { line: "One foot in front of the other, resistance to old ways", theme: "resilience" },
  { line: "I'll love just a little harder so that when I shout your name it wouldn't dare return back an echo", theme: "resilience" },
]

// Detect theme of a line based on keywords
function detectTheme(line: string): Theme {
  const lower = line.toLowerCase()
  
  if (lower.match(/control|power|helpless|trapped|stuck|bound|agency|force/)) return "loss of control"
  if (lower.match(/mortal|flesh|bone|death|life|body|breath|corpse|decay/)) return "mortality"
  if (lower.match(/struggle|fight|battle|hurt|pain|wound|suffer|endure/)) return "struggle"
  if (lower.match(/self|identity|who|what.*am|lose.*myself|find.*myself|nature/)) return "identity"
  if (lower.match(/time|clock|moment|hour|day|year|forever|temporary|tick|tock/)) return "time"
  if (lower.match(/change|transform|become|rebirth|new|different|evolve/)) return "transformation"
  if (lower.match(/alone|lonely|dark|silence|empty|solitude|isolat/)) return "isolation"
  if (lower.match(/overcome|survive|resist|withstand|continue|persever/)) return "resilience"
  
  // Default to struggle as it's central to the content
  return "struggle"
}

// Check if a phrase is cohesive and complete
function isPhraseComplete(phrase: string): boolean {
  const words = phrase.split(/\s+/)
  
  // Too short - likely a fragment
  if (words.length < 4) return false
  
  // Check for sentence-like structure
  const hasVerb = /\b(is|are|was|were|be|been|have|has|had|do|does|did|can|could|will|would|should|may|might|must|am|'ve|'s|'re|'m)\b/i.test(phrase)
  const hasSubject = /\b(i|you|he|she|it|we|they|this|that|there|what|who|where|when|why|how)\b/i.test(phrase)
  
  // Prefer phrases with clear grammatical structure
  if (hasVerb || hasSubject) return true
  
  // Allow poetic fragments that feel complete (contain key theme words)
  const hasThemeWords = /control|death|life|struggle|self|time|transform|alone|survive|bone|soul|heart|breath/i.test(phrase)
  if (hasThemeWords && words.length >= 5) return true
  
  return false
}

// Check if two phrases are thematically compatible for mashup
function areThematicallyCompatible(phrase1: string, phrase2: string): boolean {
  const theme1 = detectTheme(phrase1)
  const theme2 = detectTheme(phrase2)
  
  // Same theme is always compatible
  if (theme1 === theme2) return true
  
  // Define compatible theme pairs
  const compatiblePairs: Record<string, string[]> = {
    "loss of control": ["struggle", "mortality", "isolation"],
    "mortality": ["loss of control", "time", "struggle"],
    "struggle": ["loss of control", "resilience", "mortality"],
    "identity": ["transformation", "isolation", "time"],
    "time": ["mortality", "transformation", "identity"],
    "transformation": ["identity", "resilience", "time"],
    "isolation": ["loss of control", "identity", "struggle"],
    "resilience": ["struggle", "transformation", "identity"]
  }
  
  return compatiblePairs[theme1]?.includes(theme2) || compatiblePairs[theme2]?.includes(theme1)
}

// Create a thoughtful mashup of two complete phrases
function createMashup(phrase1: string, phrase2: string): string | null {
  // Both phrases must be complete
  if (!isPhraseComplete(phrase1) || !isPhraseComplete(phrase2)) return null
  
  // Check thematic compatibility
  if (!areThematicallyCompatible(phrase1, phrase2)) return null
  
  // Choose a connector that makes sense
  const connectors = [
    "—",
    ", ",
    " and ",
    " but ",
    " yet ",
    "; ",
    " … ",
  ]
  
  const connector = connectors[Math.floor(Math.random() * connectors.length)]
  const mashup = phrase1 + connector + phrase2
  
  // Ensure the mashup isn't too long (max 350 chars for mashups)
  if (mashup.length > 350) return null
  
  return mashup
}

// Extract complete phrases - allow longer lengths
function extractCompletePhrases(text: string): string[] {
  const phrases: string[] = []
  
  // Split by sentence endings - these are naturally complete thoughts
  const sentences = text.split(/[.!?]+\s+/)
  
  sentences.forEach(sentence => {
    const trimmed = sentence.trim()
    
    // Add complete sentences - allow up to 300 chars for full thoughts
    if (trimmed.length >= 15 && trimmed.length <= 300 && isPhraseComplete(trimmed)) {
      phrases.push(trimmed)
    }
    
    // For very long sentences, try to extract complete clauses
    if (trimmed.length > 300) {
      const clauses = trimmed.split(/[;]\s+/)
      clauses.forEach(clause => {
        const cleanClause = clause.trim()
        if (cleanClause.length >= 15 && cleanClause.length <= 300 && isPhraseComplete(cleanClause)) {
          phrases.push(cleanClause)
        }
      })
    }
    
    // Extract meaningful sub-phrases that are complete thoughts
    const words = trimmed.split(/\s+/)
    if (words.length >= 8) {
      // Try longer sub-phrases (8-20 words) that might be complete thoughts
      for (let i = 0; i < words.length - 7; i++) {
        for (let len = 8; len <= Math.min(20, words.length - i); len++) {
          const phrase = words.slice(i, i + len).join(" ")
          if (phrase.length >= 20 && phrase.length <= 250 && isPhraseComplete(phrase)) {
            phrases.push(phrase)
          }
        }
      }
    }
  })
  
  return Array.from(new Set(phrases))
}

// Generate line pool with mashups
function generateLinePool(): Array<{ line: string; theme: Theme }> {
  const pool: Array<{ line: string; theme: Theme }> = []
  const usedLines = new Set<string>()
  
  // Start with curated lines
  curatedLines.forEach(({ line, theme }) => {
    pool.push({ line, theme })
    usedLines.add(line.toLowerCase().trim())
  })
  
  // Extract complete phrases from source material
  const sourceText = getAllSourceText()
  const completePhrases = extractCompletePhrases(sourceText)
  
  // Add each complete phrase as-is
  completePhrases.forEach(phrase => {
    let line = phrase.trim()
    if (line.length > 0) {
      line = line.charAt(0).toUpperCase() + line.slice(1)
    }
    
    const normalized = line.toLowerCase().trim()
    
    if (
      line &&
      line.length >= 15 &&
      line.length <= 300 &&
      isPhraseComplete(line) &&
      !usedLines.has(normalized)
    ) {
      const theme = detectTheme(line)
      pool.push({ line, theme })
      usedLines.add(normalized)
    }
  })
  
  // Create thoughtful mashups from compatible phrases
  const mashupCandidates = completePhrases.filter(p => 
    p.length >= 20 && p.length <= 180 && isPhraseComplete(p)
  )
  
  // Generate mashups - try to create meaningful combinations
  for (let i = 0; i < mashupCandidates.length && pool.length < 500; i++) {
    for (let j = i + 1; j < mashupCandidates.length && pool.length < 500; j++) {
      const phrase1 = mashupCandidates[i]
      const phrase2 = mashupCandidates[j]
      
      // Only attempt mashup if both phrases are reasonably sized
      if (phrase1.length + phrase2.length > 350) continue
      
      const mashup = createMashup(phrase1, phrase2)
      if (mashup) {
        const normalized = mashup.toLowerCase().trim()
        if (!usedLines.has(normalized)) {
          const theme = detectTheme(mashup)
          pool.push({ line: mashup, theme })
          usedLines.add(normalized)
        }
      }
      
      // Limit mashup generation to avoid too many
      if (Math.random() < 0.95) break // Only try 5% of combinations
    }
  }
  
  console.log(`Generated ${pool.length} unique lines (including mashups) from source material`)
  return pool
}

// Get all source text
function getAllSourceText(): string {
  const notesText = notes.map((note) => extractText(note.content)).join(" ")
  const biasText = extractText(thisBias.content)
  return notesText + " " + biasText
}

// Global line pool - generated once on first access
let linePool: Array<{ line: string; theme: Theme }> | null = null

function getLinePool(): Array<{ line: string; theme: Theme }> {
  if (!linePool) {
    linePool = generateLinePool()
  }
  return linePool
}

// Get a random line from the pool
export function getRandomLine(): { line: string; theme: Theme } {
  const pool = getLinePool()
  return pool[Math.floor(Math.random() * pool.length)]
}

// Get all lines (for display/debugging)
export function getAllLines(): Array<{ line: string; theme: Theme }> {
  return getLinePool()
}

// Legacy function for compatibility
export function generatePoeticLines(count: number = 1): string[] {
  const pool = getLinePool()
  const lines: string[] = []
  
  for (let i = 0; i < Math.min(count, pool.length); i++) {
    const randomIdx = Math.floor(Math.random() * pool.length)
    lines.push(pool[randomIdx].line)
  }
  
  return lines
}

// Generate a single line (new interface)
export function generatePoeticLine(): { line: string; theme: Theme } {
  return getRandomLine()
}
