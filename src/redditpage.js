import React, {useState, useEffect} from 'react';
import subredditlist from './subredditlist';
import axios from 'axios';

const RedditPage = () => {

    const [reddit, setreddit] = useState({})
        useEffect(() => {
                const fetchsubreddit = async () => {
                    const result = await axios("https://www.reddit.com/r/movieclub/.json");
                    console.log(result.data.data.children)
                    setreddit(result.data.data.children[0].data)
                }
                fetchsubreddit();
        },[])
  return (<article className='subcontainer'>
          <p>{reddit.subreddit}</p>
          <p>{reddit.title}</p>
    </article>);
};

export default RedditPage;
