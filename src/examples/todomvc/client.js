import React from 'react';
import ReactDOM from 'react-dom';
import schema from './schema';
import MoonLight from '../../client/component';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

const filters = {
    All: item => true,
    Active: item => !item.done,
    Completed: item => item.done
};

class App extends MoonLight {
    constructor(props) {
        super(props);
        this.todos.get();
        this.state = {
            filter: 'All'
        };
    }

    onKeyDown({ keyCode }) {
        if (keyCode === 13) {
            if (!this.state.text) return false;
            this.todos.add({ text: this.state.text });
            this.setState({ text: '' })
        }
    }

    setFilter(filter, e) {
        e.preventDefault();
        this.setState({ filter });
    }

    toggleAll(e) {
        this.todos.map(todo => todo.done = e.target.checked)
    }

    getTodos() {
        return this.todos.filter( filters[this.state.filter] );
    }

    renderTodo(todo) {
        const toggle = () => {
            todo.done = !todo.done;
            this.todos.update(todo);
        };
        const edit = () => todo.isEdit = true;
        const change = e => todo.text = e.target.value;
        const save = () => {
            this.todos.update(todo); // send to server
            todo.isEdit = false;
        };

        let className = '';
        if (todo.done && !todo.isEdit)  className+= ' completed';
        if (todo.isEdit)  className+= ' editing';

        return (
            <li key={todo.id} className={ className }>
                <div className="view">
                    <input type="checkbox" className="toggle" checked={!!todo.done} onChange={toggle} />
                    <label onDoubleClick={edit}>{ todo.text }</label>
                    <button className="destroy" onClick={todo.remove}></button>
                </div>
                <input
                    className="edit"
                    value={todo.text}
                    onChange={change}
                    onBlur={save}
                    autofocus
                />
            </li>
        )
    }

    renderFooter() {
        return (
            <footer className="footer">
                <span className="todo-count"><strong>{this.todos.filter(t => !t.done).length}</strong> item left</span>
                <ul className="filters">
                    {Object.keys(filters).map(name => {
                        const props = {
                            className: this.state.filter === name ? 'selected' : '',
                            onClick: this.setFilter.bind(this, name)
                        };
                        return <li key={name}><a {...props}>{name}</a></li>
                    })}
                </ul>
            </footer>
        )
    }

    render() {
        return (<div>
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <input className="new-todo" placeholder="What needs to be done?" autofocus {...this.val('text')} onKeyDown={this.onKeyDown.bind(this)} />
                </header>
                <section className="main">
                    <input className="toggle-all" id="toggle-all" type="checkbox" onClick={this.toggleAll.bind(this)}/>
                        <ul className="todo-list">
                            {this.getTodos().map(this.renderTodo.bind(this))}
                        </ul>
                </section>

                { this.renderFooter() }

            </section>

            <footer className="info">
                <p>Double-click to edit a todo</p>
                <p>Written by <a href=""></a></p>
                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
            </footer>
        </div>);
    }
}


ReactDOM.render(<App schema={schema}/>, document.getElementById('root'));
