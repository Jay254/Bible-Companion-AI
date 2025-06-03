interface AIExplanationResponse {
  answer: string
}

export type ChatHistoryMessage = {
  role: 'user' | 'ai';
  content: string;
}

export async function getScriptureExplanation(
  chatHistory: ChatHistoryMessage[]
): Promise<AIExplanationResponse> {
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY
  if (!GROQ_API_KEY) {
    throw new Error('Groq API key is not configured')
  }

  // Improved system prompt for a conversational, context-aware, biblically accurate chat
  const systemPrompt = `You are Bible Companion AI, a friendly, knowledgeable, and context-aware Bible study assistant. You help users understand Bible verses and answer their questions with:
- Clear, conversational explanations
- Accurate biblical context and references
- Respect for diverse Christian traditions
- Encouragement for deeper study and reflection

When a user asks about a verse, provide:
1. The verse (if not already quoted)
2. Historical and literary context
3. A breakdown of key phrases or words
4. Insights from Christian tradition (if relevant)
5. A direct, thoughtful answer to the user's question
6. A warm, encouraging tone

If the user asks a follow-up, use the previous conversation for context. If the user refers to "this verse" or "it," use the last discussed verse.`

  // Convert chat history to OpenAI/Groq format
  const messages = [
    { role: 'system', content: systemPrompt },
    ...chatHistory.map((msg) => ({
      role: msg.role === 'ai' ? 'assistant' : 'user',
      content: msg.content,
    })),
  ]

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

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