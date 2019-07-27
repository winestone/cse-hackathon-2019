import React, { FormEvent } from "react";

import * as common from "../common/common";

type LocationSearchFormProps = {
  location: common.Location;
  onChange: (location: common.Location) => void;
};

class LocationSearchForm extends React.Component<LocationSearchFormProps> {
  onLatitudeChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChange({
      latitude: parseFloat(event.target.value),
      ...this.props.location,
    });
  }
  onLongitudeChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChange({
      longitude: parseFloat(event.target.value),
      ...this.props.location,
    });
  }
  render() {
    return (
      <div>
        <input type="number" placeholder="Latitude" value={this.props.location.latitude} onChange={this.onLatitudeChange.bind(this)}/>
        <input type="number" placeholder="Longitude" value={this.props.location.longitude} onChange={this.onLongitudeChange.bind(this)}/>
      </div>
    );
  }
}
