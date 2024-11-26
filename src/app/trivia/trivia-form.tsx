"use client"

import { Frown, Smile } from "lucide-react"
import { useState } from "react"
import { IconText } from "@/components/IconText"

interface FormElements extends HTMLFormControlsCollection {
  subject: HTMLInputElement
}
interface TriviaFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export default function TriviaForm() {
  const [question, setQuestion] = useState("")
  const [answers, setAnswers] = useState([])
  const [correctIndex, setCorrectIndex] = useState(-1)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const onSubmitHandler = async (event: React.FormEvent<TriviaFormElement>) => {
    event.preventDefault()
    const subject = event.currentTarget.elements.subject.value
    const response = await fetch("trivia/api", {
      method: "POST",
      body: JSON.stringify({ subject }),
    })
    const { data } = await response.json()
    setQuestion(data.question)
    setAnswers(data.answers)
    setCorrectIndex(data.correctIndex)
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="w-full max-w-sm">
        <div className="mb-6">
          <label htmlFor="subject" className="block text-sm font-bold mb-2">
            Main subject of the trivia:
          </label>
          <input
            name="subject"
            placeholder="subject..."
            className="block appearance-none border-2 rounded w-full py-2 px-4 leading-tight focus:outline-none mb-4 text-gray-700 focus:bg-white focus:border-purple-500"
          />{" "}
          <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
            Generate a question
          </button>
        </div>
      </form>
      {question && (
        <div className="p-2">
          <h2 className="bold text-2xl mb-4">{question}</h2>
          <hr className="my-4" />
          <div className="p-2 flex gap-4 flex-col">
            {answers.map((answer: string, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                className="rounded bg-gray-300 p-2 text-black"
              >
                {answer}
              </button>
            ))}
            {selectedIndex > -1 && (
              <div className="flex justify-center">
                {answers[selectedIndex] === answers[correctIndex] ? (
                  <div className="text-green-500">
                    <IconText text="Correct!" Icon={Smile} />
                  </div>
                ) : (
                  <div className="text-red-500">
                    <IconText text="Wrong!" Icon={Frown} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
