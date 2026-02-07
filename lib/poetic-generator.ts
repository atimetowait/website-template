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

// Common nouns found in the poetic lines (expanded list)
const commonNouns = new Set([
  // From the lines
  "someone", "control", "undertow", "warrior", "secrets", "peace", "years", "arms",
  "husk", "bones", "feelings", "life", "death", "forms", "acts", "face", "mind",
  "star", "stars", "people", "lie", "decades", "lifetime", "pressure", "weight",
  "nature", "light", "glimpse", "twist", "degrees", "sensation", "head", "clock",
  "time", "beats", "chest", "day", "hand", "inch", "moments", "offbeat",
  "aura", "tomorrow", "timing", "sequence", "luck", "cadences", "threading",
  "self", "song", "songs", "breath", "breaths", "hands", "space", "spaces",
  "dark", "indifference", "gray", "footing", "lines", "letters", "ghost", "mirror",
  "wings", "sirens", "tone", "surface", "level", "clarity", "home", "fault",
  "foot", "ways", "name", "echo", "alter", "flame", "thing", "sorts", "fall",
  "half", "decade", "cavities", "mouth", "lips", "one", "two", "warriors",
  // Additional common nouns
  "thought", "thoughts", "word", "words", "tears", "eyes", "side", "place",
  "question", "answer", "stranger", "version", "multitudes", "truths", "frame",
  "point", "abuse", "strength", "muscles", "surface", "tension", "tide", "fate",
  "struggle", "meaning", "chasm", "chasms", "belief", "systems", "water", "ideal",
  "passage", "forces", "glimpse", "bit", "sort", "choice", "hope", "despair",
  "change", "mask", "metamorphosis", "permission", "skin", "chrysalis"
])

// Common pronouns
const pronouns = new Set([
  "i", "me", "my", "mine", "myself",
  "you", "your", "yours", "yourself", "yourselves",
  "he", "him", "his", "himself",
  "she", "her", "hers", "herself",
  "it", "its", "itself",
  "we", "us", "our", "ours", "ourselves",
  "they", "them", "their", "theirs", "themselves",
  "this", "that", "these", "those",
  "who", "whom", "whose", "which", "what",
  "myself", "yourself", "himself", "herself", "itself",
  "ourselves", "yourselves", "themselves"
])

