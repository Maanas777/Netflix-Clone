import React, { useEffect, useState } from 'react'
import { API_KEY,imageUrl } from '../../constants/constant'
import './banner.css'
import axios from 'axios'
import Youtube from 'react-youtube'

function Banner() {

    const[movie, setMovie] = useState()
    const [urlId,seturlId] = useState('')


useEffect(() => {
  axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{

  const randomIndex=Math.floor(Math.random()*response.data.results.length)
  
  const randomMovie=response.data.results[randomIndex]
  setMovie(randomMovie)

  
  })

},[])


const opts = {
    height: '390',
    width: '100%',
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
    }
}

const handleMovie = (id) => {
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
        console.log("090809");
        if (response.data.results.length > 0) {
            console.log(response.data.results[0]);
            seturlId(response.data.results[0])

        }
        else {
        
            console.log('array is empty');
        }


    })

}



    return (
        <div
        style={{backgroundImage:`url(${movie? imageUrl+movie.backdrop_path:""})`}}
            className='banner'>
            <div className='content' >
                <h1 className='title'>{movie ? movie.title:""}</h1>
                <div className='banner_buttons'>
                    <button className='button' onClick={()=>handleMovie(movie.id)} >Play</button>
                    <button className='button' >My list</button>
                </div>
                <h1 className='description'>{movie ? movie.overview:""}</h1>
            </div>
            <div className="fade_bottom">


            </div>
            {urlId && (
            <div>
                  <button className='close-button' onClick={() => seturlId('')}>
                    Close
                </button>
                <Youtube opts={opts} videoId={urlId.key} />
              
            </div>
        )}
        </div>
       


    )
}

export default Banner
