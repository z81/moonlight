export default class {
    constructor(schema, context) {
        this.schema = schema;
        this.context = context;
        this.reset();
        this.exec.bind(this);
        this.map.bind(this);
        this.data = [];
    }


    get(_fields = []) {
        let fields = {};
        _fields.forEach(f => fields[f] = '');

        this.query.type = 'read';
        this.query.query.fields = fields;
        return this.exec();
    }

    add(fields) {
        this.query.type = 'create';
        this.query.query.fields = fields;
        return this.exec();
    }

    update(fields) {
        this.query.type = 'update';
        this.query.query.fields = fields;
        return this.exec();
    }

    remove(fields) {
        this.query.type = 'remove';
        this.query.query.fields = fields;
        return this.exec();
    }

    reset() {
        this.query = {
            type: 'read',
            query: {
                schema: this.schema,
                fields: {}
            }
        };
    }

    map(clb) {
        return this.data.map(clb);
    }

    forEach(clb) {
        return this.data.forEach(clb);
    }

    filter(clb) {
        return this.data.filter(clb);
    }

    every(clb) {
        return this.data.every(clb);
    }

    toModel(item) {
        let newItem = {};
        const keys = Object.keys(item);

        keys.forEach(name => {
            newItem.__defineGetter__(name, ()=> item[name]);
            newItem.__defineGetter__('isEdit', () => item.isEdit);
            newItem.__defineSetter__('isEdit', value => {
                item.isEdit = value;
                this.context.forceUpdate();
            });

            newItem.__defineSetter__(name, value => {
                item[name] = value;
                this.context.forceUpdate();
            });

            newItem.remove = () => {
                this.remove(item);
            };

        });
        return newItem;
    }

    beforeExec(data) {
        switch (this.query.type) {
            case 'read':
                this.data = data.map(this.toModel.bind(this));
                break;
            case 'create':
                this.data.unshift(this.toModel(data));
                break;
            case 'update':
                this.data = this.data.map(item => {
                    if (item.id === this.query.query.fields.id) {
                        item = this.query.query.fields;
                    }
                    return item;
                });
                break;
            case 'remove':
                this.data.every((item, i) => {
                    if (item.id == this.query.query.fields.id) {
                        this.data.splice(i, 1);
                        return false;
                    }
                    return true;
                });
                break;
        }

        this.reset();
        this.context.forceUpdate();
        return data;
    }

    async exec() {
        return fetch('/query', {
            method: 'POST',
            body: JSON.stringify(this.query)
        })
            .then(d => d.json())
            .then(this.beforeExec.bind(this));
    }
}