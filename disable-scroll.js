document.addEventListener("DOMContentLoaded", function() {
    const navSheet = document.querySelector('.nav-sheet');

    const observer = new MutationObserver(function(mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.attributeName === 'style') {
                const displayStyle = window.getComputedStyle(navSheet).display;
                if (displayStyle === 'flex') {
                    // Disable page scrolling
                    document.body.style.overflow = 'hidden';
                } else if (displayStyle === 'none') {
                    // Enable page scrolling
                    document.body.style.overflow = '';
                }
            }
        }
    });

    observer.observe(navSheet, { attributes: true, attributeFilter: ['style'] });
});