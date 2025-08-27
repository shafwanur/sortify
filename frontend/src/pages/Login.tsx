import { Apple } from "lucide-react"

import { LoginForm } from "@/components/login-form"

import blob from "@/assets/blob.jpg"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Apple className="size-4" />
            </div>
            sortify
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img
          src={blob}
          alt="Image"
          className="max-h-screen mb-0 object-bottom dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}