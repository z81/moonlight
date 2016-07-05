import React, { Component } from 'react';
import queryBuilder from './query-builder';

class MoonLight extends Component {
    constructor(props) {
        super(props);

        Object.keys(this.props.schema).forEach(
            name => this[name] = new queryBuilder(name, this)
        )
    }
    
    val(name) {
        return {
            onChange: e => this.setState({ [name]: e.target.value }),
            value: this.state[name] || ''
        };
    }
}

export default MoonLight;