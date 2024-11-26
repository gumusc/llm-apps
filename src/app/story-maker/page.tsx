import { BookOpen, Home } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import StoryMakerForm from "./story-maker-form"
import { IconText } from "@/components/IconText"

export const metadata: Metadata = {
  title: "Story Maker",
  description: "Story maker app",
}

export default function StoryMaker() {
  return (
    <main className="p-4">
      <div className="flex gap-4 justify-between mb-4">
        <h1 className="bold text-3xl">
          <IconText text="Story Maker" Icon={BookOpen} />
        </h1>
        <div>
          <Link href="/">
            <IconText text="Home" Icon={Home} />
          </Link>
        </div>
      </div>

      <div className="mb-4">
        <em>This app uses a GPT Model to generate a story for kids.</em>
      </div>

      <StoryMakerForm />
    </main>
  )
}
