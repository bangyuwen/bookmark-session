import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DropTarget } from 'react-dnd';

const handleCloseWindow = windowId => chrome.windows.remove(windowId);
const updateTabWindowId = (tabId, targetWindowId) => {
  chrome.tabs.move(tabId, { windowId: targetWindowId, index: -1 });
};

const StyledWindow = styled.div`
  margin: 5px 2px;
  width: 500px;
  height: 500px;
  display: inline-block;
  vertical-align: top;
  background-color: ${props => (props.canDrop ? 'green' : '#ffb6c178')}
  overflow-y: scroll;
`;

const Banner = styled.div`
  box-sizing: border-box;
  padding: 0px 5px;
  background-color: pink;
  font-size: 30px;
  font-color: white;
`;

const Window = ({ children, id, connectDropTarget }) => connectDropTarget(
  <spam>
    <StyledWindow className="window">
      <Banner>
        {`Window ID: ${id}`}
        <button type="button" onClick={() => handleCloseWindow(id)}>Close Window</button>
      </Banner>
      {children}
    </StyledWindow>
  </spam>,
);

Window.propTypes = {
  id: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const spec = {
  drop(props, monitor) {
    const tab = monitor.getItem();
    const { id: tabId } = tab;
    const { id: targetWindowId } = props;
    updateTabWindowId(tabId, targetWindowId);
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

export default DropTarget('TAB', spec, collect)(Window);
