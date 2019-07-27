import * as React from "react";
import * as ReactDOM from "react-dom";
import * as common from "../common/common";

import LocationForm from "./LocationForm";
import LocationList from "./LocationList";
import LocationMap from "./LocationMap";

ReactDOM.render(
    <main>
        <LocationForm />
        <LocationList />
        <LocationMap />
    </main>,
    document.getElementById("example"),
);
