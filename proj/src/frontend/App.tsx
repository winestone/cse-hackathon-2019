import React from "react";

import LocationList from "./LocationList";
import LocationMap from "./LocationMap";
import LocationForm from "./LocationForm";

import Button from "react-bootstrap/Button";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

import * as common from "../common/common";

interface AppProps { };

interface AppState {
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
            signedIn: this.isLoggedIn(),
            content: "list",
            location: null,
        };

        this.appNav = this.appNav.bind(this);
    }

    isLoggedIn() {
        return document.cookie
            .split(";")
            .map(x => x.split("="))
            .some(([key]) => key === "session_uuid");
    }

    setLoggedIn(signedIn: boolean) {
        const content =
            signedIn
                ? "donate"
                : "list";

        this.setState({ signedIn, content });
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
                return <LocationForm />;
        }
    }

    render() {
        return (
            <main>
                <LocationMap />
                <aside>
                    <nav id="nav-login">
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
