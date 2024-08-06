const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
	apiKey: process.env.OPEN_AI_API_KEY,
})
const openai = new OpenAIApi(configuration)

async function getBasePointsForHabit(habit: string) {
	const prompt = `Suggest a base point allocation for the habit: ${habit}. Provide only the number of points.`

	try {
		const response = await openai.chat.completions.create({
			model: 'gpt-4o-mini-2024-07-18',
			prompt: prompt,
			max_tokens: 10,
			n: 1,
			stop: null,
			temperature: 0.7,
		})

		const basePoints = response.data.choices[0].text.trim()
		return parseInt(basePoints, 10)
	} catch (error) {
		console.error('Error getting base points:', error)
		return null
	}
}
