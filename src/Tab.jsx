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

const Window = ({ tabs }) => {
  const content = tabs.map(tab => <Tab title={tab.title} />);
  return (
    <StyledWindow className="window">
      {content}
    </StyledWindow>
  );
};

Window.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.node)).isRequired,
};


const Tab = ({ title }) => <div className="tab">{title}</div>;

Tab.propTypes = {
  title: PropTypes.string.isRequired,
};

export { Window, Tab };
