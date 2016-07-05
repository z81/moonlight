import { Schema, Config } from '../../';
import schema from './schema'

Config({
    database: {
        adapter: 'postgresql',
        host: '127.0.0.1',
        user: /*'postgres',//*/ 'Z80',
        database: 'moon',
        password: ''
    },
    server: {
        port: 8088,
        dist: __dirname + '/../dist'
    }
});


Schema(schema);