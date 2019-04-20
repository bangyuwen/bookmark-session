import React, { Component } from 'react';
import Window from './Window';

export default class App extends Component {
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
    chrome.tabs.onUpdated.addListener(this.refresh);
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
    const windowIds = windows.map(window => window.id);
    const classifiedTabs = windowIds.map(windowId => tabs.filter(tab => tab.windowId === windowId));
    const children = classifiedTabs.map(
      (window, index) => (
        <Window
          tabs={window}
          id={windowIds[index]}
          handleCloseWindow={() => App.handleCloseWindow(windowIds[index])}
          handleCloseTab={App.handleCloseTab}
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
