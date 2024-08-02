'use client'

import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'

const initialWords = [
  'apple', 'serendipity', 'ephemeral', 'ubiquitous', 'mellifluous',
  'surreptitious', 'eloquent', 'nebulous', 'quintessential', 'ethereal'
]

interface WordData {
  score: number
  encounters: number
}

interface DifficultyScores {
  [key: string]: WordData
}

interface RankedWord {
  word: string
  difficulty: number
  known: boolean
}
const WordGame: React.FC = () => {
  const [words, setWords] = useState<string[]>([])
  const [gameComplete, setGameComplete] = useState<boolean>(false)
  const [difficultyScores, setDifficultyScores] = useState<DifficultyScores>({})

  useEffect(() => {
    setWords(_.shuffle(initialWords))
    const storedScores = localStorage.getItem('wordDifficultyScores')
    setDifficultyScores(storedScores ? JSON.parse(storedScores) : {})
  }, [])

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

  const handleSubmit = () => {
    const playerRanking: RankedWord[] = words.map((word, index) => ({
      word,
      difficulty: index + 1,
      known: (document.getElementById(`checkbox-${word}`) as HTMLInputElement).checked
    }))
    updateWordDifficulty(playerRanking)
    setGameComplete(true)
  }

  const updateWordDifficulty = (playerRanking: RankedWord[]) => {
    const newScores: DifficultyScores = { ...difficultyScores }
    const totalWords = playerRanking.length

    playerRanking.forEach((rankedWord, index) => {
      const { word, difficulty, known } = rankedWord
      if (!newScores[word]) {
        newScores[word] = { score: 0, encounters: 0 }
      }
      newScores[word].encounters += 1
      
      const normalizedDifficulty = (difficulty - 1) / (totalWords - 1)
      const knowledgeFactor = known ? 0.5 : 2
      const learningRate = 10 / (newScores[word].encounters + 9)
      
      const scoreChange = (normalizedDifficulty * 100 * knowledgeFactor - newScores[word].score) * learningRate
      newScores[word].score = Math.max(0, newScores[word].score + scoreChange)
    })

    setDifficultyScores(newScores)
    localStorage.setItem('wordDifficultyScores', JSON.stringify(newScores))
  }

  return (
    <div className="max-w-2xl mx-auto text-black">
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
                className="p-2 bg-gray-100 rounded cursor-move flex flex-row"
              >
                {word}
                <Input
                  type="checkbox"
                  id={`checkbox-${word}`}
                  className="ml-2"
                />
                <Label htmlFor={`checkbox-${word}`} className="ml-1">I know this word</Label>
              </li>
            ))}
          </ul>
          <Button 
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit Ranking
          </Button>
        </>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Word Difficulty Rankings:</h2>
          <ul className="space-y-2 mb-4">
            {_.sortBy(Object.entries(difficultyScores), ([, data]) => -data.score)
              .map(([word, data]) => (
                <li key={word} className="p-2 bg-gray-100 rounded">
                  {word}: Difficulty Score: {data.score.toFixed(2)} 
                  (Encounters: {data.encounters})
                </li>
              ))}
          </ul>
          <Button 
            onClick={() => {setGameComplete(false); setWords(_.shuffle(initialWords))}}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Play Again
          </Button>
        </div>
      )}
    </div>
  )
}

export default WordGame