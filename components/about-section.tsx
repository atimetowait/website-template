import { Footer } from "./footer"

export function AboutSection() {
  return (
    <div className="flex flex-col justify-between min-h-full">
      <div className="space-y-5">
      <div>
        <h1 className="text-4xl font-serif mb-2">a·time·to·wait</h1>
        <p className="text-muted-foreground text-sm">/ˈshe/hers/</p>
      </div>

      <div className="space-y-3">
        <p className="text-muted-foreground">Alice Cadogan</p>
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
              email.
            </a></li>

            <li className="text-foreground">
            also known via 'freya langley' — {" "}
              <a
              href="https://open.spotify.com/artist/4M8EnFxggAM0jWTedB5Qer?si=HYn9IqzpR_2Pkg1SLAmMiA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground opacity-70 underline decoration-dotted decoration-1 underline-offset-2 transition-all hover:opacity-100 hover:decoration-solid"
              >
                spotify.
              </a>
            </li>
          
          

          
        </ol><br />
        <p>—I live as an artist, creative, composer & writer from the DMV. <br />
          My art spans through the many lenses of my life in, <br />
          Chronic illness, self-identity, love, loss...grief. <br />
          As the art exists, it acts as a way for my own healing,
          <br /><br /> I'm pleased if you make <em>home</em> there too. <br />
          With love, always <br />-Alice </p>
  
      </div>

      <div className="flex items-center gap-4 pt-4">
        <span className="text-muted-foreground">See also:</span>
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
      </div>
      </div>

      <Footer />
    </div>
  )
}
