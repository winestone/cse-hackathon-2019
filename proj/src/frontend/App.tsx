import React from "react";

import LocationForm from "./LocationForm";
import LocationList from "./LocationList";
import LocationMap from "./LocationMap";

<<<<<<< HEAD
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
=======
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
>>>>>>> da053ebdac7fd347b41aa8e9811937703ca05f3d

interface AppProps { };

interface AppState {
    showForm: boolean;
    signedIn: boolean;
    content: AppContent;
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
                        onClick={() => this.setState({ signedIn: false })}
                    >
                        Sign Out
                    </li>
                </ul>
            );
        } else {
            return (
                <ul>
                    <li
                        onClick={() => this.setState({ signedIn: true })}
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
                    <LocationForm />
                );

            default:
                console.log("UNKNOWN CONTENT TYPE:", this.state.content);
                return null;
        }
    }

    render() {
        return (
            <main>
                <LocationMap />
                <aside>
                    <nav id = "login">
                            <Button type = "button" className = "btn btn-outline">LOGIN</Button>
                            <Button type = "button" className = "btn btn-outline">SIGN UP   </Button>
                    <nav>
                        {this.appNav()}
                    </nav>
                    <div>
                        {this.appBody()}
                    </div>
                </aside>
                {this.state.showForm && <LocationForm />}
            </main >
        );
    }
}

export default App;