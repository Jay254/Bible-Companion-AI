interface BibleVerse {
  reference: string
  text: string
  translation: string
}

interface BibleApiError {
  message: string
}

export async function fetchBibleVerse(book: string, chapter: string, verse: string): Promise<BibleVerse> {
  try {
    const response = await fetch(
      `https://bible-api.com/${book}+${chapter}:${verse}?translation=kjv`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch verse')
    }

    const data = await response.json()
    return {
      reference: data.reference,
      text: data.text,
      translation: 'King James Version'
    }
  } catch (error) {
    throw new Error('Failed to fetch Bible verse. Please try again.')
  }
} 