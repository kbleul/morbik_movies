
import React, { useState } from 'react'
import Viewcharacter from './viewcharacter'
import Header from './header';
import Redditpage from './redditpage';
import Footer from './fotter';

const App = () => {

  const [enter, setenter] = useState(false);
  const [showreddit_page, set_showreddit_page] = useState(false);
  const [showreddits_btn, setshow_redditsbtn] = useState(true);


  return (<article>

    <article id={`${enter ? "main_container_change" : "main_container"}`}>

      {enter ? (<article>
        <Header setshowreddit={set_showreddit_page} show_subreddits_btn={showreddits_btn} set_showreddit_btn={setshow_redditsbtn} />

        {showreddit_page ? <Redditpage setshowreddit={set_showreddit_page} set_showreddit_btn={setshow_redditsbtn}/> : <Viewcharacter />}

          <Footer />
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
