class Type {
    constructor(type) {
        this.props = new Map();
        this.props.set('type', type)
    }

    length(value) {
        this.props.set('length', value);
        return this;
    }

    print() {
        return this.props;
    }

    getProp(name) {
        return this.props.get(name);
    }
}

export default Type;