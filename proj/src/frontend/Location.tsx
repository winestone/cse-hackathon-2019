import React, { FormEvent } from "react";

import * as common from "../common/common";

import ListGroupItem from "react-bootstrap/ListGroupItem";

class Location extends React.Component<common.AddFoodLocation> {
    render() {
        return (
            <ListGroupItem>
                <div>{this.props.name}</div>
                <div>{this.props.address}</div>
                <div>{this.props.description}</div>
            </ListGroupItem>

        );
    }
}

export default Location;
