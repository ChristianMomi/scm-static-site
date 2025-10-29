// Show when the page was loaded
function showTime() {
    var now = new Date();
    var timeString = now.toString();
    document.getElementById('timestamp').textContent = 'Page loaded at: ' + timeString;
}

// Run when page loads
window.onload = function() {
    showTime();
    console.log('Page loaded successfully');
};
