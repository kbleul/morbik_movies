import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './search'

const Viewcharacter = () => {
/*
  const [boxoffice, setboxoffice] = useState([]);
  const [alltime_boxoffice, setalltime_boxoffice] = useState([]);

  let alltime_imagesobject = new Map();

  var axios = require("axios").default;

  var options = {
    method: 'GET',
    url: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
    params: { type: 'get-boxoffice-movies', page: '1' },
    headers: {
      'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com',
      'x-rapidapi-key': '6f086cff7fmshc85ad17d299aa15p12cc18jsn020d508320bc'
    }
  };

  useEffect(() => {
    const fetchitems = async () => {
      try {
        const boxoffice_response = await
          fetch("https://movie-database-imdb-alternative.p.rapidapi.com/?i=tt4154796&r=json", {
            "method": "GET",
            "headers": {
              "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
              "x-rapidapi-key": "6f086cff7fmshc85ad17d299aa15p12cc18jsn020d508320bc"
            }
          });


        console.log(boxoffice_response.data)
      } catch (error) { console.log("Fetch boxoffice movies failed" + error); }

    }
    fetchitems();

  }, [])  */

  
  return (<article className="subcontainer">
    <Search />
    <h3 className="section_title">box office</h3>
    <section className="cardscontainer">
      {boxoffice.map(item => (
        <section className="cards">
          <h5 className="cardsrank" key={item.id}>{item.rank}</h5>
          <img className="cardsimg" key={`${item.id}${item.rank}`} alt="" src={item.image} />
          <p className="cardstitle">{item.title}</p>
        </section>
      )

      )}
    </section>

    <h3 className="section_title">box office -all time</h3>
    <section className="cardscontainer">
      {alltime_boxoffice.map(item => (
        <section className="cards-alltime">
          <h5 className="cardsrank" key={item.id}>{item.rank}</h5>
          <img className="cardsimg" key={`${item.id}${item.rank}`} alt="" src="https://imdb-api.com/images/original/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_Ratio0.7015_AL_.jpg" />
          <p className="cardstitle">{item.title}</p>
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