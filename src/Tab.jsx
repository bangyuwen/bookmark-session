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
  border: ${props => (props.active ? '2px solid gray' : '0px')}
  background-color: pink;
  margin-top: 2px;
  padding: 7px 10px;
  font-size: 14px;
`;

const FavIcon = styled.img`
  width: 16px;
  height: 16px;
  padding: 0px 5px;
  vertical-align: middle;
  cursor: move;
`;

const Title = styled.span`
  padding: 0px 5px;
  vertical-align: middle;
`;

const Tab = ({ connectDragSource, data }) => connectDragSource(
  <div>
    <StyledTab className="tab" active={data.active}>
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
