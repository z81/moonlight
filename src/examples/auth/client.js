import React from 'react';
import ReactDOM from 'react-dom';
import schema from './schema';
import MoonLight from '../../client/component';

class App extends MoonLight {
    constructor(props) {
        super(props);
        this.state = {};
        //this.users.add({ login: 'test', email: 'test', password: 'test' })
        this.users.get();
    }

    render() {
        return (<div>
           test
        </div>);
    }
}


ReactDOM.render(<App schema={schema}/>, document.getElementById('root'));
