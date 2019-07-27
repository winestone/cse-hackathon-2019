import React from "react";
import Location from "./Location";

import * as common from "../common/common";

import ListGroup from "react-bootstrap/ListGroup";

interface LocationListProps {};

interface LocationListState {
    locations: Array<common.FoodLocation>;
    markers: Array<any>;
};

class LocationList extends React.Component<LocationListProps, LocationListState> {
    constructor(props: LocationListProps) {
        super(props);

        this.state = {
            locations: [],
            markers: [],
        };
    }

    async componentDidMount() {
        const data = await fetch("/food");
        const locations = await data.json();

        // async issues with google map initialisation so hacky 'fix'
        window.setTimeout(() => {
            const markers: Array<any> = [];
            for (const { location: { latitude: lat, longitude: lng }, business_name, description } of locations) {
                const marker = new (window as any).google.maps.Marker({
                    position: { lat, lng },
                    map: (window as any).map,
                });

                const info = new (window as any).google.maps.InfoWindow({
                    content: description,
                    disableAutoPan: true,
                    position: { lat, lng },
                });

                info.open();

                markers.push(marker);
            }

            this.setState({ locations, markers });
        }, 3000);
    }

    render() {
        return (
            <ListGroup>
                {this.state.locations.map((props) => (
                    <Location
                        {...props}
                    />
                ))}
            </ListGroup>
        );
    }
}

export default LocationList;
