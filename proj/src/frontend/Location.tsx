import React, { FormEvent } from "react";

import * as common from "../common/common";

import ListGroupItem from "react-bootstrap/ListGroupItem";

class Location extends React.Component<common.FoodLocation> {
    render() {
        return (
            <ListGroupItem>
                <div>{this.props.business_name}</div>
                <div>{this.props.description}</div>
            </ListGroupItem>

        );
    }
}

export default Location;
