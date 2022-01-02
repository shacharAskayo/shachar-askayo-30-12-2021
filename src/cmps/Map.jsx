/*
 * Base Google Map example
 */
// import React, {PropTypes, Component} from 'react/addons';
// import shouldPureComponentUpdate from 'react-pure-render/function';

import GoogleMap from 'google-map-react';
import { Component } from 'react';
import MapTs from './MapTs';
// import MyGreatPlace from './my_great_place.jsx';

export default class Map extends Component {
    static propTypes = {
        center: 10,
        zoom: 20,
    };

    static defaultProps = {
        center: [59.938043, 30.337157],
        zoom: 9,
        greatPlaceCoords: { lat: 59.724465, lng: 30.080121 }
    };

    //   shouldComponentUpdate = shouldPureComponentUpdate;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <GoogleMap
                // apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
                center={this.props.center}
                zoom={this.props.zoom}>
                <MapTs lat={34.052235} lng={-118.243683} />
            </GoogleMap>
        );
    }
}