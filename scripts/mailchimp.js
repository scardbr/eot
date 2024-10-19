document.getElementById('subscribe-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email')
    };

    try {
        const response = await fetch('https://api-lyart-sigma-33.vercel.app/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            window.gtag = window.gtag || function() { dataLayer.push(arguments) };
            gtag('event', 'subscription_success');
            console.log('Subscription successful and event sent to GA4');
        } else {
            console.error('Subscription failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
