interface AIExplanationResponse {
  answer: string
}

export async function getScriptureExplanation(scripture: string, question: string): Promise<AIExplanationResponse> {
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY
  if (!GROQ_API_KEY) {
    throw new Error('Groq API key is not configured')
  }

  const prompt = `You are a knowledgeable Bible scholar and teacher. Please provide a clear and insightful explanation of the following Bible verse, addressing the specific question asked.

Scripture: "${scripture}"
Question: "${question}"

Please provide an explanation that:
1. Is accurate to biblical teachings
2. Is easy to understand
3. Provides relevant context
4. Addresses the specific question asked
5. Is respectful and appropriate

Explanation:`

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are a knowledgeable Bible scholar and teacher who provides clear, accurate, and insightful explanations of biblical texts.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })
    // console.log(response)

    if (!response.ok) {
      throw new Error('Failed to get AI explanation')
    }

    const data = await response.json()
    return {
      answer: data.choices[0].message.content
    }
  } catch (error) {
    console.error('AI explanation error:', error)
    throw new Error('Failed to get explanation. Please try again.')
  }
} 