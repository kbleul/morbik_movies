import React, { useState, useEffect } from 'react';
import subredditlist from './subredditlist';
import axios from 'axios';
import loading from './imgs/loading.gif'


const RedditPage = () => {

    const [reddit, setreddit] = useState([])
    const [subreddit, set_subreddit] = useState([])
    const [show_subreddit, set_show_subreddit] = useState(false);

    useEffect(() => {

    let temparr = [];

        for (let item of subredditlist) {
            const fetchsubreddit = async () => {

                const result = await axios(`https://www.reddit.com/r/${item}/.json`);

                temparr.push(result.data.data.children[0].data);

                if (temparr.length === 40 ) {   setreddit(temparr);   temparr = [];  }

            }

            fetchsubreddit();

        }

    }, [])


    const getSubreddit = (subreddit_title,id,title) => {
        const fetchsubreddit = async () => {

            const result = await axios(`https://www.reddit.com/r/${subreddit_title}/.json`);
                   set_subreddit(result.data.data.children)
        set_show_subreddit(true)
            

        }
        fetchsubreddit()
    

    }




    return ( <article>{ show_subreddit ?  <SubredditPage subreddit_list={subreddit}/> :
        <article className='reddit_subcontainer'>
        {reddit.length === 0 ? <img src={loading} alt="loading" className="loadingimg" /> :

            reddit.map(item => (<section key={item.permalink} className="redditsection" 
            onClick={() => { getSubreddit(item.subreddit , item.id , item.title) } }>

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

const SubredditPage = ({subreddit_list}) => {


    useEffect(() => {
          subreddit_list.forEach(el => {
            const fetch_subreddit_info = async () => {
                const result = await axios(`https://www.reddit.com/r/${el.data.subreddit}/comments/${el.data.id}/${el.data.title}/.json`)
            }
          });

      
    })

    return (<article className="reddit_subcontainer">
        {
            subreddit_list.map(item => (
                <section key={item.data.id}>
                    <h2 key={item.data.title}>{item.data.title}</h2>
                    <p key={item.data.author}>Submitted by : {item.data.author}</p>
                </section>
            ))
        }
        </article>)
}

export default RedditPage;
