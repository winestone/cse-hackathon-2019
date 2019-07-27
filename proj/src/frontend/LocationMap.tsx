import React from "react";

import LocationMapStyle from "./LocationMapStyle";

(window as any).initMap = async () => {
    const node = document.getElementById("map");
    if (node === null) return;

    node.style.height = "100%";

    let curr = node.parentElement;
    while (curr) {
        curr.style.height = "100%";
        curr = curr.parentElement;
    }

    console.log("NODE?:", node);

    const { coords: { latitude: lat, longitude: lng } } =
        await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

    const map = new (window as any).google.maps.Map(node, {
        center: { lat, lng },
        zoom: 13,
        styles: LocationMapStyle,
        disableDefaultUI: true,
        gestureHandling: "greedy",
        zoomControl: true,
    });
};

class LocationMap extends React.Component {
    render() {
        return (
            <div
                id="map" 
                className="position-absolute"
                style={{ top: "0px", left: "0px", width: "100%" }}
            />
        );
    }    
}

export default LocationMap;