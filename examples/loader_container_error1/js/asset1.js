/*
 * Initialize the graphic.
 */
var pymChild = null;
var onWindowLoaded = function() {
    pymChild = new pym.Child();
    var onBoundingClientRectRequest = function(id) {
        console.log("BoundingRectReceived", id);
        var container = document.getElementById(id);
        // Ignore messages sent to posts that
        // have deing deleted from page
        if (!container) { return; }
        var rect = container.getBoundingClientRect();
        var rectString = rect.top + ' ' + rect.left + ' ' + rect.bottom + ' ' + rect.right;
        pymChild.sendMessage(id + '-bounding-client-rect-return', rectString);

    }
    pymChild.onMessage('visibility-available', function() {console.log('visibility-available');});
    pymChild.onMessage('element-visible', function(id) {
        console.log("elementVisible", id);
        pymChild.sendMessage('remove-tracker', id);
    });
    // Parent asks for the position of the element to check visibility
    pymChild.onMessage('request-bounding-client-rect', onBoundingClientRectRequest);
    pymChild.sendMessage('test-visibility-tracker', 'test');
    pymChild.sendMessage('request-tracking', 'tracker-test-1');
}

/*
 * Initially load the graphic
 * (NB: Use window.load to ensure all images have loaded)
 */
window.onload = onWindowLoaded;
