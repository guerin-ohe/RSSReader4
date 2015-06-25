/* 
 * Model.js
 */

//used for caching
var feedCache = {};

//
// manage feeds
//
//
// get feeds list
function getFeeds() {
    if (localStorage["feeds"]) {
        return JSON.parse(localStorage["feeds"]);
    } else
        return [];
}

// add new feed
function addFeed(name, url) {
    var feeds = getFeeds();
    feeds.push({name: name, url: url});
    localStorage["feeds"] = JSON.stringify(feeds);
}

// delete feed by id
function removeFeed(id) {
    var feeds = getFeeds();
    feeds.splice(id, 1);
    localStorage["feeds"] = JSON.stringify(feeds);
    displayFeeds();
}
