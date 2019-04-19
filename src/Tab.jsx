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

const Window = ({ tabs, id, handleCloseWindow }) => {
  const content = tabs.map(tab => <Tab title={tab.title} />);
  return (
    <StyledWindow className="window">
      <button type="button" onClick={handleCloseWindow}>{`Close Window:  ${id.toString()}`}</button>
      {content}
    </StyledWindow>
  );
};

Window.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.node)).isRequired,
  id: PropTypes.number.isRequired,
  handleCloseWindow: PropTypes.func.isRequired,
};


const Tab = ({ title }) => <div className="tab">{title}</div>;

Tab.propTypes = {
  title: PropTypes.string.isRequired,
};

export { Window, Tab };
