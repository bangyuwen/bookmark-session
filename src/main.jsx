// const display = (text) => {
//   document.getElementById('root').innerText = text;
// };

// const toTitle = (node) => {
//   if ('children' in node) {
//     return { [node.title]: node.children.map(toTitle) };
//   }
//   return { [node.title]: node.url };
// };

// chrome.bookmarks.getTree(
//   (bookmarkTreeNodes) => {

//     console.log(bookmarkTreeNodes);
//     const titleBookmarks = toTitle(bookmarkTreeNodes[0]);
//     console.log(titleBookmarks);

//     const text = JSON.stringify(titleBookmarks, null, 4);
//     display(text);
//   },
// );

// chrome.system.memory.getInfo((info) => {
//   console.log(info);
// });
// // chrome.bookmarks.create({
// //   title: 'test',
// //   url: 'chrome://bookmarks/?id=2',
// // }, (bookmark) => {
// //   console.log(bookmark);
// // });

// // chrome.bookmarks.get('2', (bookmark) => {
// //   console.log(bookmark);
// // });

// chrome.tabs.query({}, (tabs) => {
//   console.log(tabs);
  
// });


import React from 'react';
import ReactDOM from 'react-dom';

const element = <h1> Hello, world!!! </h1>;

ReactDOM.render(
  element,
  document.getElementById('root'),
);