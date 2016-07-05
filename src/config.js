export default class {
    constructor() {
        this.props = new Map();
    }


    setConfig(config) {
        this.props.set('config', config);
    }

    getConfig() {
        return this.props.get('config');
    }
}