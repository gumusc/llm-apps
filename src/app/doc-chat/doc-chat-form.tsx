"use client"

import { useState } from "react"

interface FormElements extends HTMLFormControlsCollection {
  subject: HTMLInputElement
}
interface DocChatFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export default function DocChatForm() {
  const [answer, setAnswer] = useState("")
  const [docStatus, setDocStatus] = useState(false)

  const onSubmitHandler = async (
    event: React.FormEvent<DocChatFormElement>
  ) => {
    event.preventDefault()
    const subject = event.currentTarget.elements.subject.value
    const response = await fetch("doc-chat/api", {
      method: "POST",
      body: JSON.stringify({ subject }),
    })
    const { data } = await response.json()
    setAnswer(data)
  }

  const loadUrl = async (event: React.MouseEvent) => {
    event.preventDefault()
    setDocStatus(false)
    const urlElement = document.getElementById("url") as HTMLInputElement
    const response = await fetch("api", {
      method: "POST",
      body: JSON.stringify({ url: urlElement.value }),
    })
    const { loaded } = await response.json()
    setDocStatus(loaded)
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="w-full max-w-sm">
        <div className="mb-6">
          <label htmlFor="url" className="block text-sm font-bold mb-2">
            Document URL:
          </label>
          <input
            name="url"
            id="url"
            placeholder="url..."
            className="block appearance-none border-2 rounded w-full py-2 px-4 leading-tight focus:outline-none mb-4 text-gray-700 focus:bg-white focus:border-purple-500"
          />
          <button
            type="button"
            onClick={loadUrl}
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          >
            Load URL
          </button>
        </div>
        <div className="mb-6">
          <label htmlFor="subject" className="block text-sm font-bold mb-2">
            Question:
          </label>
          <input
            name="subject"
            placeholder="question..."
            className="block appearance-none border-2 rounded w-full py-2 px-4 leading-tight focus:outline-none mb-4 text-gray-700 focus:bg-white focus:border-purple-500"
            disabled={!docStatus}
          />
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            disabled={!docStatus}
          >
            Answer
          </button>
        </div>
      </form>
      <div className="p-2">{answer}</div>
    </div>
  )
}
