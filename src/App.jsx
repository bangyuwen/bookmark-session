import React, { Component } from 'react';
import { Window } from './Tab';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowIds: [],
      tabs: [],
    };
    this.getWindowIds();
    this.getTabs();
  }

  getWindowIds() {
    chrome.windows.getAll(null, (windows) => {
      const windowIds = windows.map(window => window.id);
      this.setState(() => ({ windowIds }));
    });
  }

  getTabs() {
    chrome.tabs.query({}, (tabs) => {
      this.setState(() => ({ tabs }));
    });
  }

  handleCloseWindow(windowId) {
    chrome.windows.remove(windowId, () => {
      this.getWindowIds();
      this.getTabs();
    });
  }

  render() {
    const { windowIds, tabs } = this.state;
    const classifiedTabs = windowIds.map(windowId => tabs.filter(tab => tab.windowId === windowId));
    const children = classifiedTabs.map(
      (window, index) => (
        <Window
          tabs={window}
          id={windowIds[index]}
          handleCloseWindow={() => this.handleCloseWindow(windowIds[index])} 
        />
      ),
    );

    return (
      <div className="App">
        {children}
      </div>
    );
  }
}

export default App;
