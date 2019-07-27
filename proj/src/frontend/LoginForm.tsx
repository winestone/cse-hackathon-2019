import React, { FormEvent } from "react";
import * as common from "../common/common";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface LoginFormProps {
    onSuccess(): void;
}

class LoginForm extends React.Component<LoginFormProps> {
    constructor(props: LoginFormProps) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event: FormEvent) {
        event.preventDefault();

        const form = document.getElementById("login") as HTMLFormElement;
        const formData = new FormData(form);

        const username = String(formData.get("user-name") || "");
        const password = String(formData.get("password") || "");

        const data: common.UserAndPass = {
            username,
            password
        };

        console.log("DATA:", data);

        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result) {
            this.props.onSuccess();
        } else {
            alert("Incorrect username/password combination.");
        }
    }

    render() {
        return (
            <div id="form-container">
                <div id="form-title">LOGIN</div>

                <div id="form-body">
                    <Form
                        id="login"
                        onSubmit={this.handleSubmit}
                    >
                        <Form.Group controlId="username">
                            <Form.Control type="text" name="user-name" placeholder="Username"></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Control type="password" name="password" placeholder="Password"></Form.Control>
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

export default LoginForm;
