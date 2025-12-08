import { about } from "@/content/about"
import { Footer } from "./footer"

export function AboutSection() {
  return (
    <div className="flex flex-col justify-between min-h-full">
      <div className="space-y-3">
        <div>
          <h1 className="text-4x1 font-mono mb-2">a·time·to·wait</h1>
          <p className="text-muted-foreground text-sm">
            <em>/schē/hɝːz/</em>
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-muted-foreground">
            <em>aCadogan</em>
          </p>
          <ol className="space-y-1 list-decimal list-inside">
            <li className="text-foreground">no martyrs — a day-dreaming friend</li>
            <li className="text-foreground">
              no strangers left behind —{" "}
              <a
                href="mailto:atimetowait@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-40 hover:decoration-solid"
              >
                atimetowait@gmail.com
              </a>
            </li>

            <li className="text-foreground">
              also known as 'freya langley' —{" "}
              <a
                href="https://open.spotify.com/artist/4M8EnFxggAM0jWTedB5Qer?si=HYn9IqzpR_2Pkg1SLAmMiA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid"
              >
                <em>spotify</em>
              </a>
            </li>
          </ol>

          {/* Markdown-driven about content */}
          <article className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground">
            <div dangerouslySetInnerHTML={{ __html: about.content }} />
          </article>
        </div>

        <div className="flex items-center gap-3 pt-4">
          <span className="text-muted-foreground">Links:</span>
          <a
            href="https://yapperofwords.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid"
          >
            Substack
          </a>
          <a
            href="https://soundcloud.com/atimetowait"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid"
          >
            Soundcloud
          </a>
          <a
            href="https://github.com/atimetowait"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid"
          >
            Github
          </a>
          <a
            href="https://www.instagram.com/timescribing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid"
          >
            Instagram
          </a>
        </div>
      </div>

      <Footer />
    </div>
  )
}
