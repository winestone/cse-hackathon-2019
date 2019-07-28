import React, { FormEvent } from "react";

import * as common from "../common/common";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

type LocationFormState = {
    type: "initial"
} | {
    type: "submission_success"
};

class LocationForm extends React.Component<{}, LocationFormState> {
    constructor(props: {}) {
        super(props);
        this.state = { type: "initial" };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event: FormEvent) {
        event.preventDefault();
        this.setState({ type: "initial" });

        const form = document.getElementById("location") as HTMLFormElement;
        const formData = new FormData(form);

        const description = String(formData.get("description") || "");
        const image = ""; // idk
        const urgency = formData.get("urgency") as common.Urgency;

        const data: common.AddFoodLocation = {
            description,
            image,
            urgency,
        };

        console.log("DATA:", data);

        const response = await fetch("/food", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        this.setState({ type: "submission_success" });
    }

    render() {
        return (
            <div id="form-container">
                <div id="form-title">DONATE</div>
                <div id="form-body">
                    <Form
                        id="location"
                        onSubmit={this.handleSubmit}
                    >
                        <Form.Group controlId="description" id="form">
                            <Form.Control
                                name="description"
                                type="text"
                                placeholder="Donation Description"
                            />
                        </Form.Group>
                        <Form.Group controlId="image" id="form">
                            <Form.Control
                                name="image"
                                type="file"
                                placeholder="Location Image"
                            />
                        </Form.Group>
                        <Form.Group controlId="urgency" id="form">
                            <select name="urgency" defaultValue={"med"}>
                                <option value="low">low</option>
                                <option value="med">medium</option>
                                <option value="high">high</option>
                            </select>
                        </Form.Group>
                        <div id="button">
                            <Button id="submit" className="btn btn-outline" type="submit">Submit</Button>
                        </div>

                        <div>{this.state.type === "submission_success" ? "Success. Thank you for your donation! <3" : ""}</div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default LocationForm;
