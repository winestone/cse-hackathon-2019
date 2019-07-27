import React from "react";

import LocationList from "./LocationList";
import LocationMap from "./LocationMap";

import Button from "react-bootstrap/Button";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

import * as common from "../common/common";

interface AppProps { };

interface AppState {
    showForm: boolean;
    signedIn: boolean;
    content: AppContent;
    location: common.Location | null;
};

type AppContent =
    | "list"
    | "signin"
    | "signup"
    | "donate";

class App extends React.Component<AppProps, AppState> {
    constructor(props: any) {
        super(props);

        this.state = {
            showForm: false,
            signedIn: false,
            content: "list",
            location: null,
        };

        this.appNav = this.appNav.bind(this);
    }

    appNav() {
        if (this.state.signedIn) {
            return (
                <ul>
                    <li
                        onClick={() => this.setState({ content: "donate" })}
                    >
                        Donate
                    </li>
                    <li
                        onClick={() => this.setState({ signedIn: false, content: "list" })}
                    >
                        Sign Out
                    </li>
                </ul>
            );
        } else {
            return (
                <ul>
                    <li
                        onClick={() => this.setState({ content: "signin" })}
                    >
                        Sign In
                    </li>
                    <li
                        onClick={() => this.setState({ content: "signup" })}
                    >
                        Sign Up
                    </li>
                </ul>
            );
        }
    }

    appBody() {
        switch (this.state.content) {
            case "list":
                return (
                    <LocationList />
                );

            case "signin":
                return (
                    <LoginForm />
                );

            case "signup":
                return (
                    <SignUpForm />
                );

            case "donate":
                return (
                    null
                );

            // default:
            //     console.log("UNKNOWN CONTENT TYPE:", this.state.content);
            //     return null;
        }
    }

    render() {
        return (
            <main>
                <LocationMap />
                <aside>
                    <nav id = "login">
                        {/*
                            <Button type = "button" className = "btn btn-outline">LOGIN</Button>
                            <Button type = "button" className = "btn btn-outline">SIGN UP   </Button>
                        */}
                        {this.appNav()}
                    </nav>
                    <div>
                        {this.appBody()}
                    </div>
                </aside>
            </main>
        );
    }
}

export default App;