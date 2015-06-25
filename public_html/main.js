/* 
 * app.js
 * 
 */
var app = {
    
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        //document.addEventListener('deviceready', this.onDeviceReady, false);
        
        // handle "pageshow"
        // 
        //handle getting and displaying the intro or feeds
        $(document).on("pageshow", "#intropage", this.onIntroPageShow);
    
        //Listen for the addFeed Page so we can support adding feeds
        $(document).on("pageshow", "#addfeedpage", this.onAddFeedPageShow);
    
        //Listen for the Feed Page so we can displaying entries
        $(document).on("pageshow", "#feedpage", this.onFeedPageShow);
    
        //Listen for the Entry Page 
        $(document).on("pageshow", "#entrypage", this.onEntryPageShow);
        
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    
    // IntroPageShow Event Handler
    //
    onIntroPageShow: function() {
        app.displayFeeds();
    },
    
    // AddFeedPageShow Event Handler
    //
    onAddFeedPageShow: function() {
        // log
        console.log("add feed page show fired !");
        // clears forms
        $("#addFeedForm").clearForm();
    },
    
    // FeedPageShow Event Handler
    //
    onFeedPageShow: function() {
        // get current feed
        query = localStorage["currentFeed"];
            
        //assume it's a valid ID, since this is a mobile app folks won't be messing with the urls, but keep
        //in mind normally this would be a concern
        var feeds = getFeeds();
        var thisFeed = feeds[query];
        $("h1", this).text(thisFeed.name);
        if (!feedCache[thisFeed.url]) {
            $("#feedcontents").html("<p>Fetching data...</p>");
        
            //now use Google Feeds API
            var feedServiceUrl = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=" + encodeURI(thisFeed.url) + "&callback=?";
        
            // on feed service return
            var onFeedServiceReturn = function (res, code) {
                //see if the response was good...
                if (res.responseStatus == 200) {
                    feedCache[thisFeed.url] = res.responseData.feed.entries;
                    displayFeed(thisFeed.url);
                } else {
                    var error = "<p>Sorry, but this feed could not be loaded: < /p><p>" + res.responseDetails + "</p >";
                    $("#feedcontents").html(error);
                }
            }
        
            $.get(feedServiceUrl, {}, onFeedServiceReturn, "json");
        } else {
            displayFeed(thisFeed.url);
        }
    },
    
    // EntryPageShow Event Handler
    //
    onEntryPageShow: function() {
        // get current entry index
        var entryIndex = localStorage["currentEntry"];
        console.log("onEntryPageShow entry index: " + entryIndex);
    
        // get current feed
        var currentFeed = localStorage["currentFeed"];
        var feeds = getFeeds();
        var feed = feeds[currentFeed];
        var entryUrl = feed.url;
        console.log("onEntryPageShow entry url: " + entryUrl);
    
        // get current entry
        var entry = feedCache[entryUrl][entryIndex];
        console.log("onEntryPageShow entry title: " + entry.title);
        console.log("onEntryPageShow entry content: " + entry.content);
        console.log("onEntryPageShow entry link: " + entry.link);
        $("h1", this).text(entry.title);
        $("#entrycontents", this).html(entry.content);
        $("#entrylink", this).attr("href", entry.link);    
    },
    
    // apps methods
    //
    
    // display feeds
    displayFeeds: function() { 
        var feeds = getFeeds();
        if (feeds.length == 0) {
            //in case we had one form before...
            $("#feedList").html("");
            $("#introContentNoFeeds").show();
        } else {
            $("#introContentNoFeeds").hide();
            var s = "";
            for (var i = 0; i < feeds.length; i++) {
                s += "<li data-icon='delete'><a href='#feedpage' onclick='onFeedClick(this)'>" + feeds[i].name + "</a><a href='#' onclick='handleDelFeed(this)'>Delete</a></li>";
            }
            $("#feedList").html(s);
            $("#feedList").listview("refresh");
        }
    }
    
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

