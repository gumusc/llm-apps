import { ChatGroq } from "@langchain/groq"
import { Calculator } from "@langchain/community/tools/calculator"
import { WikipediaQueryRun } from "@langchain/community/tools/wikipedia_query_run"
import type { PromptTemplate } from "@langchain/core/prompts"
import { AgentExecutor, createReactAgent } from "langchain/agents"
import { pull } from "langchain/hub"
import { config } from "@/app/config"

const llm = new ChatGroq(config.models.groq)

// Toolbox for the agent
const wikipediaQuery = new WikipediaQueryRun({ topKResults: 1 })
const calculator = new Calculator()
const tools = [wikipediaQuery, calculator]

// Get the agent rule set
const prompt = await pull<PromptTemplate>("hwchase17/react")

// Create agent and executor
const agent = await createReactAgent({
  llm,
  tools,
  prompt,
})
const agentExecutor = new AgentExecutor({
  agent,
  tools,
  //verbose: true,
  handleParsingErrors: true,
  returnIntermediateSteps: true,
  maxIterations: 4,
})

const makeAnswer = async (subject: string) => {
  return agentExecutor.invoke({
    input: subject,
  })
}

export async function POST(req: Request) {
  const { subject } = await req.json()
  const answer = await makeAnswer(subject)

  return Response.json({ answer, prompt })
}
