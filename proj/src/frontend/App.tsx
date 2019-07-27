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

        this.setLoggedIn = this.setLoggedIn.bind(this);
        this.logOut = this.logOut.bind(this);
        this.setContent = this.setContent.bind(this);
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

    logOut() {
        fetch("/logout", { method: "GET", credentials: "include" });
        this.setLoggedIn(false);

        if (this.isLoggedIn()) {
            // If the cookie is still here for whatever reason nuke it
            document.cookie += "session_uuid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        }
    }

    setContent(content: AppContent) {
        return () => this.setState({ content });
    }

    appNav() {
        if (this.state.signedIn) {
            return (
                <ul id = "top-buttons">
                    <li onClick={this.setContent("donate")}>   
                        <Button className = "btn btn-outline">Donate</Button>
                    </li>
                    <li onClick={this.logOut}>
                        <Button className = "btn btn-outline">Sign Out</Button>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul id = "top-buttons">
                    <li onClick={this.setContent("signin")}>
                        <Button className = "btn btn-outline">SIGN IN</Button>
                    </li>
                    <li onClick={this.setContent("signup")}>
                        <Button className = "btn btn-outline">REGISTER </Button>
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
                    <LoginForm
                        onSuccess={this.setLoggedIn.bind(this, true)}
                    />
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
