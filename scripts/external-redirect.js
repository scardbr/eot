(function() {
    document.addEventListener('readystatechange', function() {
        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            const redirectDiv = document.querySelector('div[external-redirect]');
            
            if (redirectDiv && redirectDiv.textContent.trim() !== '') {
                const url = redirectDiv.textContent.trim();
                
                if (url.startsWith('http')) {
                    window.location.href = url;
                }
            }
        }
    });
})();
