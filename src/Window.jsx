import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DropTarget } from 'react-dnd';

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

class Window extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.id,
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.getWindowStoredTitle = this.updateWindowStoredTitle.bind(this);
    this.handleSaveName = this.handleSaveName.bind(this);
    this.handleCloseWindow = this.handleCloseWindow.bind(this);
  }

  componentWillMount() {
    this.updateWindowStoredTitle();
  }

  updateWindowStoredTitle() {
    const { id } = this.props;
    chrome.storage.sync.get(`window${id}`, items => this.setState({ title: items[`window${id}`] }));
  }

  handleSaveName() {
    const { id } = this.props;
    const { title } = this.state;
    chrome.storage.sync.set({ [`window${id}`]: title });
  }

  handleChangeTitle(event) {
    this.setState({ title: event.target.value }, this.handleSaveName);
  }

  handleCloseWindow() {
    const { id } = this.props;
    chrome.windows.remove(id);
  }

  render() {
    const { children, id, connectDropTarget } = this.props;
    const { title } = this.state;
    return (
      connectDropTarget(
        <spam>
          <StyledWindow className="window">
            <Banner>
              <input name="window-name" value={title} onChange={this.handleChangeTitle} />
              <button
                type="button"
                onClick={() => Window.handleSaveName(id, title)}
              >
                Save Name
              </button>
              <button
                type="button"
                onClick={() => Window.handleCloseWindow(id)}
              >
                Close Window
              </button>
            </Banner>
            {children}
          </StyledWindow>
        </spam>,
      )
    );
  }
}

Window.propTypes = {
  id: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

const spec = {
  drop(props, monitor) {
    const tab = monitor.getItem();
    const { id: tabId } = tab;
    const { id: targetWindowId } = props;
    chrome.tabs.move(tabId, { windowId: targetWindowId, index: -1 });
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

export default DropTarget('TAB', spec, collect)(Window);
