import React, { FormEvent } from "react";

import * as common from "../common/common";

import ListGroupItem from "react-bootstrap/ListGroupItem";
import Card from "react-bootstrap/Card";

const Location = ({ business_name, urgency, description }: common.FoodLocation) =>
    <ListGroupItem>
        <Card>
            <Card.Body>
                <Card.Title>{business_name}</Card.Title>
                <Card.Subtitle style={{ textTransform: "capitalize" }}>
                    {urgency} urgency
                </Card.Subtitle>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card> 
    </ListGroupItem>

export default Location;
