import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const handleCloseTab = tabId => chrome.tabs.remove(tabId);
const switchTab = (windowId, tabId) => {
  chrome.windows.update(
    windowId, { focused: true },
    () => chrome.tabs.update(tabId, { active: true }),
  );
};

const StyledTab = styled.div`
  background-color: pink;
  border-width: 2px 0px 0px 0px;
  border-style: solid;
  border-color: white;
  padding: 5px 5px;
  font-size: 14px;
`;

const FavIcon = styled.img`
  width: 16px;
  height: 16px;
  padding: 0px 5px;
  vertical-align: middle;
`;

const Title = styled.span`
  padding: 0px 5px;
  vertical-align: middle;
  cursor: pointer;
`;

const Tab = ({ data }) => (
  <StyledTab className="tab">
    <FavIcon src={data.favIconUrl} alt="fav icon" />
    <Title onClick={() => switchTab(data.windowId, data.id)}>{data.title}</Title>
    <button type="button" onClick={() => { handleCloseTab(data.id); }}>x</button>
  </StyledTab>
);

Tab.propTypes = {
  data: PropTypes.node.isRequired,
};

export default Tab;
