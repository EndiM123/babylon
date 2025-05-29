import React from 'react';
import './MapLocation.css';

const MapLocation = () => {
  // Replace this with your actual map image path
  const mapImage = '/babylonmap.png';

  return (
    <div className="map-location">
      <h4 className="map-heading">Location</h4>
      <div className="map-container">
        <img 
          src={mapImage} 
          alt="Our Location" 
          className="map-image"
          onError={(e) => {
            // Fallback in case the image fails to load
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300x200?text=Location+Map';
          }}
        />
      </div>
    </div>
  );
};

export default MapLocation;
