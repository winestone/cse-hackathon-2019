import React, { FormEvent } from "react";
import * as common from "../common/common";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface LoginFormProps {
    onSuccess(): void;
}

type LoginFormState = {
    type: "initial",
} | {
    type: "login_failure",
};

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
    constructor(props: LoginFormProps) {
        super(props);
        this.state = { type: "initial" };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event: FormEvent) {
        event.preventDefault();

        this.setState({ type: "initial" });

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

        const result: boolean = await response.json();
        if (result) {
            this.props.onSuccess();
        } else {
            this.setState({ type: "login_failure" });
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
                        <div id = "userimg"><img src = "/static/images/usercolour.png" id = "userimg" height = "40px"></img></div>
                            <Form.Control type="text" name="user-name" placeholder="Username"></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Control type="password" name="password" placeholder="Password"></Form.Control>
                        </Form.Group>


                        <div id="button">
                            <Button id="submit" className="btn btn-outline" type="submit">Submit</Button>
                        </div>

                        <div>{this.state.type === "login_failure" ? "Incorrect username/password combination." : ""}</div>
                    </Form>
                </div>


            </div>
        );
    }
}

export default LoginForm;
