import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

import spotify from "@/assets/spotify-icon-black.svg"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  function handleClick() {
    console.log("clicked");
    const VITE_BACKEND_API_ENDPOINT = import.meta.env.VITE_BACKEND_API_ENDPOINT;
    window.location.href = `${VITE_BACKEND_API_ENDPOINT}/auth/login`
  }
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Welcome!</h1>
      </div>
      <Button variant="outline" className="w-full" onClick={handleClick}>
        <img src={spotify} className="size-7"/>
        Login with Spopipy
        {/* <Link to="/search">Login with Spotify</Link>  */}
      </Button>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="https://www.spotify.com/signup" className="underline underline-offset-4">
          Sign up!
        </a>
      </div>
    </form>
  )
}
