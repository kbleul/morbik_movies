import React, { useState, useEffect } from 'react'
import axios from 'axios'

const TopImage = ({ imgurl, nextbtn, set_nextbtn, showrec, setshowrec, istvshow, settopimg }) => {
  const [recommendationcounter, set_recommendationcounter] = useState(1);
  const [recommendation, setrecommendation] = useState(imgurl[1][0]);
  const [backbtn, set_backbtn] = useState(false);
  const [genres, set_genres] = useState([]);
  const [cast, setcast] = useState([])
  const genremap = new Map();

  useEffect(() => { setrecommendation(imgurl[1][0]); }, [showrec, imgurl]);

  console.log(recommendation.title )
  useEffect(() => {

    if (istvshow) {


      const fetchGendersDetails = async () => {

        const fetchgenre = await axios("https://api.themoviedb.org/3/genre/tv/list?api_key=6d9ca31c5cabba09160dddad1b991df7&language=en-US");

        fetchgenre.data.genres.map(item => { genremap.set(item.id, item.name); return 0; });

        let temparr = [];
        recommendation.genre_ids.map(item => { temparr.push(genremap.get(item)); })

        set_genres(temparr);

        const fetchdetails = await axios(`https://api.themoviedb.org/3/tv/${recommendation.id}/credits?api_key=6d9ca31c5cabba09160dddad1b991df7&language=en-US`);

        fetchdetails.data.cast.splice(6, fetchdetails.data.cast.length - 6);
        setcast(fetchdetails.data.cast);

      }
      if (recommendation.genre_ids !== undefined) { fetchGendersDetails() }
    }

    else {


      const fetchGendersDetails = async () => {

        const fetchgenre = await axios("https://api.themoviedb.org/3/genre/movie/list?api_key=6d9ca31c5cabba09160dddad1b991df7&language=en-US");

        fetchgenre.data.genres.map(item => { genremap.set(item.id, item.name); });

        let temparr = [];
        recommendation.genre_ids.map(item => { temparr.push(genremap.get(item)); })

        set_genres(temparr);

        const fetchdetails = await axios(`https://api.themoviedb.org/3/movie/${recommendation.id}/credits?api_key=6d9ca31c5cabba09160dddad1b991df7&language=en-US`);

        fetchdetails.data.cast.splice(6, fetchdetails.data.cast.length - 6);
        setcast(fetchdetails.data.cast);

      }
      if (recommendation.genre_ids !== undefined) { fetchGendersDetails() }
    }
  }, [recommendation])


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

  const showNextRecommendation = (goback) => {


    let tempnum = recommendationcounter;
    if (!goback) {
      ++tempnum;

      if (tempnum >= imgurl[1].length - 1) { set_recommendationcounter(0); }
      else { set_recommendationcounter(tempnum); }
      set_backbtn(true);
    }
    else {
      --tempnum;
      if (tempnum <= 0) { set_recommendationcounter(imgurl[1].length - 1); }
      else { set_recommendationcounter(tempnum); }
    }
    setrecommendation(imgurl[1][recommendationcounter])

  }

  const backToFrontpage = () => {

    settopimg(["https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
      ["https://image.tmdb.org/t/p/w500/v7TaX8kXMXs5yFFGR41guUDNcnB.jpg"]]);

    setshowrec(false);
    set_nextbtn(false);

  }
  
  return (<>
    {showrec && <button onClick={ backToFrontpage } className="backtofront_btn_third" >←</button>}
    <div id="topimage_div">
      <article id="topimage_article">
        <section style={firstsection}></section>
        <section style={recommendation.poster_path === undefined ? secondsection_front : secondsection}></section>
        {nextbtn && <button onClick={() => showNextRecommendation()  } className="nextbtn">→</button>}
        {backbtn && <button onClick={() => showNextRecommendation(true)} className="nextbtn">←</button>}
      </article>

    </div>

    {showrec && <article className="discription_article">
      <ul>
        <div className='discription_container'>
          <li className='discription_title'>Title</li>
          <li className='discription movie_title'>{istvshow ? recommendation.name : recommendation.title}</li>
        </div>
        <div className='discription_container'>
          <li className='discription_title'>Release Dating</li>
          <li className='discription'>{istvshow ? recommendation.first_air_date : recommendation.release_date}</li>
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
          {genres.map(item => (
            <p key={item} className="genre_para">{item}</p>
          ))}
        </div>
        <div className='discription_container'>
          <li className='discription_title'>Starring</li>
          <li className='discription'>
            {cast.map(item => (<div key={item.id} className="starringcontainer">
              <img className="starringimgs" src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} alt={item.name} key={item.profile_path} />
              <p className="starringnames" key={item.name}>{item.name}</p>
            </div>
            ))}
          </li>

        </div>
      </ul>
    </article>}
  </>
  )
}

export default TopImage;
