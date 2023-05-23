"use client"

import {useState} from 'react'

function HomePage(){
  
  const [prompt, setPrompt]  = useState("")
  const [result, setResult] = useState("")
  const [loading, SetLoading] = useState(false)

  const generateJoke = async (prompt) => {
    SetLoading(true);

    try{
      const response = await fetch("/api/generate", {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({prompt})
      })

      const data = await response.json()
      setResult(data)
    }catch(error){
      alert(error.message)
      return
    }

    SetLoading(false)
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    generateJoke(prompt)  
  }

  return(
    <div className='bg-zinc-950 h-screen flex justify-center items-center'>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder='Enter a prompt' className='p-2 block bg-neutral-700 text-white w-full rounded-md' onChange={e => setPrompt(e.target.value)} value={prompt} autoFocus></input>
        <button className='bg-green-500 p-2 rounded-md block mt-2' disabled={!prompt || loading}>{loading ? "Thinking..." : "Generate"}</button>
        {result && (
          <p className="text-xl font-bold text-white max-w-xs my-10">  {result} </p>
        )}
      </form>
    </div>
  )
}


export default HomePage