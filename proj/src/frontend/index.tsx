import * as React from "react";
import * as ReactDOM from "react-dom";
import * as common from "../common/common";

import LocationForm from "./LocationForm";
import LocationList from "./LocationList";

import "./style.scss";


ReactDOM.render(
    <main>
        <LocationForm />
        <LocationList />
    </main>,
    document.getElementById("example"),
);
