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
                        <ul>
                            <li>Sign In</li>
                            <li>Sign Up</li>
                        </ul>
                    </nav>
                    <div>
                        <LocationList />
                    </div>
                </aside>
                {this.state.showForm && <LocationForm />}
            </main>
        );
    }
}

export default App;