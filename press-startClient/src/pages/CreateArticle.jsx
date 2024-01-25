import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import AccountNav from '../components/AccountNav'
import axios from 'axios'


function CreateArticle() {
  const [article , setArticle]=useState([])
 useEffect(()=>{
  axios.get('/author-createArticle').then(({data})=>{
    setArticle(data)
  })
 },[])

 //--------------------------------------------------------------------------------------- 
    
    
  return (
    <>
      <AccountNav/>
    <div className='mt-12 , text-center'>
      <p>List of all added Articles</p>
      <br/>
        <Link className="py-2 , px-6 , bg-slate-300 , rounded-full , "to={
          '/account/createArticle/new'}>Add new article</Link>
    </div>

    <div className='mt-4'>
            
      {article.length > 0 && article.map(articles=>(
      <Link to={'/account/createArticle/'+ articles._id} className='w-3/4 m-auto mb-3 flex cursor-pointer gap-4 bg-gray-200 p-2 rounded-xl'>

        <div className='flex w-48 h-32 bg-gray-300 shrink-0 rounded-md '>
          {articles.image.length > 0 && (
          <img className=' object-cover flex rounded-md' src={'http://localhost:3001/uploads/'+ articles.image[0]} alt=""/>  
          )}
        </div>
        <div className='grow-0 shrink'>
         <h2 className='text-xl font-semibold pb-1'> {articles.title}</h2>
     
         <p>{articles.story}</p>
        </div>
      </Link>
      ))}
    </div>
    </>
    
  )
}

export default CreateArticle
