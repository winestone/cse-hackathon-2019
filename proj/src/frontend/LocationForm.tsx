import React, { FormEvent } from "react";

import * as common from "../common/common";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



class LocationForm extends React.Component {
    constructor(props: {}) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event : FormEvent) {
        event.preventDefault();
        
        const form = document.getElementById("location") as HTMLFormElement;
        const formData = new FormData(form);

        const name = String(formData.get("company-name") || "");
        const address = String(formData.get("company-address") || "");
        const description = String(formData.get("description") || "");

        const data: common.AddFoodLocation = {
            name,
            address,
            description,
        };

        console.log("DATA:", data);

        fetch("/add_food", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }

    render() {
        return (
            <Container>
                <Row></Row>
                <Row>
                <Col></Col>
                <Col id = "title">Donate</Col>
                <Col></Col>
                </Row>
                <Row className = "rowForm">
                    <Col></Col>
                    <Col>
            <Form
                id="location"
                onSubmit={this.handleSubmit}
            >
                <Form.Group controlId = "name">
                <Form.Label>
                    Company Name
                    <input
                        name="company-name"
                        type="text"
                    />
                </Form.Label>

                </Form.Group>

                <Form.Group controlId = "address">
                <Form.Label>
                    Company Address
                    <input
                        name="company-address"
                        type="text"
                    />
                </Form.Label>
                </Form.Group> 

                <Form.Group controlId = "description" id = "form"> 
                <Form.Label>
                    Donation Description
                    <input
                        name="description"
                        type="text"
                    />
                </Form.Label>
                </Form.Group>
                <div id = "button">
                <Button id = "submit">Submit</Button>
                </div>
            </Form>
            </Col>
            <Col> </Col>
            </Row> 
            </Container>
        );
    }
}

export default LocationForm;