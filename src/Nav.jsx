import React from 'react';
import PropTypes from 'prop-types';

const createNewTab = () => chrome.windows.create({});

const Nav = ({ sortTab }) => (
  <div>
    <button type="button" onClick={createNewTab}>new tab</button>
    <button type="button" onClick={sortTab}>sort by url</button>
  </div>
);

Nav.propTypes = {
  sortTab: PropTypes.func.isRequired,
};

export default Nav;
