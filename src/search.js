import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({ setimgurl, setshowrec, setshownextbtn, setistv }) => {
    const [input, setinput] = useState("");
    const [searchtvshow, set_searchtvshow] = useState(false);
    const [searchsuggestions, set_searchseggestions] = useState([]);

    const [showsuggestionbox, set_showsuggestionbox] = useState(false);
    const idtitle_map = new Map();

    const [mapstate] = useState(idtitle_map);


    useEffect(() => {

        if (input !== "") {
            if (!searchtvshow) {
                const fetchquery = async () => {

                    try {
                        const response = await axios(`https://api.themoviedb.org/3/search/movie?api_key=6d9ca31c5cabba09160dddad1b991df7&query=${input}`);

                        set_searchseggestions(response.data.results)

                        searchsuggestions.map(item => { mapstate.set(item.title, item.id); return 0; })
                        set_showsuggestionbox(true);

                    } catch (error) { console.log("Fetch movie search recommendation failed") }
                }
                fetchquery();

            }
            else {
                const fetchquery = async () => {
                    try {

                        const response = await axios(`https://api.themoviedb.org/3/search/tv?api_key=6d9ca31c5cabba09160dddad1b991df7&query=${input}`);
                        set_searchseggestions(response.data.results)

                        searchsuggestions.map(item => { mapstate.set(item.name, item.id); return 0; })
                        set_showsuggestionbox(true);


                    } catch (error) { console.log("Fetch series search recommendation failed") }

                }
                fetchquery();
            }
        } else { set_showsuggestionbox(false) }
    }, [input, searchtvshow, searchsuggestions, mapstate]);

    const handleSearch = event => {
        event.preventDefault();

        if (!searchtvshow) {

            const fetchquery = async () => {
                let results;
                let errormsg = "";
                try {
                    results = await axios(`https://api.themoviedb.org/3/movie/${mapstate.get(input)}?api_key=6d9ca31c5cabba09160dddad1b991df7`);

                } catch (error) { errormsg = error; console.log("Fetch search movies results failed\n-----------" + error + "------------") }

                if (errormsg === "") {
                    try {
                        const fetchrecommendations = await axios(`https://api.themoviedb.org/3/movie/${mapstate.get(input)}/recommendations?api_key=6d9ca31c5cabba09160dddad1b991df7&language=en-US&page=1`);

                        if (fetchrecommendations.data.results.length === 0) {
                            setimgurl([`https://image.tmdb.org/t/p/w500${results.data.poster_path}`, `https://image.tmdb.org/t/p/w500${results.data.poster_path}`])
                        }
                        else {
                            setimgurl([`https://image.tmdb.org/t/p/w500${results.data.poster_path}`, fetchrecommendations.data.results])
                        }
                        setistv(false);
                        setinput("");
                    } catch (error) { console.log("Fetch movies recommendations from search error.\n-----------" + error + "------------") }
                } else {
                    let tempobj = { title: "Recommendation not found. Pick a different movie please !" }
                    setimgurl([``, [tempobj]])
                    setinput("");
                    errormsg = "";
                }
            }
            fetchquery();
            setshowrec(true);
            setshownextbtn(true);
            set_showsuggestionbox(false)
        }
        else {


            const fetchquery = async () => {
                let results;
                let errormsg = "";

                try {
                    results = await axios(`https://api.themoviedb.org/3/tv/${mapstate.get(input)}?api_key=6d9ca31c5cabba09160dddad1b991df7`);

                } catch (error) { errormsg = error; console.log("Fetch search series results failed\n-----------" + error + "------------") }

                if (errormsg === "") {
                    try {
                        const fetchrecommendations = await axios(`https://api.themoviedb.org/3/tv/${mapstate.get(input)}/recommendations?api_key=6d9ca31c5cabba09160dddad1b991df7&language=en-US&page=1`);

                        if (fetchrecommendations.data.results.length === 0) {
                            setimgurl([`https://image.tmdb.org/t/p/w500${results.data.poster_path}`, `https://image.tmdb.org/t/p/w500${results.data.poster_path}`])
                        }
                        else {
                            setimgurl([`https://image.tmdb.org/t/p/w500${results.data.poster_path}`, fetchrecommendations.data.results])
                        }

                        setistv(true);
                        setinput("");

                    } catch (error) { console.log("Fetch series recommendations from search error.\n-----------" + error + "------------") }
                } else {
                    let tempobj = { name: "Recommendation not found. Pick a different series please !" }
                    setimgurl([``, [tempobj]])
                    setinput("");

                    errormsg = "";
                }
            }
            fetchquery();
            setshowrec(true);
            setshownextbtn(true);
            set_showsuggestionbox(false)

        }

    }

    const handleSeggestionClick = (title) => {
        setinput(title)
        document.getElementById("searchinput").value = input;
    }

    return (
        <section className="formcontainer">
            <form onSubmit={handleSearch} className="form">
                <input onChange={(e) => setinput(e.target.value)} id="searchinput"
                    className="searchinput" type="text" placeholder='Search Movies . . . ' />
                <button className="searchbtn" type="submit" >
                    <svg className="searchbtn_svg" xmlns="http://www.w3.org/2000/svg"
                        width="2em" height="1.8em" viewBox="0 0 32 32">
                        <path d="M19 3C13.488 3 9 7.488 9 13c0 2.395.84 4.59 2.25 6.313L3.281 27.28L4.72 
                 28.72l7.968-7.969A9.922 9.922 0 0 0 19 23c5.512 0 10-4.488 10-10S24.512 3 19 3zm0 
                 2c4.43 0 8 3.57 8 8s-3.57 8-8 8s-8-3.57-8-8s3.57-8 8-8z" fill="currentColor" /></svg>
                </button>
            </form>
            <div className="series_moviechoice_container">
                <p>Search : </p>
                <button className={searchtvshow ? "searchmovies_btn" : "searchseries_btn"} onClick={() => set_searchtvshow(true)}>Tv Shows</button>
                <button className={searchtvshow ? "searchseries_btn" : "searchmovies_btn"} onClick={() => set_searchtvshow(false)}>Movies</button>
            </div>

            {
                showsuggestionbox && <div className='searchsuggestion_container'>
                    {searchtvshow ?
                        <div>
                            {searchsuggestions.map(item => (
                                <li key={`${item.name}${item.id}`} onClick={() => handleSeggestionClick(item.name)} >{item.name}</li>
                            ))}
                        </div> :
                        <div>
                            {searchsuggestions.map(item => (
                                <li key={`${item.title}${item.id}`} onClick={() => handleSeggestionClick(item.title)} >{item.title}</li>
                            ))}
                        </div>
                    }
                </div>
            }

        </section>
    )
}

export default Search
