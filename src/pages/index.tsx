import React, { useState } from 'react'
import { api } from '~/utils/api'
function HomePage():JSX.Element {

  const [longUrl , setLongUrl] = useState<String>('')
  const {mutate: shortenUrl , data:loggedData  , isSuccess , isLoading} = api.example.shortenUrl.useMutation()
  const handleClick = () => {
   
    shortenUrl({
      longUrl: longUrl,
    });
    
    
  }
  // console.log('The logged data: ' , loggedData)
  return (
    <div className='whole-container'>
     <div className='real-container'>

       <h1>Generate Your Pokemon Url</h1>
       <div className='url-inputs'>
         <input type='text' className='inputs' value={longUrl} 
          onChange={(e) => setLongUrl(e.target.value)} 
          placeholder='Paste The Url' />

         <button onClick={handleClick}>GO🚀 </button>
        
       </div>
       {isLoading && <div>Generating A Pokemons</div>}
       
         {isSuccess && (
           <div className='success-parent'>
           <div className='success-one'>
             <h1 className='header-one'>Congratulations 🎉</h1>
             <p>You have succesfully claimed a pokemon url which you can copy here</p>
             <span className='links'><a target='_blank' href={`http://localhost:3000/${loggedData.shortUrl}`}>http://localhost:3000/{loggedData.shortUrl}</a></span>
          </div>
          </div>
         )}


     </div>


    </div>
  )
}

export default HomePage