import React, { FormEvent } from "react";

import * as common from "../common/common";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

type SignUpFormState = {
    type: "initial",
} | {
    type: "register_success",
} | {
    type: "register_failure",
};

class SignUpForm extends React.Component<{}, SignUpFormState> {
    constructor(props: {}) {
        super(props);
        this.state = { type: "initial" };
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

        this.setState({ type: "initial" });

        const response = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const register_success: boolean = await response.json();
        this.setState({ type:register_success ? "register_success" : "register_failure" });
    }

    submissionResult() {
        switch (this.state.type) {
            case "initial":
                return <div></div>;
            case "register_success":
                return <div>Success</div>;
            case "register_failure":
                return <div>Failed</div>;
        }
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
                        <div id = "userimg"><img src = "/static/images/usercolour.png" id = "userimg" height = "40px"></img></div>

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
                        {this.submissionResult()}
                    </Form>
                </div>
            </div>
        );
    }
}

export default SignUpForm;
