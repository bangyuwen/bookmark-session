import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tab from './Tab';

const handleCloseWindow = windowId => chrome.windows.remove(windowId);

const StyledWindow = styled.div`
  margin-top: 20px;
  width: 400px;
  height: 500px;
  display: inline-block;
  vertical-align: top;
  border: 2px solid pink;
  overflow-y: scroll;
`;

const Window = ({ tabs, id }) => {
  const content = tabs.map(tab => <Tab data={tab} />);

  return (
    <StyledWindow className="window">
      <button type="button" onClick={() => handleCloseWindow(id)}>
        {`Close Window:  ${id.toString()}`}
      </button>
      {content}
    </StyledWindow>
  );
};

Window.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.node)).isRequired,
  id: PropTypes.number.isRequired,
};

export default Window;
