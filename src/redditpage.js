import React, { useState, useEffect } from 'react';
import subredditlist from './subredditlist';
import axios from 'axios';
import loading from './imgs/loading.gif'


const RedditPage = ({setshowreddit}) => {

    const [reddit, setreddit] = useState([])
    const [subreddit, set_subreddit] = useState([])
    const [show_subreddit, set_show_subreddit] = useState(false);

    useEffect(() => {

        let temparr = [];

        for (let item of subredditlist) {
            const fetchsubreddit = async () => {

                const result = await axios(`https://www.reddit.com/r/${item}/.json`);

                temparr.push(result.data.data.children[0].data);

                if (temparr.length === 39) { setreddit(temparr); temparr = []; }

            }

            fetchsubreddit();

        }

    }, [])


    const getSubreddit = (subreddit_title) => {
        const fetchsubreddit = async () => {

            const result = await axios(`https://www.reddit.com/r/${subreddit_title}/.json`);
            set_subreddit(result.data.data.children)
            set_show_subreddit(true)

        }
        fetchsubreddit()
    }




    return (<article>
        <button onClick={() => setshowreddit(false)} className="backtofront_btn_second" >←</button>
        {show_subreddit ? <SubredditPage subreddit_list={subreddit} showsubreddit={set_show_subreddit} /> :
        <article className='reddit_subcontainer'>
            {reddit.length === 0 ? <img src={loading} alt="loading" className="loadingimg" /> :

                reddit.map(item => (<section key={item.permalink} className="redditsection"
                    onClick={() => { getSubreddit(item.subreddit) }}>

                    <p key={item.subreddit}>{item.subreddit}</p>
                    <p key={item.subreddit_name_prefixed} className="subreddit_para">{item.subreddit_name_prefixed}</p>
                    <p key={item.subreddit_type}>{item.subreddit_type}</p>
                    <p key={item.id} className="subscribers_para">Subscribers - {item.subreddit_subscribers}</p>
                </section>))
            }

        </article>
    }
    </article>
    );
};

const SubredditPage = ({ subreddit_list, showsubreddit }) => {

    const [comment_isfetch, set_comment_isfetched] = useState(false)
    const [subredditcontent_map, set_subredditcontent_map] = useState({})

    useEffect(() => {
        let counter = 0;
        let tempobj = {};
        let tempobj_two = {};

        subreddit_list.forEach(item => {
            const fetchcomments = async () => {

                if (item.data.title[item.data.title.length - 1] === "?") { item.data.title = item.data.title.slice(0, -1); }

                try {
                    const result = await axios(` https://www.reddit.com/r/${item.data.subreddit}/comments/${item.data.id}/${item.data.title}/.json`);

                    if (!result) { console.log("failed") }
                    tempobj[item.data.id] = result.data[0].data.children[0].data;

                    counter++;

                    if (counter === subreddit_list.length - 1) {
                        set_subredditcontent_map(tempobj)
                        set_comment_isfetched(true);

                    }
                } catch (error) {
                    console.log("Error: Fetch reddit posts failed.");
                    tempobj[item.data.id] = {}
                }
            }
            fetchcomments();
        });

    }, [])

   
    return (<article className="reddit_subcontainer">

        <button onClick={() => showsubreddit(false)} className="backtofront_btn" >←</button>


        <h2 key={subreddit_list[0].data.subreddit}>{subreddit_list[0].data.subreddit}</h2>
        {
            subreddit_list.map(item => (
                <section className="subreddit_section" key={item.data.id}>
                 <a href={`https://www.reddit.com/${item.data.permalink}`} target="_blank">

             <section className="subredditpost">     

                 <div className="upvotecontainer"  key={`${subreddit_list[0].data.permalink} ${subreddit_list[0].data.permalink} ${subreddit_list[0].data.permalink} ${subreddit_list[0].data.permalink}`}>

        <p  key={`${item.data.ups} ${subreddit_list[0].data.permalink}`} className="upvotepara">{item.data.ups}</p>

        <p className="upvotepara_arrow" key={`${subreddit_list[0].data.permalink} ${subreddit_list[0].data.ups} ${subreddit_list[0].data.permalink}`}>
        <svg xmlns="http://www.w3.org/2000/svg"  width="3em" height="5rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><g fill="currentColor"><path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/></g></svg></p> 
                </div>

                <div className="subredditpost_left" key={`${item.data.title} ${item.data.author}`}>
                    <h4 key={item.data.title}>{item.data.title}</h4>

                    { comment_isfetch && <section>{
                        subredditcontent_map[item.data.id] !== undefined && 
                        
                    <section key={subredditcontent_map[item.data.id].subreddit_id}>

                         <p key={subredditcontent_map[item.data.id].selftext}>{subredditcontent_map[item.data.id].selftext}</p>
               

                         <div className="subredditpost_bottom" key={`${subredditcontent_map[item.data.id].subreddit_id}${subredditcontent_map[item.data.id].subreddit_id}${item.data.author}`}>
                    <p key={item.data.author}>Submitted by : {item.data.author}</p>
                            <button  key={`${subredditcontent_map[item.data.id].num_comments} ${subredditcontent_map[item.data.id].subreddit_id}`} >{subredditcontent_map[item.data.id].num_comments} Comments </button>
                            </div>
                    </section>}
                    
                    </section>}
                </div>
                    </section> 
                  </a>
                </section>
            ))
        }
    </article>)
}

export default RedditPage;
