        //*********************
        // autoresize sections
        //*********************
/**
 * Return the height occupied by the siblings of a given element.
 *
 * @param {HTMLElement}
 * @return {Number}
 */
function getSiblingsHeight(div){
    var siblings = $(div).siblings();
    var occupiedHeight = 0;
    for (i=0; i<siblings.length; i++)
        var occupiedHeight = occupiedHeight + $(siblings[i]).height();
    return occupiedHeight;
}
/**
 * Return direct children elements.
 *
 * @param {HTMLElement}
 * @return {Array}
 */
function elementChildren (element) {
    var childNodes = element.childNodes;
    var children = [];
    for (i=childNodes.length-1; i>=0; i--) {
        // if the child is an element but _not_ a script, then
        if (childNodes[i].nodeType == 1 && childNodes[i].tagName != "SCRIPT") {
            // add it to the array
            children.unshift(childNodes[i]);
            // else do nothing and test the next child
        }
    }

    return children;
}
/**
 * Equally divide the height of an element and resize its children accordingly
 *
 * @param {HTMLElement}
 */
function childrenResize(parent){
    var children = elementChildren(parent);
    var totalHeight = $(window).height();
    var childrenNumber = children.length;
    var partialHeight = totalHeight/childrenNumber;
    for (i=0; i<childrenNumber; i++){
        $(children[i]).height(partialHeight);
    }
}
/**
 * Resize the pads' iframes in order to fit happily into their respective containers
 *
 */
function padsResize() {
    var pads = $("iframe.padsIframe");
    for (i=0; i<pads.length; i++){
        var occupiedHeight = getSiblingsHeight(pads[i]);
        var parent = $(pads[i]).parent();
        var parentHeight = $(parent).height();
        var setHeight = parentHeight-occupiedHeight;
        $(pads[i]).height(setHeight);
    }
}
// Main Routine
// when the document is ready
$(document).ready(function(){
    // get the body element
    var bodyElement = document.body;
    // resize its sections
    childrenResize(bodyElement);
    // then resize the pad iframe to accomodate into its section 
    padsResize();
        // and resize also when the window gets resized
        $(window).resize(function() {
        childrenResize(bodyElement);
        // then resize the pad iframe to accomodate into its section
        padsResize();
    });
});