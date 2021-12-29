import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './search'

const Viewcharacter = () => {

  const [boxoffice, setboxoffice] = useState([]);
  const [alltime_boxoffice, setalltime_boxoffice] = useState([]);


  useEffect(() => {

    const fetchitems = async () => {
      try {
        const boxoffice_response = await axios("https://api.themoviedb.org/3/movie/popular?api_key=6d9ca31c5cabba09160dddad1b991df7&language=en-US&page=1");
        setboxoffice(boxoffice_response.data.results)

        const alltime_boxoffice_response = await axios("https://api.themoviedb.org/3/movie/top_rated?api_key=6d9ca31c5cabba09160dddad1b991df7&language=en-US&page=1");
        setalltime_boxoffice(alltime_boxoffice_response.data.results)

      } catch (error) {
        console.log("Error: Fetch movies failed.");
      }
    }

    fetchitems();
  }, []);


  return (<article className="subcontainer">
    <Search />
    <h3 className="section_title">favorites now</h3>
    <section className="cardscontainer">
      {boxoffice.map(item => (
        <section className="cards">
          <img className="cardsimg" key={`${item.id}${item.vote_average}`} alt={item.title} src={"https://image.tmdb.org/t/p/w500/" + item.poster_path} />

          <div className="ratetitle_container">
            <p className="cardstitle" key={item.title}>{item.title}</p>
            <p className="cardsrating">{item.vote_average}</p>
          </div>
        </section>
      )

      )}
    </section>

    <h3 className="section_title">top rated - all time</h3>
    <section className="cardscontainer">
      {alltime_boxoffice.map(item => (
        <section className="cards-alltime">
          <img className="cardsimg" key={`${item.id}${item.vote_average}`} alt={item.title} src={"https://image.tmdb.org/t/p/w500/" + item.poster_path} />

          <div className="ratetitle_container">
            <p className="cardstitle" key={item.title}>{item.title}</p>
            <p className="cardsrating">{item.vote_average} ✯</p>
          </div>

        </section>
      )

      )}
    </section>
  </article>
  )
}

export default Viewcharacter

/*
const fetcher = async (item) => {
  try { 
    const fetchimg = await axios(`https://imdb-api.com/en/API/Title/k_tyc6ndc8/${item.id}`);
    alltime_imagesobject.set(item.id , fetchimg.data.image);
    console.log(fetchimg.data.image)
    console.log("item get" + alltime_imagesobject.get(item.id))
  } catch(error) {  console.log(`Fetch alltime images error ${error}`)}
}

useEffect(() => {

    const fetchitems = async () => {
        try {
            //api keys   k_tyc6ndc8 or k_x78g8z9v
            const boxoffice_response = await axios("https://imdb-api.com/en/API/BoxOffice/k_tyc6ndc8");
              setboxoffice(boxoffice_response.data.items)
            const alltime_boxoffice_response = await axios("https://imdb-api.com/en/API/BoxOfficeAllTime/k_tyc6ndc8");

              alltime_boxoffice_response.data.items.splice(20, 180);
               setalltime_boxoffice(alltime_boxoffice_response.data.items);

               alltime_boxoffice_response.data.items.forEach(item => {
                
                       fetcher(item);
               })
          

        } catch (error) {
            console.log("Error: Fetch movies failed.");
        }

    }

    fetchitems();
}, [])  */