/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */







var onAddFeedClick = function(e) {
    console.log("add feed click !");
    handleAddFeed();
    //return false;
}




// set current feed in #intropage
var onFeedClick = function(e) {
    localStorage["currentFeed"] = getPositionInActionsList(e);
}

// set cuurent entry and url in #intropage
var onEntryClick = function(e) {
    
    var entry = getPositionInActionsList(e);
    console.log("onEntryClick entry index: " + entry);
    
    localStorage["currentEntry"] = entry;
}





// display an feed
function displayFeed(url) { // UPDATE
    var entries = feedCache[url];
    var s = "<ul data-role='listview' data-inset='true' id='entrylist'>";
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        s += "<li><a href='#entrypage' onclick='onEntryClick(this)'>" + entry.title + "</a></li>";
    }
    s += "</ul>";
    //s += "<a href='#intropage' data-role='button' data-theme='b'>Cancel</a>";
    $("#feedcontents").html(s);
    $("#entrylist").listview();
}



// handle add feed
function handleAddFeed() {
    console.log("add feed !");
    var feedname = $.trim($("#feedname").val());
    console.log("feedname: " + feedname);
    var feedurl = $.trim($("#feedurl").val());
    console.log("feedurl: " + feedurl);
    
    // basic error handling
    var errors = "";
    if (feedname == "")
        errors += "Feed name is required.\n";
    if (feedurl == "")
        errors += "Feed url is required.\n";
    if (errors != "") {
        //Create a PhoneGap notification for the error
        navigator.notification.alert(errors, function () {});
    } else {
        addFeed(feedname, feedurl);
        $.mobile.changePage($("#intropage"));
        //$.mobile.changePage($("index.html"));
    }
}

// handle delete feed in feed list
var handleDelFeed = function(e)
{
    removeFeed(getPositionInActionsList(e));
}
