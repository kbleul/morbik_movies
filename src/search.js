import React from 'react'
import { useState , useEffect } from 'react'
import axios from 'axios'

const Search = () => {
    const [input , setinput] = useState("");
    const [searchtvshow, set_searchtvshow] = useState(false);
    const [ searchsuggestions, set_searchseggestions] = useState([]);
    const [showsuggestionbox, set_showsuggestionbox] = useState(false)

    useEffect(() => {
       if(!searchtvshow){ 
           const fetchquery = async () => {
            const response = await axios(`https://api.themoviedb.org/3/search/movie?api_key=6d9ca31c5cabba09160dddad1b991df7&query=${input}`);

            set_searchseggestions(response.data.results)
        }
        fetchquery();

        input === "" ? set_showsuggestionbox(false) : set_showsuggestionbox(true);
    }
    },[input])

    return (
        <section className="formcontainer">
            <form>
                <input onChange={(e) => setinput(e.target.value)} onBlur={() => setinput("")} className="searchinput" type="text" placeholder='Search Movies . . . ' />
            </form>
    {        
       showsuggestionbox && <div className='searchsuggestion_container'>
               { searchsuggestions.map(item => (
                    <li>{item.title}</li>
                ))}
            </div>
        }
        </section>
    )
}

export default Search
