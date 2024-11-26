"use client"

import { useState } from "react"

interface FormElements extends HTMLFormControlsCollection {
  subject: HTMLInputElement
}
interface FactsFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export default function FactsForm() {
  const [facts, setFacts] = useState<string[]>([])

  const onSubmitHandler = async (event: React.FormEvent<FactsFormElement>) => {
    event.preventDefault()
    const subject = event.currentTarget.elements.subject.value
    const response = await fetch("facts/api", {
      method: "POST",
      body: JSON.stringify({ subject }),
    })
    const { fact } = await response.json()
    setFacts([fact, ...facts])
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="w-full max-w-sm">
        <div className="mb-6">
          <label htmlFor="subject" className="block text-sm font-bold mb-2">
            Main topic:
          </label>
          <input
            name="subject"
            placeholder="topic..."
            className="block appearance-none border-2 rounded w-full py-2 px-4 leading-tight focus:outline-none mb-4 text-gray-700 focus:bg-white focus:border-purple-500"
          />{" "}
          <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
            Generate a fact
          </button>
        </div>
      </form>
      {facts.map((fact, i) => (
        <div className="p-2" key={i}>
          {fact}
        </div>
      ))}
    </div>
  )
}
