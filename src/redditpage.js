import React, {useState, useEffect} from 'react';
import subredditlist from './subredditlist';
import axios from 'axios';
import loading from './imgs/loading.gif'


const RedditPage = () => {

    const [reddit, setreddit] = useState([])

    let temparr = [];

        useEffect(() => {

            for(let item of subredditlist)
            {
                const fetchsubreddit = async () => {

                    const result = await axios(`https://www.reddit.com/r/${item}/.json`);
                 
                    temparr.push(result.data.data.children[0].data);
                    if(temparr.length === 41) { setreddit(temparr)}

                }

                fetchsubreddit();

            }

        },[])


  return (<article className='reddit_subcontainer'>
         {reddit.length === 0  ? <img src={loading} alt="loading" className="loadingimg" /> :
            reddit.map(item => ( <section key={item.permalink} className="redditsection">
                <p key={item.subreddit}>{item.subreddit}</p>
                <p key={item.subreddit_name_prefixed} className="subreddit_para">{item.subreddit_name_prefixed}</p>
                <p key={item.subreddit_type}>{item.subreddit_type}</p>
                <p key={item.id} className="subscribers_para">Subscribers - {item.subreddit_subscribers}</p>
                </section>))
        }
    
    </article>);
};

export default RedditPage;
