import React, { Component } from 'react';
import Tab from './Tab';

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

  render() {
    const { windowIds, tabs } = this.state;
    const classifiedTabs = windowIds.map(windowId => tabs.filter(tab => tab.windowId === windowId));
    const children = classifiedTabs.map(window => window.map(tab => <Tab title={tab.title} />));

    return (
      <div className="App">
        {children}
      </div>
    );
  }
}

export default App;
