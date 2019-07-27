import React, { FormEvent } from "react";

import * as common from "../common/common";


class Location extends React.Component {
    constructor(props: any) {
        super(props);

    }


    render() {
        return (
            <li>
                <div>{this.props.name}</div>
                <div>{this.props.address}</div>
                <div>{this.props.description}</div>
            </li>

        );
    }
}

export default Location;
