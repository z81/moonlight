import Waterline from 'waterline';
import postgresAdapter from 'sails-postgresql';
import Type from './type';
import Conf from './config';
import Server from './server';



const conf = new Conf(),
    orm = new Waterline(),
    schemes = new Map(),
    server = new Server();

server.setSchemes(schemes);


export const Schema = schema => {
    server.setConfig(conf.getConfig().server);
    server.run();

    let config = {
        adapters: {
            postgresql: postgresAdapter
        },
        connections: {
            connection: conf.getConfig().database
        }
    };

    const tableNames = Object.keys(schema);
    tableNames.forEach(tableName => {
        const table = schema[tableName];
        const atrributesNames = Object.keys(table);
        let attributes = {};

        atrributesNames.forEach(name => {
            const attribute = table[name],
                props = ['type'];

            if (typeof attribute !== 'object' || !(attribute instanceof Type)) return false;

            attributes[name] = {};
            props.forEach(
                prop => attributes[name][prop] = attribute.getProp(prop)
            );
        });



        schemes.set(tableName, { attributes, table });
    });


    for(let [name, schem] of schemes) {
        const model = Waterline.Collection.extend({
            identity: name,
            connection: 'connection',
            attributes: schem.attributes
        });

        orm.loadCollection(model);
        schemes.set(name, schem);
    }



    orm.initialize(config, function(err, models) {
        for (let [name, schem] of schemes) {
            schem.model = models.collections[name];
            schemes.set(name, schem);
        }

        if(err) throw err;
    });



};

export const Config = conf.setConfig.bind(conf);