import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Index() {
  const [article,setArticle]= useState([])
  useEffect(()=>{
    axios.get('/createArticle').then(res =>{
      setArticle(res.data)
    })
  },[])
  return (
    <div className='m-auto w-3/4 h-full grid gap-6 grid-cols-3 pt-6'>
    {article.length > 0 && article.map(articles =>(
      <div >
        
      <div className=' rounded-2xl flex '>
      {articles.image?.[0] &&(
        <img className='rounded-2xl aspect-square object-cover' src={'http://localhost:3001/uploads/'+articles.image?.[0]} alt=''/>
        )}
      </div>
        <h1 className='mt-3 mb-2 text-lg font-bold'>{articles.title}</h1>
        <p className=''>{articles.subtext}</p>
      
      </div>
    ))}

    </div>
  )
}

export default Index