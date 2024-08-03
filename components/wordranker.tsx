'use client'

import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { createClient } from '@/utils/supabase/client'


// Interfaces to define the structure of our data
interface WordData {
  total_score: number
  total_ratings: number
  bayesian_average: number
}

interface DifficultyScores {
  [key: string]: WordData
}

interface RankedWord {
  word: string
  difficulty: number
  known: boolean
}

// Constants for Bayesian average calculation
const PRIOR_COUNT = 0  // Number of imaginary ratings to start with
const PRIOR_MEAN = 5    // Average difficulty on a scale of 1-10

// Main component for the Word Game
const WordGame: React.FC = () => {

    
  const [words, setWords] = useState<string[]>([])
  const [gameComplete, setGameComplete] = useState<boolean>(false)
  const [difficultyScores, setDifficultyScores] = useState<DifficultyScores>({})

 
  
  const fetchRandomWords = async () => {
    try {
      const response = await fetch('https://random-word-api.herokuapp.com/word?number=10')
      if (!response.ok) {
        throw new Error('Failed to fetch random words')
      }
      const data = await response.json()
      setWords(data)
    } catch (error) {
      console.error('Error fetching random words:', error)
      // You might want to set some default words here in case the API fails
      setWords(['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon'])
    }
  }

  useEffect(() => {
    fetchRandomWords()
    fetchWordScores()
  }, [])

  const fetchWordScores = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('word_rankings')
      .select('*')
    
    if (error) {
      console.error('Error fetching word scores:', error)
      return
    }

    const scores: DifficultyScores = {}
    data.forEach(item => {
      scores[item.word] = {
        total_score: item.total_score,
        total_ratings: item.total_ratings,
        bayesian_average: item.bayesian_average
      }
    })
    setDifficultyScores(scores)
  }

  // Handlers for drag and drop functionality
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, word: string) => {
    e.dataTransfer.setData('text/plain', word)
  }

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault()
    const word = e.dataTransfer.getData('text')
    const newWords = words.filter(w => w !== word)
    newWords.splice(index, 0, word)
    setWords(newWords)
  }

  // Handler for submitting the game results
  const handleSubmit = () => {
    const playerRanking: RankedWord[] = words.map((word, index) => ({
      word,
      difficulty: index + 1,
      known: (document.getElementById(`checkbox-${word}`) as HTMLInputElement).checked
    }))
    updateWordDifficulty(playerRanking)
    setGameComplete(true)
  }

  // Function to update word difficulties using Bayesian average
  const updateWordDifficulty = async (playerRanking: RankedWord[]) => {
    const supabase = createClient()
    const knownWords = playerRanking.filter(word => word.known)
    const unknownWords = playerRanking.filter(word => !word.known)
    const totalKnownWords = knownWords.length
  
    const updateWord = async (word: string, difficultyScore: number) => {
      const { data: existingData, error: fetchError } = await supabase
        .from('word_rankings')
        .select('*')
        .eq('word', word)
        .single()
  
      let newTotalScore: number
      let newTotalRatings: number
      let actualRatings: number
  
      if (existingData) {
        newTotalScore = existingData.total_score + difficultyScore
        newTotalRatings = existingData.total_ratings + 1
        actualRatings = existingData.actual_ratings + 1
      } else {
        newTotalScore = PRIOR_COUNT * PRIOR_MEAN + difficultyScore
        newTotalRatings = PRIOR_COUNT + 1
        actualRatings = 1
      }
  
      const bayesianAverage = newTotalScore / newTotalRatings
  
      const { data, error } = await supabase
        .from('word_rankings')
        .upsert({ 
          word, 
          total_score: newTotalScore,
          total_ratings: newTotalRatings,
          actual_ratings: actualRatings,
          bayesian_average: bayesianAverage
        })
        .select()
  
      if (error) {
        console.error(`Error updating data for word "${word}":`, error.message)
        throw error
      }
  
      return { word, data: data[0] }
    }
  
    const updates = [
      // Update known words based on their ranking
      ...knownWords.map((rankedWord, index) => {
        const difficultyScore = ((index + 1) / totalKnownWords) * 10
        return updateWord(rankedWord.word, difficultyScore)
      }),
      // Update unknown words with a high difficulty score
      ...unknownWords.map(rankedWord => {
        // We assign a high difficulty score to unknown words
        // This could be adjusted based on your specific needs
        const difficultyScore = 9  // On a scale of 1-10, 9 indicates high difficulty
        return updateWord(rankedWord.word, difficultyScore)
      })
    ]
  
    try {
      const updatedScores = await Promise.all(updates)
      const newDifficultyScores: DifficultyScores = {}
      updatedScores.forEach(({ word, data }) => {
        newDifficultyScores[word] = {
          total_score: data.total_score,
          total_ratings: data.total_ratings,
          bayesian_average: data.bayesian_average
        }
      })
      setDifficultyScores(newDifficultyScores)
    } catch (error) {
      console.error('Error updating word difficulties:', error)
    }
  }

  // Render the game UI
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Word Difficulty Ranking Game</h1>
      {!gameComplete ? (
        <>
          <p className="mb-4">Drag and drop the words from easiest to hardest:</p>
          <ul className="space-y-2 mb-4">
            {words.map((word, index) => (
              <li
                key={word}
                draggable
                onDragStart={(e) => handleDragStart(e, word)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className="p-2 rounded cursor-move flex flex-row items-center border-2 rounded-lg justify-between"
              >
                {word}
                <div className='flex flex-row items-center'>
                <Checkbox
                  id={`checkbox-${word}`}
                  className="ml-2"
                />
                <Label htmlFor={`checkbox-${word}`} className="ml-1">I know this word</Label>
                </div>
             
              </li>
            ))}
          </ul>
          <Button 
            onClick={handleSubmit}
            className="px-4 py-2 w-full"
          >
            Submit Ranking
          </Button>
        </>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Word Difficulty Rankings:</h2>
          <ul className="space-y-2 mb-4">
            {_.sortBy(Object.entries(difficultyScores), ([, data]) => -data.bayesian_average)
              .map(([word, data]) => (
                <li key={word} className="p-2">
                  {word}: Difficulty Score: {data.bayesian_average.toFixed(2)} 
                  (Total Ratings: {data.total_ratings - PRIOR_COUNT})
                </li>
              ))}
          </ul>
          <Button 
  onClick={() => {setGameComplete(false); fetchRandomWords()}}
  className="px-4 py-2"
>
  Play Again
</Button>
        </div>
      )}
    </div>
  )
}

export default WordGame