import { Footer } from "./footer"

export function AboutSection() {
  return (
    <div className="flex flex-col justify-between min-h-full">
      <div className="space-y-3">
      <div>
        <h1 className="text-4x1 font-mono mb-2">a·time·to·wait</h1>
        <p className="text-muted-foreground text-sm"><em>/schē/hɝːz/</em></p>
      </div>

      <div className="space-y-3">
        <p className="text-muted-foreground"><em>Alice Cadogan</em></p>
        <ol className="space-y-1 list-decimal list-inside">
          <li className="text-foreground">
            no martyrs; a passionate thought explorer; sincere minded friend.
          </li>
          <li className="text-foreground">
            no strangers left behind — {" "}
            <a
              href="mailto:atimetowait@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-40 hover:decoration-solid"
            >
              atimetowait@gmail.com
            </a></li>

            <li className="text-foreground">
            also known as 'freya langley' — {" "}
              <a
              href="https://open.spotify.com/artist/4M8EnFxggAM0jWTedB5Qer?si=HYn9IqzpR_2Pkg1SLAmMiA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid"
              >
                <em>spotify</em>
              </a>
            </li>
          
          

          
        </ol><br />
        <pre>Hey there, <br />                    I'm Alice!<br /><br />
        I live as a creative, composer & writer from the DMV. <br />
          My art spans through lenses of my life in, <br />
          chronic illness, self-identity, love, loss, grief... <br /> <br />
          Songs are published under the alias — 'freya langley'
          <br /><br />I'm pleased if you find something you enjoy.<br />
          <br />-xoxo </pre>
  
      </div>

      <div className="flex items-center gap-4 pt-4">
        <span className="text-muted-foreground">Seek & Find:</span>
        <a
          href="https://instagram.com/timescriber"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid"
        >
          Instagram
        </a>
        <a
          href="https://x.com/atimetowait"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid"
        >
          Twitter
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
      </div>
      </div>

      <Footer />
    </div>
  )
}
