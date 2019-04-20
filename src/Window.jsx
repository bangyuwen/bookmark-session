import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tab from './Tab';

const StyledWindow = styled.div`
  width: 400px;
  height: 500px;
  display: inline-block;
  vertical-align: top;
  border: 2px solid pink;
  overflow-y: scroll;
`;

const Window = ({
  tabs, id, handleCloseWindow, handleCloseTab,
}) => {
  const content = tabs.map(tab => <Tab data={tab} handleCloseTab={handleCloseTab} />);

  return (
    <StyledWindow className="window">
      <button type="button" onClick={handleCloseWindow}>
        {`Close Window:  ${id.toString()}`}
      </button>
      {content}
    </StyledWindow>
  );
};

Window.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.node)).isRequired,
  id: PropTypes.number.isRequired,
  handleCloseWindow: PropTypes.func.isRequired,
  handleCloseTab: PropTypes.func.isRequired,
};

export default Window;
