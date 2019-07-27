import React, { FormEvent } from "react";

import * as common from "../common/common";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class SignUpForm extends React.Component{
    constructor(props: {}) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event : FormEvent) {
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
            <Container>
                <Row className = "rowForm">
                    <Col></Col>
                    <Col>   
                    <div id = "form">
                    <div id = "title">Sign Up</div>
                    <div id = "body">
                        <br></br>
                    <Form
                        id="signup"
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

                        <Form.Group controlId = "business-name">
                            <Form.Label>
                                <input
                                    name="business-name"
                                    type="text" 
                                    placeholder = "Business Name"
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

                        <Form.Group controlId = "passwordconfirm">
                            <Form.Label>
                                <input
                                    name="passwordconfirm"
                                    type="password" 
                                    placeholder = "Confirm Password"
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

export default SignUpForm;