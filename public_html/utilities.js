/* 
 * Utilities.js
 */

//
// utilities 
//

// get current position in action list
var getPositionInActionsList = function(e) {
    var all = e.parentNode.parentNode.children;
    var current = e.parentNode;
    console.log("size: " + all.length);
    var index  = Array.prototype.indexOf.call(all, current);
    console.log("index: " + index);
    return index;
}

// clear form
$.fn.clearForm = function() {   
    return this.each(function() {     
        var type = this.type, tag = this.tagName.toLowerCase();     
        if (tag == 'form')       
            return $(':input',this).clearForm();     
        if (type == 'text' || type == 'password' || tag == 'textarea')       
            this.value = '';     
        else if (type == 'checkbox' || type == 'radio')       
            this.checked = false;     
        else if (tag == 'select')       
            this.selectedIndex = -1;   
    }); 
};
