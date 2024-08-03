import React from 'react'
import { getWords } from './getWords'

export default async function Page() {
    const top10Words = await getWords()
    console.log(top10Words)
  return (
    <div className='flex flex-col items-center'>
        <h1 className="text-2xl font-bold mb-4">Top 10 Hardest Words</h1>
        <ol className="list-decimal pl-6 mb-4">
{top10Words?.map((data, index) => <li  className="mb-1 pl-1" key={index}><span className='font-bold'>{data.word}</span> (Bayesian Average: {data.bayesian_average})</li>

)}
        </ol>
    </div>
  )
}
