import React, { FormEvent } from "react";

import * as common from "../common/common";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class SignUpForm extends React.Component {
    constructor(props: {}) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event: FormEvent) {
        event.preventDefault();

        const form = document.getElementById("signup") as HTMLFormElement;
        const formData = new FormData(form);

        const username = String(formData.get("user-name") || "");
        const password = String(formData.get("password") || "");
        const business_name = String(formData.get("business-name") || "");
        const { coords: { latitude, longitude } } =
            await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

        const data: common.User = {
            username,
            password,
            business_name,
            location: { latitude, longitude },
        };

        console.log("DATA:", data);

        fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }

    render() {
        return (
            <div id="form-container">
                <div id="form-title">SIGN UP</div>
                <div id="form-body">
                    <Form
                        id="signup"
                        onSubmit={this.handleSubmit}
                    >
                        <Form.Group controlId="username">
                            <Form.Control
                                name="user-name"
                                type="text"
                                placeholder="Username"
                            />
                        </Form.Group>

                        <Form.Group controlId="business-name">
                            <Form.Control
                                name="business-name"
                                type="text"
                                placeholder="Business Name"
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Group>

                        <Form.Group controlId="passwordconfirm">
                            <Form.Control
                                name="passwordconfirm"
                                type="password"
                                placeholder="Confirm Password"
                            />
                        </Form.Group>

                        <div id="button">
                            <Button id="submit" className="btn btn-outline" type="submit">Submit</Button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default SignUpForm;
