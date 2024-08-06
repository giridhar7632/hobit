import { GoogleGenerativeAI } from '@google/generative-ai'

export async function getBasePointsForHabit(habit: string, time: number) {
	const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '')
	const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
	const prompt = `Point system: max points 30, min points 5. analyse the habit and suggest a base point allocation for the habit: ${habit} for ${time} minutes. Provide only the "number".`

	try {
		const result = await model.generateContent(prompt)
		const response = await result.response
		const responseText = response.text()
		console.log({ responseText })

		const pointsMatch = responseText.match(/(\d+)/)
		if (pointsMatch) {
			const basePoints = parseInt(pointsMatch[0], 10)
			return basePoints > 30 ? 30 : basePoints < 5 ? 5 : basePoints
		} else {
			console.error('No points found in the response')
			return 10
		}
	} catch (error) {
		console.error('Error getting base points:', error)
		return null
	}
}
