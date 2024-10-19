function activateTracking() {
    gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ads_storage': 'granted'
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var currentUrl = window.location.href;

    if (currentUrl.includes('/fr')) {
        if (!localStorage.getItem('cookiesAcceptedFr')) {
            document.querySelector('[data-cookies="fr"]').style.display = 'flex';
        }
        if (localStorage.getItem('cookiesAcceptedFr') === 'true') {
            activateTracking();
        }
    } else {
        if (!localStorage.getItem('cookiesClosedEn') && !localStorage.getItem('cookiesAcceptedFr')) {
            document.querySelector('[data-cookies="en"]').style.display = 'flex';
        }
    }
});

document.querySelector('[data-cookies="en"] [data-cookies="accept"]').addEventListener('click', function() {
    document.querySelector('[data-cookies="en"]').style.display = 'none';
    localStorage.setItem('cookiesClosedEn', 'true');
});

document.querySelector('[data-cookies="fr"] [data-cookies="accept"]').addEventListener('click', function() {
    document.querySelector('[data-cookies="fr"]').style.display = 'none';
    localStorage.setItem('cookiesAcceptedFr', 'true');
    activateTracking();
});

document.querySelector('[data-cookies="fr"] [data-cookies="deny"]').addEventListener('click', function() {
    document.querySelector('[data-cookies="fr"]').style.display = 'none';
    localStorage.setItem('cookiesAcceptedFr', 'false');
});
