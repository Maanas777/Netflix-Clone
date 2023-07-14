import React, { useState, useEffect } from 'react'
import { API_KEY, imageUrl } from '../../constants/constant';
import './rowpost.css'
import axios from '../../axios';
import Youtube from 'react-youtube'


function Rowpost(props) {
  
    const [movies, Setmovie] = useState([])
    const [urlId, seturlId] = useState('')

    useEffect(() => {
        axios.get(props.url).then((response) => {


            Setmovie(response.data.results)

        }).catch(err => {

            // alert(err)
        })


    }, [])

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
            if (response.data.results.length > 0) {
              
                seturlId(response.data.results[0])

            }
            else {
                console.log('array is empty');
            }


        })

    }


    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className='posters'>
                {movies.map((obj) => (
                    <img
                        onClick={() => handleMovie(obj.id)}
                        className={props.isSmall ? 'smallPoster' : 'poster'}
                        src={`${imageUrl + obj.backdrop_path}`}
                        alt=""
                    />
                ))}
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
    );

}

export default Rowpost
