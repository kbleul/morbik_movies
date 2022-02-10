import React from 'react';
import logo from '././imgs/logo/logo.jpg'

const Header = ({setshowreddit,show_subreddits_btn,set_showreddit_btn}) => {
  return (
      <header>
        <img src={logo} alt="logo" onClick={() => {setshowreddit(false); set_showreddit_btn(true)}}/>
      {show_subreddits_btn &&  <button className="subreddit_btn" onClick={() => { setshowreddit(true); set_showreddit_btn(false)}}>Subreddits</button>}
      </header>
  )
};

export default Header;
