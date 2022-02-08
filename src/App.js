
import React, { useState } from 'react'
import Viewcharacter from './viewcharacter'
import Header from './header';
import Redditpage from './redditpage'
//import { useMediaQuery } from 'react-responsive';

const App = () => {

 /* const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 480px)",
  });

  const isTabletDevice = useMediaQuery({
    query: "(min-device-width: 481px) and ( max-device-width: 768px)",
  });

  const isDesktopDevice = useMediaQuery({
    query: "(min-device-width: 769px ) and (max-device-width: 1200px)",
  })

  const isLargeScreenDevice = useMediaQuery({
    query: "(min-device-width: 1201px )",
  })
*/

  const [enter, setenter] = useState(false);
  const [showreddit_page, set_showreddit_page] = useState(false);

  return (<article>

    <article id={`${enter ? "main_container_change" : "main_container"}`}>
    
      {enter ? (<article>
        <Header setshowreddit={set_showreddit_page} />

         { showreddit_page ? <Redditpage setshowreddit={set_showreddit_page} />  :  <Viewcharacter />  }

        </article>
        ) 
         : <>
          <section className="frontleft_container">
            <p className="leftpara ">Movies ,Series ,Subreddits. . .</p>
          </section>


          <section className="frontcenter_container">

            <button className="enterbtn" onClick={() => { setenter(true) }}>START</button>
          </section>
          <section className="frontright_container">

         
              <p className="frontpara">Get a movie reccomendation based on a movie you have watched before.</p>
              <p className="frontpara">Search a movie you have watched old / new and get multiple movies simmilar to it !</p>
     
          </section>

        </>
      }
    </article>  

      </article>
  )
}

export default App
