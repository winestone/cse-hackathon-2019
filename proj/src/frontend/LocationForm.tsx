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
                <Row className = "rowForm">
                    <Col></Col>
                    <Col>
                    <div id = "form">
                    <div id = "title">Donate</div>
                    <div id = "body">
                        <br></br>
                    <Form
                        id="location"
                        onSubmit={this.handleSubmit}
                    >
                        <Form.Group controlId = "name">
                            <Form.Label>
                                <input
                                    name="company-name"
                                    type="text"
                                    placeholder = "Company Name"
                                />
                            </Form.Label>
                        </Form.Group>

                        <Form.Group controlId = "address">
                            <Form.Label>
                                <input
                                    name="company-address"
                                    type="text" 
                                    placeholder = "Company Address"
                                />
                            </Form.Label>
                        </Form.Group> 

                        <Form.Group controlId = "description" id = "form"> 
                            <Form.Label>
                                <input
                                    name="description"
                                    type="text"
                                    placeholder = "Donation Description"
                                />
                            </Form.Label>
                        </Form.Group>
                        <div id = "button">
                        <Button id = "submit" type="submit">Submit</Button>
                        </div>
                    </Form>
                    </div>
                    </div>
                    </Col>


            <Col> </Col>
            </Row> 
            </Container>
        );
    }
}

export default LocationForm;