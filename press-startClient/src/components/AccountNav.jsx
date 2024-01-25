import React from 'react'
import {Link, useLocation} from 'react-router-dom'




function AccountNav() {

const {pathname}= useLocation()
let subpage = pathname.split('/')?.[2]
if(subpage === undefined){
    subpage = 'profile'
}





//--------------------------------------------------

    function linkClasses (type=null){
        let classes = 'py-2 px-6'
        if (type === subpage ){
            classes += ' bg-slate-300 , rounded-full '
        }
        return classes
    }
    
//--------------------------------------------------

  return (
    <>


    <nav className='w-full , flex , justify-center , mt-8 , gap-4'>
            <Link className= {linkClasses('profile')} to= {'/account'}>My Account</Link>
            {/* <Link className= {linkClasses('myArticle')}  to={'/account/myArticle'}>My Articles</Link> */}
            <Link className= {linkClasses('createArticle')} to ={'/account/createArticle'}>Create Article</Link>

        </nav>
    
    
    
    
    </>
  )
}

export default AccountNav