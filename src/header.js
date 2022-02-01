import React from 'react';
import logo from '././imgs/logo/logo.jpg'

const Header = ({setshowreddit}) => {
  return (
      <header>
        <img src={logo} alt="logo" />
        <button className="subreddit_btn" onClick={() => { console.log("hii"); setshowreddit(true)}}>Subreddits</button>
      </header>
  )
};

export default Header;
