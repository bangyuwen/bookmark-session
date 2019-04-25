import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Window from './Window';
import Tab from './Tab';

class App extends Component {
  static handleCloseWindow(windowId) {
    chrome.windows.remove(windowId);
  }

  constructor(props) {
    super(props);
    this.state = {
      windows: [],
      tabs: [],
    };
    this.refresh = this.refresh.bind(this);
  }

  componentWillMount() {
    this.refresh();
    chrome.tabs.onActivated.addListener(this.refresh);
    chrome.tabs.onUpdated.addListener(this.refresh);
    chrome.tabs.onAttached.addListener(this.refresh);
    chrome.tabs.onRemoved.addListener(this.refresh);
    chrome.windows.onCreated.addListener(this.refresh);
    chrome.windows.onRemoved.addListener(this.refresh);
  }

  refresh() {
    chrome.windows.getAll(null, (windows) => { this.setState(() => ({ windows })); });
    chrome.tabs.query({}, (tabs) => { this.setState(() => ({ tabs })); });
  }

  render() {
    const { windows, tabs } = this.state;
    const children = windows.map(
      window => (
        <Window
          id={window.id}
          data={window}
          handleCloseWindow={() => App.handleCloseWindow(window.id)}
          handleCloseTab={App.handleCloseTab}
        >
          {
            tabs.filter(tab => tab.windowId === window.id)
              .map(tab => <Tab data={tab} />)
          }
        </Window>
      ),
    );

    return (
      <div className="App">
        {children}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
