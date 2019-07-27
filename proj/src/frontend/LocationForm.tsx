import React, { FormEvent } from "react";

import * as common from "../common/common";

class LocationForm extends React.Component {
    constructor(props: any) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event : FormEvent) {
        event.preventDefault();
        
        const form = document.getElementById("location") as HTMLFormElement;
        const formData = new FormData(form);

        const name = String(formData.get("company-name") || "");
        const address = String(formData.get("company-address") || "");
        const description = String(formData.get("description") || "");

        const data: common.AddFoodLocation = {
            name,
            address,
            description,
        };

        console.log("DATA:", data);

        fetch("/add_food", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }

    render() {
        return (
            <form
                id="location"
                onSubmit={this.handleSubmit}
            >
                <label>
                    Company Name
                    <input
                        name="company-name"
                        type="text"
                    />
                </label>
                <label>
                    Company Address
                    <input
                        name="company-address"
                        type="text"
                    />
                </label>
                <label>
                    Donation Description
                    <input
                        name="description"
                        type="text"
                    />
                </label>
                <button>Submit</button>
            </form>
        );
    }
}

export default LocationForm;