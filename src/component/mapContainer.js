import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

export default 
class SimpleMap extends Component {
    state = {
        center: {
            lat: 35.727802,
            lng: 51.331674
        }
        ,zoom: 15
        ,show:false
        ,width:'200px'
    };

    name = {};
    constructor(props) {
        super(props);
        this.props = props;
        this.makeState(props);
    }
    makeState= (props)=>{
        this.name = props.name || 'gmap';
        if (props.zoom !== undefined) {
            this.state.zoom = parseInt(this.props.zoom, 10);
        } 
        if (props.lat !== undefined) {
            this.state.center.lat = parseFloat(this.props.lat);
        }
        if (props.lng !== undefined) {
            this.state.center.lng = parseFloat(this.props.lng);
        }
        if(props.onClick === undefined){
            console.log('Error: you must handle onClick');
        }
        if (props.show !== undefined) {
            this.state.show = (props.show === 'true');
        }
        if (props.width !== undefined) {
            this.state.width = props.width;
        } 
    }

    handleClick(event) {
        console.log(event);
        var lat = event.lat;
        var lng = event.lng;
        this.props.onClick({'lat':lat, 'lng':lng});
    }

    render() {
        this.makeState(this.props);
        if( this.state.show !== true){
            return null;
        }
        return (
            <div style={{ height: '300px' }}>
                <GoogleMapReact
                    name={this.name}
                    key={this.name}
                    bootstrapURLKeys={{ key: 'AIzaSyDjs0u02-62FMwrtxMxci5pc6PIubSyW28' }}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                    onClick={(e) => this.handleClick(e,this.name)}
                >
                </GoogleMapReact>
            </div>
        );
    }
}


