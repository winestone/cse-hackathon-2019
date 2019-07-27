import React from "react";
import Location from "./LOcation";

import * as common from "../common/common";

interface LocationListProps {

};

interface LocationListState {
    locations: Array<common.AddFoodLocation>;
};

class LocationList extends React.Component<LocationListProps, LocationListState> {
    constructor(props: {}) {
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
            <ul>
                {this.state.locations.map(({ name, address, description }) => (
                    <Location
                        name={name}
                        address={address}
                        description={description}
                    />
                ))}
            </ul>
        );
    }
}

export default LocationList;