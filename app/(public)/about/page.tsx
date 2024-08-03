import { CardContent } from '@/components/ui/card';
import React from 'react'
import ReactMarkdown from 'react-markdown';

export default function Page() {
    const content = `# About Word Ranker

## What is Word Ranker?

Word Ranker is an innovative, crowd-sourced platform designed to assess and rank the difficulty of words in the English language. Our goal is to create a comprehensive, dynamic database of word difficulty that evolves with user input.

## How It Works

1. **Play the Game**: Users are presented with a set of random words. They arrange these words from easiest to most difficult based on their personal understanding.

2. **Knowledge Indication**: For each word, users indicate whether they know the word or not. This crucial step helps us distinguish between perceived difficulty and actual familiarity.

3. **Data Collection**: Once submitted, these rankings and knowledge indicators are processed and added to our database.

4. **Difficulty Calculation**: We use a sophisticated Bayesian average algorithm to calculate each word's difficulty score. This method takes into account:
   - The word's position in users' rankings (for known words)
   - Whether the word is known or unknown to users
   - Historical data from previous rankings

5. The scale is from 1-10, from easiest to hardest respectively. Unknown words are given the score 9 by default.

## Why Bayesian Average?

We employ a Bayesian average approach because it offers several advantages:

- It considers the history of all previous ratings
- It's resistant to outliers and manipulation
- It provides more stable and reliable scores, especially for words with few ratings

# Extra
* Ranking metric is only applied to words that the user knows`

  return (
    <div className="container mx-auto px-4 py-8">
   <ReactMarkdown
  components={{
    h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4" {...props} />,
    h2: ({node, ...props}) => <h2 className="text-xl font-semibold mb-3" {...props} />,
    h3: ({node, ...props}) => <h3 className="text-lg font-semibold mb-2" {...props} />,
    ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4" {...props} />,
    ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4" {...props} />,
    li: ({node, ...props}) => <li className="mb-1 pl-1" {...props} />,
    p: ({node, ...props}) => <p className="mb-4" {...props} />,
  }}
>
  {content}
</ReactMarkdown>
    </div>
  )
}