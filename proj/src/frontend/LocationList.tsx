import React from "react";
import Location from "./Location";

import * as common from "../common/common";

import ListGroup from "react-bootstrap/ListGroup";

interface LocationListProps {};

interface LocationListState {
    locations: Array<common.FoodLocation>;
};

class LocationList extends React.Component<LocationListProps, LocationListState> {
    constructor(props: LocationListProps) {
        super(props);

        this.state = {
            locations: [],
        };
    }

    async componentDidMount() {
        const data = await fetch("/get_food");
        const locations = await data.json();
        this.setState({ locations });
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