import React, { useState , useEffect } from 'react'

const TopImage = ({ imgurl }) => {
console.log("renderd")
    const [currentrecommenstaion , set_currentrecommendation] = useState(imgurl[1][0]);
    const [shownextbtn, set_shownextbtn] = useState(false);
    const [secondsection , set_secondsection] = useState( {
        position: "absolute",
        top: "0",
        left: "10%",
        backgroundImage: `url(${imgurl[1][0]})`,
        backgroundColor: "rgb(95, 58, 58)",
        clipPath: "polygon(60% 0, 100% 0,100% 100%,35% 100%)",
        height: "70vh",
        margin: "0 auto",
        padding: "0",
        width: "80%",
    });

    const firstsection = {
        backgroundImage: `url(${imgurl[0]})`,
        backgroundColor: "gray",
        height: "70vh",
        padding: "0",
        width: "79%",
        margin: "0 auto",
        opacity: ".75",
    };
    /*
    let secondsection = {
        position: "absolute",
        top: "0",
        left: "10%",
        backgroundImage: `url(${imgurl[1][0]})`,
        backgroundColor: "rgb(95, 58, 58)",
        clipPath: "polygon(60% 0, 100% 0,100% 100%,35% 100%)",
        height: "70vh",
        margin: "0 auto",
        padding: "0",
        width: "80%",
    }


      if(imgurl[1].length > 1)
      { 
        secondsection= {
            position: "absolute",
            top: "0",
            left: "10%",
            backgroundColor: "rgb(95, 58, 58)",
            clipPath: "polygon(60% 0, 100% 0,100% 100%,35% 100%)",
            height: "70vh",
            margin: "0 auto",
            padding: "0",
            width: "80%",
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${imgurl[1][0].poster_path})`
        }
        console.log("size" + imgurl[1][0].poster_path)
      }
*/

      useEffect(() => {  
          if(imgurl[1].length > 1)  { 
        set_shownextbtn(true); 
          set_secondsection( {
            position: "absolute",
            top: "0",
            left: "10%",
            backgroundColor: "rgb(95, 58, 58)",
            clipPath: "polygon(60% 0, 100% 0,100% 100%,35% 100%)",
            height: "70vh",
            margin: "0 auto",
            padding: "0",
            width: "80%",
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${imgurl[1][1].poster_path})`
        } );
    }
        },[])
  
  const showNextRecommendation = () => {
    secondsection.backgroundImage = `url(https://image.tmdb.org/t/p/w500${imgurl[1][1].poster_path}`;
  }

    return (
        <div id="topimage_div">
            <article id="topimage_article">
                <section style={firstsection}></section>
                <section style={secondsection}></section>
              {shownextbtn &&  <button onClick={() => showNextRecommendation } className="nextbtn">→</button>}
            </article>
        </div>
    )
}

export default TopImage;
