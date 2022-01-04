import React, { useState, useEffect } from 'react'
import axios from 'axios'

const TopImage = ({ imgurl, nextbtn, showrec }) => {
  const [recommendation, setrecommendation] = useState(imgurl[1][0]);
  const [recommendationcounter, set_recommendationcounter] = useState(0);
  const genremap = new Map();

  useEffect(() => { setrecommendation(imgurl[1][0]);  }, [showrec]);

  useEffect(() => {

    const fetchGenders = async () => {
      const response = await axios("https://api.themoviedb.org/3/genre/movie/list?api_key=6d9ca31c5cabba09160dddad1b991df7&language=en-US");


      response.data.genres.map(item => {
        genremap.set(item.id , item.name);
        console.log("genre" + genremap)
      })
    }
    fetchGenders();
  }, [])


  let firstsection = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w500${imgurl[0]})`,
    backgroundColor: 'gray',
    height: '70vh',
    padding: '0',
    width: "79%",
    margin: "0 auto",
    opacity: '.75',
  }
  let secondsection = {
    position: "absolute",
    top: "0",
    left: "10%",
    backgroundColor: "rgb(95, 58, 58)",
    clipPath: "polygon(60% 0, 100% 0,100% 100%,35% 100%)",
    height: "70vh",
    margin: "0 auto",
    padding: "0",
    width: "80%",
    backgroundImage: `url(https://image.tmdb.org/t/p/w500${recommendation.poster_path})`,
  }
  let secondsection_front = {
    position: "absolute",
    top: "0",
    left: "10%",
    backgroundColor: "rgb(95, 58, 58)",
    clipPath: "polygon(60% 0, 100% 0,100% 100%,35% 100%)",
    height: "70vh",
    margin: "0 auto",
    padding: "0",
    width: "80%",
    backgroundImage: `url(${recommendation})`,
  }

  const showNextRecommendation = () => {
    let tempnum = recommendationcounter;
    ++tempnum;

    if (recommendationcounter >= imgurl[1].length - 1) { set_recommendationcounter(0); }
    else { set_recommendationcounter(tempnum); }

    setrecommendation(imgurl[1][recommendationcounter]);
  }

  return (<>
    <div id="topimage_div">
      <article id="topimage_article">
        <section style={firstsection}></section>
        <section style={recommendation.poster_path === undefined ? secondsection_front : secondsection}></section>
        {nextbtn && <button onClick={showNextRecommendation} className="nextbtn">→</button>}

      </article>

    </div>

    {showrec && <article className="discription_article">
      <ul>
        <div className='discription_container'>
          <li className='discription_title'>Title</li>
          <li className='discription'>{recommendation.title}</li>
        </div>
        <div className='discription_container'>
          <li className='discription_title'>Release Dating</li>
          <li className='discription'>{recommendation.release_date}</li>
        </div>
        <div className='discription_container'>
          <li className='discription_title'>Overview</li>
          <li className='discription'>{recommendation.overview}</li>
        </div>
        <div className='discription_container'>
          <li className='discription_title'>Average Rating</li>
          <li className='discription'>{recommendation.vote_average}</li>
        </div>
        <div className='discription_container'> 
          <li className='discription_title'>Genre</li>
          {recommendation.map(item => (
            <p>{genremap.get(item.genre_ids) + " "}</p>
          ))}
        </div>
      </ul>
    </article>}
  </>
  )
}

export default TopImage;
