console.log('hello world');
chrome.bookmarks.getTree(
    function (bookmarkTreeNodes) {
        console.log(bookmarkTreeNodes);
    });
chrome.bookmarks.create({
    title: 'test',
    url: 'chrome://bookmarks/?id=2',
}, (bookmark) => {
    console.log(bookmark);
});
chrome.bookmarks.get("2", (bookmark) => {
    console.log(bookmark);
})