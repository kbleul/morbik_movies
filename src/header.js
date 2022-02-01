import React from 'react';
import logo from '././imgs/logo/logo.jpg'

const Header = () => {
  return (
      <header>
        <img src={logo} alt="logo" />
        <button className="subreddit_btn">Subreddits</button>
      </header>
  )
};

export default Header;
