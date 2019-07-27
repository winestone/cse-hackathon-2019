import React from "react";
import Location from "./LOcation";

import * as common from "../common/common";

interface LocationListState {
    locations: Array<common.AddFoodLocation>;
};

class LocationList extends React.Component<{}, LocationListState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            locations: [],
        };
    }

    async componentDidMount() {
        const data = await fetch("/get_food");
        const json = await data.json();
        console.log("DATA:", json);
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