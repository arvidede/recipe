// import { openai } from "@ai-sdk/openai"
import { google } from "@ai-sdk/google"

// const model = openai("gpt-4o-mini", { structuredOutputs: true })
const model = google("gemini-2.0-flash-001", { structuredOutputs: true })

export default model
