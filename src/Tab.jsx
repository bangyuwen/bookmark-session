import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DragSource } from 'react-dnd';

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
  opacity: ${props => (props.isDragging ? 0.5 : 1)}
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
`;

const Tab = ({ connectDragSource, data }) => connectDragSource(
  <div>
    <StyledTab className="tab">
      <FavIcon src={data.favIconUrl} alt="fav icon" />
      <Title>
        {data.title}
        <button type="button" onClick={() => switchTab(data.windowId, data.id)}>{'->'}</button>
      </Title>
      <button type="button" onClick={() => handleCloseTab(data.id)}>x</button>
    </StyledTab>
  </div>,
);

Tab.propTypes = {
  data: PropTypes.node.isRequired,
  connectDragSource: PropTypes.func.isRequired,
};

const spec = {
  beginDrag: props => props.data,
};

const collect = (connect, monitor) => ({
  isDragging: monitor.isDragging(),
  connectDragSource: connect.dragSource(),
});

export default DragSource('TAB', spec, collect)(Tab);
