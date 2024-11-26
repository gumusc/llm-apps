"use client"

import { useState } from "react"

interface FormElements extends HTMLFormControlsCollection {
  subject: HTMLInputElement
}
interface StoryMakerFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export default function StoryMakerForm() {
  const [storyTitle, setStoryTitle] = useState("")
  const [storySummary, setStorySummary] = useState([])
  const [storyBody, setStoryBody] = useState("")

  const onSubmitHandler = async (
    event: React.FormEvent<StoryMakerFormElement>
  ) => {
    event.preventDefault()
    const subject = event.currentTarget.elements.subject.value
    const response = await fetch("story-maker/api", {
      method: "POST",
      body: JSON.stringify({ subject }),
    })
    const { title, summaryArray } = await response.json()
    setStoryTitle(title)
    setStorySummary(summaryArray)
  }

  const startStoryStream = async () => {
    setStoryBody("")
    const response = await fetch("story-maker/api", {
      method: "POST",
      body: JSON.stringify({ storyTitle }),
    })

    if (!response.body) return

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      const chunkValue = decoder.decode(value)
      setStoryBody((prev) => prev + chunkValue)
    }
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="w-full max-w-sm">
        <div className="mb-6">
          <label htmlFor="subject" className="block text-sm font-bold mb-2">
            Main subject of the story:
          </label>
          <input
            name="subject"
            placeholder="subject..."
            className="block appearance-none border-2 rounded w-full py-2 px-4 leading-tight focus:outline-none mb-4 text-gray-700 focus:bg-white focus:border-purple-500"
          />{" "}
          <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
            Ask AI Model
          </button>
        </div>
      </form>
      {storyTitle && (
        <div className="p-2">
          <h2 className="bold text-2xl">{storyTitle}</h2>
          <div className="my-4">
            {storySummary.map((s, i) => (
              <p className="mb-2" key={i}>
                {s}
              </p>
            ))}
          </div>
          <button
            onClick={startStoryStream}
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          >
            Tell me the story
          </button>
          <hr className="my-4" />
          <div className="p-2">{storyBody}</div>
        </div>
      )}
    </div>
  )
}
