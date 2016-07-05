import Koa from 'koa';
import Router from 'koa-router';
import koaBody from 'koa-body';
import serve from 'koa-static';

class Server {
    constructor() {
        this.app = new Koa();
        this.app.use(koaBody());
        this.initRouter();
    }


    initRouter() {
        this.router = new Router();

        this.router.post('/', async ctx => {
            let data = ctx.request.body;

            if (!data) return false;
            if (typeof data === 'string') data = JSON.parse(data);

            ctx.body = await this.query(data);
        });

        this.router.post('/query', async ctx => {
            let data = ctx.request.body;

            if (!data) return false;
            if (typeof data === 'string') data = JSON.parse(data);

            ctx.body = await this.query(data);
        });

        this.app.use(this.router.routes())
    }


    run() {
        this.app.use(serve(this.config.dist));
        this.app.listen(this.config.port || 3000);
    }


    setConfig(config) {
        this.config = config;
    }


    setSchemes(schemes) {
        this.schemes = schemes;
    }


    query({ type, query }) {
        if (!this.schemes.has(query.schema)) return false;

        switch (type) {
            case 'read': return this.read(query);
            case 'create': return this.create(query);
            case 'update': return this.update(query);
            case 'remove': return this.remove(query);
        }
    }

    update ({ schema, fields }) {
        return this.schemes.get(schema).model.update({ id: fields.id }, fields);
    }

    remove ({ schema, fields }) {
        return this.schemes.get(schema).model.destroy({ id: fields.id });
    }

    read ({ schema, fields }) {
        if (fields.length) {
            fields = Object.keys(fields);
        } else {
            fields = Object.keys(this.schemes.get(schema).attributes);
        }
        return this.schemes.get(schema).model.find({
            select: fields
        }).sort('id DESC');
    }

    create({ schema, fields })  {
        return this.schemes.get(schema).model.create(fields);
    }
}


export default Server;