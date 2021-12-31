
import React, { useState } from 'react'
import Viewcharacter from './viewcharacter'


const App = () => {
  const [enter, setenter] = useState(false);

  return (<>
    <article id={`${enter ? "main_container_change" : "main_container"}`}>
      {enter ? <Viewcharacter />
        : <>
          <section className="frontleft_container">
            <p className="leftpara ">Movies ,Series , Subreddits . . .</p>
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
      </>
  )
}

export default App
