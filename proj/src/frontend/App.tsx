import React from "react";

import LocationList from "./LocationList";
import LocationMap from "./LocationMap";
import LocationForm from "./LocationForm";

import Button from "react-bootstrap/Button";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

import * as common from "../common/common";
import {FoodLocations} from "./data";

interface AppProps { };

interface AppState {
    signedIn: boolean;
    content: AppContent;
    location: common.Location | null;
    food_markers: any[];
    food_locations: FoodLocations;
    food_locations_refresh_timeout: number | null;
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
            food_markers: [],
            food_locations: { type: "loading" },
            food_locations_refresh_timeout: null,
        };

        this.appNav = this.appNav.bind(this);

        this.setLoggedIn = this.setLoggedIn.bind(this);
        this.logOut = this.logOut.bind(this);
        this.setContent = this.setContent.bind(this);
    }

    componentDidMount() {
        this.refreshFoodLocations(); // runs async
    }
    componentWillUnmount() {
        if (this.state.food_locations_refresh_timeout !== null) {
            window.clearTimeout(this.state.food_locations_refresh_timeout);
        }
    }

    async refreshFoodLocations() {
        // console.log("Refreshing food locations");
        const data = await fetch("/food");
        const food_locations: common.FoodLocation[] = await data.json();
        // console.log("Got food locations", food_locations);

        // async issues with google map initialisation so hacky 'fix'
        const food_locations_refresh_timeout = window.setTimeout(() => {
            this.state.food_markers.map(m => m.setMap(null));

            const markers: any[] = [];
            for (const { location: { latitude: lat, longitude: lng }, business_name, description } of food_locations) {
                const marker = new (window as any).google.maps.Marker({
                    position: { lat, lng },
                    map: (window as any).map,
                });

                const info = new (window as any).google.maps.InfoWindow({
                    content: description,
                    disableAutoPan: true,
                    position: { lat, lng },
                });

                info.open();

                markers.push(marker);
            }

            this.setState({
                ...this.state,
                food_markers: markers,
                food_locations: {
                    type: "loaded",
                    food_locations,
                },
                food_locations_refresh_timeout: null,
            })
            this.refreshFoodLocations(); // runs async
        }, 5000);
        
        this.setState({
            food_locations_refresh_timeout,
            ...this.state,
        });
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
                    <li onClick={this.setContent("list")}>   
                        <Button className = "btn btn-outline">Food</Button>
                    </li>
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
                    <li onClick={this.setContent("list")}>   
                        <Button className = "btn btn-outline">FOOD</Button>
                    </li>
                    <li onClick={this.setContent("signin")}>
                        <Button className = "btn btn-outline">SIGN IN</Button>
                    </li>
                    <li onClick={this.setContent("signup")}>
                        <Button className = "btn btn-outline">REGISTER</Button>
                    </li>
                </ul>
            );
        }
    }

    appBody() {
        // console.log("render appBody called, state:", this.state.content, "locs:", this.state.food_locations);
        switch (this.state.content) {
            case "list":
                return (
                    <LocationList locs={this.state.food_locations}/>
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
                    <div id="app-body">
                        {this.appBody()}
                    </div>
                </aside>
            </main>
        );
    }
}

export default App;