// Helper function to check if a word is a pronoun
function isPronoun(word: string): boolean {
  const lowerWord = word.toLowerCase().replace(/[.,!?;:—…'"]/g, "")
  return pronouns.has(lowerWord)
}

// Helper function to check if a word is likely a noun
function isNoun(word: string): boolean {
  const lowerWord = word.toLowerCase().replace(/[.,!?;:—…'"]/g, "")
  
  // Check against common nouns list
  if (commonNouns.has(lowerWord)) return true
  
  // Common noun patterns
  if (lowerWord.endsWith("tion") || 
      lowerWord.endsWith("sion") ||
      lowerWord.endsWith("ness") ||
      lowerWord.endsWith("ment") ||
      lowerWord.endsWith("ity") ||
      lowerWord.endsWith("ence") ||
      lowerWord.endsWith("ance") ||
      lowerWord.endsWith("dom")) {
    return true
  }
  
  return false
}

// Highlight nouns and pronouns in a line
export function highlightNouns(line: string): Array<{ text: string; type: "noun" | "pronoun" | "normal" }> {
  const words = line.split(/(\s+|—|…|,|\.|\?|!|;|:)/g)
  const result: Array<{ text: string; type: "noun" | "pronoun" | "normal" }> = []
  
  for (const word of words) {
    if (word.trim().length === 0 || /^[—…,\.!?;:]$/.test(word)) {
      // Whitespace or punctuation
      result.push({ text: word, type: "normal" })
    } else {
      // Check if word (without punctuation) is a pronoun or noun
      const cleanWord = word.replace(/[.,!?;:—…'"]/g, "")
      if (cleanWord.length > 0) {
        if (isPronoun(cleanWord)) {
          result.push({ text: word, type: "pronoun" })
        } else if (isNoun(cleanWord)) {
          result.push({ text: word, type: "noun" })
        } else {
          result.push({ text: word, type: "normal" })
        }
      } else {
        result.push({ text: word, type: "normal" })
      }
    }
  }
  
  return result
}

// Pre-curated lines from source material with clear themes
// All lines sourced from "This Bias is Beginning to Show" and Musings
const curatedLines: Array<{ line: string; theme: Theme }> = [
  // Loss of control
  { line: "This is maybe just what someone like me needs to slowly lose control—and maybe that's just what I want", theme: "loss of control" },
  { line: "The undertow unravels all, it'll even make a warrior out of you too, if you let it", theme: "loss of control" },
  { line: "Promise it your secrets, dear—you don't have anything to hide still…do you?", theme: "loss of control" },
  { line: "Forever hold your peace", theme: "loss of control" },
  { line: "It was never meant to hold you this close yet, you're still in its wake", theme: "loss of control" },
  { line: "I lost that years ago, just as I lost control…the last time I lost control", theme: "loss of control" },
  { line: "I'm afraid there's no going back, yes?", theme: "loss of control" },
  { line: "Outrunning the undertow, you can try...sure, you can try", theme: "loss of control" },
  
  // Mortality
  { line: "A husk with bones, a husk with feelings that need reminded of life, and not death", theme: "mortality" },
  { line: "Mortal forms in selfless acts", theme: "mortality" },
  { line: "The last thing on your face before death, the last thing on your mind", theme: "mortality" },
  { line: "Nothing is born broken, after all", theme: "mortality" },
  { line: "Stars would never mean to die", theme: "mortality" },
  { line: "These were filed down over years, decades—a lifetime of standing tall does that to you", theme: "mortality" },
  { line: "People, hid no lie", theme: "mortality" },
  
  // Struggle
  { line: "It's sinister to have to stand aside, and watch as something fails inside you", theme: "struggle" },
  { line: "I've always found meaning in struggle", theme: "struggle" },
  { line: "How easy it is to just...give up", theme: "struggle" },
  { line: "For six years he fought to make something out of lost time from abuse", theme: "struggle" },
  { line: "The more you worry, the more it drills farther into this husk", theme: "struggle" },
  { line: "To stand tall is to stand out as well, that pressure holds weight", theme: "struggle" },
  { line: "All you can do is hurt, but watch them break down the grease, then, trust", theme: "struggle" },
  { line: "To weep or not is more worrying than the onset of tears", theme: "struggle" },
  { line: "Now you know the struggle of fate", theme: "struggle" },
  { line: "I'm becoming frightened again easily, and it keeps happening within my unconscious self", theme: "struggle" },
  
  // Identity  
  { line: "To lose is to have to seek—is to have to find", theme: "identity" },
  { line: "One that you didn't know was just—you, all along", theme: "identity" },
  { line: "I think losing yourself is a beautiful thing too", theme: "identity" },
  { line: "Whatever is inside of you, it is something remarkable", theme: "identity" },
  { line: "Does your nature change when you are thrust into the light?", theme: "identity" },
  { line: "Who were you before the world told you who to be?", theme: "identity" },
  { line: "Yourself lingers down below", theme: "identity" },
  { line: "I saw your true nature, the one that lays dormant for half a decade", theme: "identity" },
  { line: "I saw mine twist at 90 degrees, trying to look away from what you've become—from what I had become too", theme: "identity" },
  
  // Time
  { line: "There has been this incessant…ticking-like sensation in my head", theme: "time" },
  { line: "Caught in-between a broken clock, and the undoing of time itself", theme: "time" },
  { line: "A lifetime of standing tall does that to you", theme: "time" },
  { line: "Hope, wish, pray—for bit of a better day than the one previous", theme: "time" },
  { line: "That's all I'll ever do is think", theme: "time" },
  { line: "It trails to the beats of my chest again, still", theme: "time" },
  { line: "The second hand didn't even move an inch", theme: "time" },
  { line: "I'm trying to catch the moments of the in-betweens", theme: "time" },
  { line: "The clock suddenly lines up correctly, for once, or twice it does", theme: "time" },
  { line: "Stopping to stare only leaves you on the offbeat", theme: "time" },
  
  // Transformation
  { line: "Let it happen, let you succumb to flashes of an aura", theme: "transformation" },
  { line: "A better tomorrow always starts—new", theme: "transformation" },
  { line: "Does your nature change when you are thrust into the light?", theme: "transformation" },
  { line: "You now…only light into rebirths", theme: "transformation" },
  { line: "To be beautiful is to have timing, sequence, and luck billow up over cadences", theme: "transformation" },
  { line: "It's beautiful, maybe I am too", theme: "transformation" },
  { line: "As it billows up inside of you, it becomes more of you", theme: "transformation" },
  { line: "One that you didn't know could sing so softly", theme: "transformation" },
  { line: "Whatever is laying in your subtleties, ache? New? Newer? Than before?", theme: "transformation" },
  { line: "Match to light, black to grey, seemingly nothing exists in a chasm like it—before", theme: "transformation" },
  
  // Isolation
  { line: "I laid there in the dark for some while", theme: "isolation" },
  { line: "I thought indifference couldn't follow me here", theme: "isolation" },
  { line: "It's still there, right here actually—beaming in my chest", theme: "isolation" },
  { line: "Caught a glimpse between the lines, between the letters? Like a ghost in the mirror", theme: "isolation" },
  { line: "Like sirens, entrenching weight follows each tone, enough to keep my head below the surface level", theme: "isolation" },
  { line: "I thought black didn't fade to gray, I thought I'd never lose my footing", theme: "isolation" },
  { line: "It was never home, and you were never that either", theme: "isolation" },
  { line: "Call your fault, for down below...yourself lingers", theme: "isolation" },
  
  // Resilience
  { line: "But to understand yourself, that may be the only thing you can do", theme: "resilience" },
  { line: "One foot in front of the other, resistance to old ways", theme: "resilience" },
  { line: "I'll love just a little harder so that when I shout your name it wouldn't dare return back an echo", theme: "resilience" },
  { line: "For a lifetime more he'll fight to continue on", theme: "resilience" },
  { line: "Still here, still breathing—that counts for something", theme: "resilience" },
  { line: "Did you notice...how stoked my flame is right now?", theme: "resilience" },
  { line: "I can imagine these hands doing something of the sorts—letting go, being new, having hope", theme: "resilience" },
  { line: "It's still just me, through it all", theme: "resilience" },
  { line: "Before the fall & after—I remain", theme: "resilience" },
  { line: "I'd lay with my peace, and count til three", theme: "resilience" },
]

// Generate line pool - only use curated lines
function generateLinePool(): Array<{ line: string; theme: Theme }> {
  console.log(`Using ${curatedLines.length} curated lines`)
  return [...curatedLines]
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
