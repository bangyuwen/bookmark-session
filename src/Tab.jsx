import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledWindow = styled.div`
  width: 400px;
  height: 80%;
  display: inline-block;
  vertical-align: top;
  border: 2px solid pink;
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

const Tab = ({ data, handleCloseTab }) => (
  <div className="tab">
    {data.title}
    <button type="button" onClick={() => { handleCloseTab(data.id); }}>x</button>
  </div>
);

Tab.propTypes = {
  data: PropTypes.node.isRequired,
  handleCloseTab: PropTypes.func.isRequired,
};

export { Window, Tab };
