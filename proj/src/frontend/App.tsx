import React from "react";

import LocationForm from "./LocationForm";
import LocationList from "./LocationList";
import LocationMap from "./LocationMap";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface AppProps { };

interface AppState {
    showForm: boolean;
};

class App extends React.Component<AppProps, AppState> {
    constructor(props: any) {
        super(props);

        this.state = {
            showForm: false,
        };
    }

    render() {
        return (
            <main>
                <LocationMap/>
                <aside>
                    <nav>

                    </nav>
                    <div>
                        
                    </div>
                </aside>
                {/*
                <div
                    style={{
                        position: "fixed",
                        margin: "48px",
                        width: "288px",
                        top: "0px",
                        right: "0px",
                        background: "#FFF",
                        borderRadius: "0.2em",
                        padding: "24px",
                        display: "flex",
                        justifyContent: "space-around",
                    }}
                >
                    <a>Login</a>
                    <a>Signup</a>
                </div>
                <LocationList />
                */}
                {this.state.showForm && <LocationForm />}
            </main>
        );
    }
}

export default App;