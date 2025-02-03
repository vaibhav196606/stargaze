// Initialize Cesium Viewer
const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain()
});

// Fetch locations from the backend
fetch('/api/locations')
    .then(response => response.json())
    .then(data => {
        const yourLocation = data.yourLocation;
        const herLocation = data.herLocation;

        // Add points for both locations
        viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(yourLocation.lon, yourLocation.lat),
            point: { pixelSize: 10, color: Cesium.Color.RED },
            label: { text: 'You (Jaipur)', font: '14px sans-serif', fillColor: Cesium.Color.WHITE }
        });

        viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(herLocation.lon, herLocation.lat),
            point: { pixelSize: 10, color: Cesium.Color.BLUE },
            label: { text: 'Her (San Francisco)', font: '14px sans-serif', fillColor: Cesium.Color.WHITE }
        });

        // Fly to a view that includes both locations
        viewer.camera.flyTo({
            destination: Cesium.Rectangle.fromDegrees(
                Math.min(yourLocation.lon, herLocation.lon) - 5,
                Math.min(yourLocation.lat, herLocation.lat) - 5,
                Math.max(yourLocation.lon, herLocation.lon) + 5,
                Math.max(yourLocation.lat, herLocation.lat) + 5
            )
        });
    });

    function haversine(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    }
    
    const distance = haversine(26.9124, 75.7873, 37.7749, -122.4194);
    document.getElementById('distance').innerText = `Distance: ${distance.toFixed(2)} km`;