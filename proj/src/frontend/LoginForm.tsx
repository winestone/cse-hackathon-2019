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

    handleSubmit(event : FormEvent) {

    }
