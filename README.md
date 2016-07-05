# moonlight
```
//schema.js
import { String, Bool } from '../../types';

export default {
    todos: {
        text: String(30),
        done: Bool()
    }
};
```
```
// server.js
import { Schema, Config } from '../../';
import schema from './schema'

Config({
    database: {
        adapter: 'postgresql',
        host: '127.0.0.1',
        user: 'postgres',
        database: 'moon',
        password: ''
    },
    server: {
        port: 8088,
        dist: __dirname + '/../dist'
    }
});

Schema(schema);
```
```
//client.js
```

## Run
```
npm install
npm run todomvc
open http://localhost:8088/todomvc.html
```
