import React from 'react';

const createNewTab = () => chrome.windows.create({});

const Nav = () => (
  <div>
    <button type="button" onClick={createNewTab}>new tab</button>
  </div>
);

export default Nav;
