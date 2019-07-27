import * as React from "react";
import * as ReactDOM from "react-dom";
import * as common from "../common/common";

import LocationForm from "./LocationForm";
import LocationList from "./LocationList";
import LocationMap from "./LocationMap";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./style.scss";


ReactDOM.render(
    <main>
        <Container fluid className="px-0">
            <Row noGutters>
                <Col xs={12}>
                    <LocationMap />
                </Col>
                {/*
                <Col xs={3}>
                    <LocationList />
                </Col>   
                */}             
            </Row>
        </Container>
        <LocationList/>
        <LocationForm />
    </main>,
    document.getElementById("example"),
);
