import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './search'
import TopImage from './TopImage_Recommendation'
import loading from './imgs/loading.gif'

const Viewcharacter = () => {

  const [boxoffice, setboxoffice] = useState([]);
  const [alltime_boxoffice, setalltime_boxoffice] = useState([]);
  const [tvshow, settvshow] = useState([]);
  const [alltime_tvshow, set_alltime_tvshow] = useState([]);
  const [isloading, set_isloading] = useState(true);
  const [shownextbtn, set_shownextbtn] = useState(false);
  const [showrecommendation, set_showrecommendation] = useState(false);
  const [suggesttvshow, set_suggesttvshow] = useState(false)
  const [topimgurl, set_topimgurl] = useState(["https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", ["https://image.tmdb.org/t/p/w500/v7TaX8kXMXs5yFFGR41guUDNcnB.jpg"]])


  useEffect(() => {

    const fetchitems = async () => {
      try {
        const boxoffice_response = await axios("https://api.themoviedb.org/3/movie/popular?api_key=6d9ca31c5cabba09160dddad1b991df7&language=en-US&page=1");
        setboxoffice(boxoffice_response.data.results)

        const alltime_boxoffice_response = await axios("https://api.themoviedb.org/3/movie/top_rated?api_key=6d9ca31c5cabba09160dddad1b991df7&language=en-US&page=1");
        setalltime_boxoffice(alltime_boxoffice_response.data.results)

        const tvshow_response = await axios("https://api.themoviedb.org/3/tv/popular?api_key=6d9ca31c5cabba09160dddad1b991df7&language=en-US&page=1");
        settvshow(tvshow_response.data.results)

        const alltime_tvshow_response = await axios("https://api.themoviedb.org/3/tv/1396/recommendations?api_key=6d9ca31c5cabba09160dddad1b991df7&language=en-US&page=1");
        set_alltime_tvshow(alltime_tvshow_response.data.results)
        set_isloading(false);

      } catch (error) {
        console.log("Error: Fetch movies failed.");
      }
    }

    fetchitems();
  }, []);

  const handleShowRecommendation = async (item, istvshow) => {

    if (!istvshow) {
      set_suggesttvshow(false)
      try {
        const fetchrecommendations = await axios(`https://api.themoviedb.org/3/movie/${item.id}/recommendations?api_key=6d9ca31c5cabba09160dddad1b991df7&language=en-US&page=1`);

            if(fetchrecommendations.data.results.length > 0){
        set_topimgurl([`https://image.tmdb.org/t/p/w500/${item.poster_path}`, fetchrecommendations.data.results]);
        }
        else {  
          let tempobj = {title : "Recommendation not found. Pick a different movie please !"}
          set_topimgurl([`https://image.tmdb.org/t/p/w500/${item.poster_path}`, [tempobj] ])
        }

        set_showrecommendation(true);
        set_shownextbtn(true);

      } catch { console.log("Fetch movie recommendations error.") }
    }
    else {
      set_suggesttvshow(true)
      try {
        const fetchrecommendations = await axios(`https://api.themoviedb.org/3/tv/${item.id}/recommendations?api_key=6d9ca31c5cabba09160dddad1b991df7&language=en-US&page=1`);

        if(fetchrecommendations.data.results.length > 0){

        set_topimgurl([`https://image.tmdb.org/t/p/w500/${item.poster_path}`, fetchrecommendations.data.results]);
        set_showrecommendation(true);
        set_shownextbtn(true);
        }  else {  
          let tempobj = {name : "Recommendation not found. Pick a different series please !" , id : "Error"}
          set_topimgurl([`https://image.tmdb.org/t/p/w500/${item.poster_path}`, [tempobj] ])
        }


      } catch { console.log("Fetch tvshow recommendations error.") }
    }

  }

  return (<article className="subcontainer">
    <Search setimgurl={set_topimgurl} setshowrec={set_showrecommendation} setshownextbtn={set_shownextbtn} setistv = {set_suggesttvshow}/>
    {!showrecommendation && <p className="subtitle">Pick a movie you have watched.</p>}
    <TopImage imgurl={topimgurl} nextbtn={shownextbtn} set_nextbtn={set_shownextbtn} showrec={showrecommendation} setshowrec={set_showrecommendation} istvshow={suggesttvshow} settopimg={set_topimgurl} />

    {showrecommendation ?
      <section className="reccomendationpage_container">
      </section>
      :
      <section className="frontpage_conatiner">
        <h3 className="section_title">Popular</h3>
        {
          isloading ? <img src={loading} alt="loading" className="loadingimg" /> :

            <section className="cardscontainer">
              {boxoffice.map(item => (
                <section onClick={() => handleShowRecommendation(item, false)} key={`${item.id}${item.title}`} className="cards">
                  <img className="cardsimg" key={`${item.id}${item.vote_average}`} alt={item.title}
                    src={"https://image.tmdb.org/t/p/w500/" + item.poster_path} />

                  <div className="ratetitle_container" key={`${item.id}${item.title}`}>
                    <p className="cardstitle" key={item.title}>{item.title}</p>
                    <p className="cardsrating" key={item.vote_average}>{item.vote_average}</p>
                  </div>
                </section>
              )

              )}
            </section>
        }

        <h3 className="section_title">top rated - all time</h3>
        {!isloading && <section className="cardscontainer">
          {alltime_boxoffice.map(item => (
            <section onClick={() => handleShowRecommendation(item, false)} key={`${item.id}${item.title}`} className="cards-alltime">
              <img className="cardsimg" key={`${item.id}${item.vote_average}`} alt={item.title}
                src={"https://image.tmdb.org/t/p/w500/" + item.poster_path} />

              <div className="ratetitle_container" key={`${item.id}${item.title}`}>
                <p className="cardstitle" key={item.title}>{item.title}</p>
                <p className="cardsrating" key={item.vote_average}>{item.vote_average} ✯</p>
              </div>

            </section>
          )

          )}
        </section>
        }

        <h3 className="section_title">popular tv-shows</h3>
        {!isloading && <section className="cardscontainer">
          {tvshow.map(item => (
            <section onClick={() => handleShowRecommendation(item, true)} key={`${item.id}${item.name}`} className="cards">
              <img className="cardsimg" key={`${item.id}${item.vote_average}`} alt={item.name}
                src={"https://image.tmdb.org/t/p/w500/" + item.poster_path} />

              <div className="ratetitle_container" key={`${item.id}${item.name}`}>
                <p className="cardstitle" key={item.name}>{item.name}</p>
                <p className="cardsrating" key={item.vote_average}>{item.vote_average}</p>
              </div>
            </section>
          )

          )}
        </section>
        }


        <h3 className="section_title">top rated series - all time</h3>
        {!isloading &&
          <section className="cardscontainer">
            {alltime_tvshow.map(item => (
              <section onClick={() => handleShowRecommendation(item, true)} key={`${item.id}${item.name}`} className="cards-alltime">
                <img className="cardsimg" key={`${item.id}${item.vote_average}`} alt={item.name}
                  src={"https://image.tmdb.org/t/p/w500/" + item.poster_path} />

                <div className="ratetitle_container" key={`${item.id}${item.name}`}>
                  <p className="cardstitle" key={item.name}>{item.name}</p>
                  <p className="cardsrating" key={item.vote_average}>{item.vote_average} ✯</p>
                </div>

              </section>
            )

            )}
          </section>
        }
      </section>

    }
  </article>
  )
}

export default Viewcharacter
