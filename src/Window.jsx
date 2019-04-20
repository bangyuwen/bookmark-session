import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tab from './Tab';

const handleCloseWindow = windowId => chrome.windows.remove(windowId);

const StyledWindow = styled.div`
  margin: 5px 2px;
  width: 500px;
  height: 500px;
  display: inline-block;
  vertical-align: top;
  background-color: #ffb6c178;
  overflow-y: scroll;
`;

const Banner = styled.div`
  box-sizing: border-box;
  padding: 0px 5px;
  background-color: pink;
  font-size: 30px;
  font-color: white;
`;

const Window = ({ tabs, id }) => {
  const content = tabs.map(tab => <Tab data={tab} />);

  return (
    <StyledWindow className="window">
      <Banner>
        {`Window ID: ${id}`}
        <button type="button" onClick={() => handleCloseWindow(id)}>Close Window</button>
      </Banner>
      {content}
    </StyledWindow>
  );
};

Window.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.node)).isRequired,
  id: PropTypes.number.isRequired,
};

export default Window;
