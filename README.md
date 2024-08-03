# About Word Ranker

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

- Ranking metric is only applied to words that the user knows
