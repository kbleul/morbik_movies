import React , {useState}from 'react';
import logo from '././imgs/logo/logo.jpg'

const Header = ({setshowreddit}) => {
   const [show_subreddits_btn, setshow_subreddits_btn] = useState(true);
  return (
      <header>
        <img src={logo} alt="logo" />
      {show_subreddits_btn &&  <button className="subreddit_btn" onClick={() => { setshowreddit(true); setshow_subreddits_btn(false)}}>Subreddits</button>}
      </header>
  )
};

export default Header;
