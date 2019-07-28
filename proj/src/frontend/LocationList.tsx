import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

import Location from "./Location";

import * as common from "../common/common";
import {FoodLocations} from "./data";

interface LocationListProps {
    locs: FoodLocations;
};

interface LocationListState {};

class LocationList extends React.Component<LocationListProps, LocationListState> {
    render() {
        switch (this.props.locs.type) {
            case "loading":
                return <div id = "loading">Loading...</div>;
            case "loaded":
                if (0 < this.props.locs.food_locations.length) {
                    return (
                        <ListGroup>
                            {this.props.locs.food_locations.map((props) => (
                                <Location
                                    {...props}
                                />
                            ))}
                        </ListGroup>
                    );
                } else {
                    return <div>No food :(</div>;
                }
        }
    }
}

export default LocationList;
