import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import BannerBgImg1 from "./norkart.jpg";


const styles = {
  width: "100%",
  height: "calc(100vh - 80px)",
  position: "absolute"
};

const addMarkers = (geojson, map) => {
  geojson.features.forEach(function (marker) {
    // create a DOM element for the marker
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = `url(${BannerBgImg1})`
    // "require('norkart.jpg');"
    // marker.properties.iconSize.join('/') +
    // '/)';

    //  <img src="norkart.jpg" alt="IMAGE"></img>
    // url("norkart.jpg");
    el.style.width = marker.properties.iconSize[0] + 'px';
    el.style.height = marker.properties.iconSize[1] + 'px';
     
    el.addEventListener('click', function () {
      map.flyTo({
        center:[10.4032433, 63.4408788],
        zoom: 22.5,  // 22.5 is greater than the default maxZoom of 20
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });

        
    });
     
    // add marker to map
    new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);
    });
}

const MapboxGLMap = () => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);




  useEffect(() => {
    var geojson = {
      'type': 'FeatureCollection',
      'features': [
        {
        'type': 'Feature',
        'properties': {
          'message': 'Foo',
          'iconSize': [34, 50]
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [10.4032433, 63.4408788]
        }
      }
    ]};

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [10.408773,63.422091],
        zoom: 10
      });

      map.on("load", () => {
        setMap(map);
        map.resize();
        
        addMarkers(geojson, map);
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  

  return <div ref={el => (mapContainer.current = el)} style={styles} />;
};

export default MapboxGLMap;