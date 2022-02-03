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

                if (temparr.length === 39 ) {   setreddit(temparr);   temparr = [];  }

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




    return ( <article>{ show_subreddit ?  <SubredditPage subreddit_list={subreddit} showsubreddit={set_show_subreddit}/> :
        <article className='reddit_subcontainer'>
        {reddit.length === 0 ? <img src={loading} alt="loading" className="loadingimg" /> :

            reddit.map(item => (<section key={item.permalink} className="redditsection" 
            onClick={() => { getSubreddit(item.subreddit) } }>

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

const SubredditPage = ({subreddit_list , showsubreddit}) => {
    const [subredditcontent, set_subredditcontent] = useState({})
    const [showcontent , set_showcontent] = useState(false);
    const [commentreplies, set_commentreplies] = useState([])

    const getPost = (subreddit,id, comment_title ) => {

        if(comment_title[comment_title.length-1] == "?")
        {  comment_title = comment_title.slice(0,-1); console.log(comment_title)}
    //    console.log(comment_title)

        const fetchcomments = async () => {
            const result = await axios(` https://www.reddit.com/r/${subreddit}/comments/${id}/${comment_title}/.json`)
//            set_subredditcontent(result.data[0].data.children)
       
                set_subredditcontent(result.data[0].data.children[0].data)
                set_commentreplies(result.data[1].data.children)
            
        set_showcontent(true);

        }

        fetchcomments();
       
    }

    const SubredditContent = () => {
         return (<article className="subreddit_subcontainer" key={subredditcontent.id}>
            <button onClick={() => set_showcontent(false)} className="backtofront_btn" >←</button>
            <h2 key={subredditcontent.subreddit}>{subredditcontent.subreddit}</h2>

            <h3 key={subredditcontent.title}>{subredditcontent.title}</h3>
            <p key={subredditcontent.selftext}>{subredditcontent.selftext}</p>
            <p key={subredditcontent.ups}>{subredditcontent.ups}</p>
            <p key={subredditcontent.num_comments}>{subredditcontent.num_comments}</p>
            <p key={subredditcontent.author}>{subredditcontent.author}</p><hr />

         {commentreplies.map(item => (
             <section key={item.data.id}>
                <p key={`${item.data.id} ${item.data.author}`}>{item.data.author}</p>
                <p key={item.data.link_id}>{item.data.body}</p>
                <p key={item.data.link_id + "x"}>{item.data.replies === "" ? '' :`Replies ${item.data.replies.data.children.length} `}</p>
             </section>
         ))}
            </article>)
    }

    return (<article className="reddit_subcontainer">
    {showcontent ? <SubredditContent /> : <article>
        <button onClick={() => showsubreddit(false) } className="backtofront_btn" >←</button>

            <h2 key={subredditcontent.subreddit}>{subredditcontent.subreddit}</h2>
          {  
            subreddit_list.map(item => (
                <section className="subreddit_section" key={item.data.id} onClick={() => getPost(item.data.subreddit,item.data.id,item.data.title)}>

                    <h4 key={item.data.title}>{item.data.title}</h4>
                    <p key={item.data.author}>Submitted by : {item.data.author}</p>
                    <p key={item.data.author_fullname}>upvotes : {item.data.ups}</p>
                </section>
            ))
        } </article>
    }
        </article>)
}

export default RedditPage;
