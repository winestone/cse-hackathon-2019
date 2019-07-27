import React, { FormEvent } from "react";
import * as common from "../common/common";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class LoginForm extends React.Component {
    constructor(props: {}) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event : FormEvent) {
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
            //handleSuccess();
        } else {
            //handleFailure();
        }
    }

    render() {
        return (
            <Container>
                <Row className = "rowForm">
                    <Col></Col>
                    <Col>
                    <div id = "form">
                    <div id = "title">Login</div>
                    <div id = "body">
                        <br></br>
                    <Form
                        id="login"
                        onSubmit={this.handleSubmit}
                    >
                        <Form.Group controlId = "username">
                            <Form.Label>
                                <input
                                    name="user-name"
                                    type="text"
                                    placeholder = "Username"
                                />
                            </Form.Label>
                        </Form.Group>
    
                        <Form.Group controlId = "password">
                            <Form.Label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder = "Password"
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

export default LoginForm;