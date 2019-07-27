import React from "react";

import LocationForm from "./LocationForm";
import LocationList from "./LocationList";
import LocationMap from "./LocationMap";

import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

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