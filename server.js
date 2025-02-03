const express = require('express');
const app = express();
const path = require('path');

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get user locations (mock data for now)
app.get('/api/locations', (req, res) => {
    const locations = {
        yourLocation: { lat: 26.9124, lon: 75.7873 }, // Jaipur coordinates
        herLocation: { lat: 37.7749, lon: -122.4194 } 
    };
    res.json(locations);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
