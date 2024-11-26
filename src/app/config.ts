const temperature = 0.8

export const config = {
  models: {
    groq: {
      model: "mixtral-8x7b-32768",
      temperature,
    },
  },
}
