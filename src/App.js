import React from 'react';
import logo from './logo.svg';
import loading from './loadingIcon.gif';
import './App.css';
import List from './List';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      newTodo: '',
      editing: false,
      editingIndex: null,
      notification: null,
      loading: true,
      todos: []
    }
    this.apiUrl = "https://5dfd2e1931f32a0014c82794.mockapi.io";
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.alert = this.alert.bind(this);
  }

  async componentDidMount() {
    const response = await axios.get(`${this.apiUrl}/todos`);

    setTimeout(() => {
      this.setState({
        todos: response.data,
        loading: false,
      })
    }, 1000);
  }

  handleChange(event) {
    this.setState({
      newTodo: event.target.value
    })
  }

  alert(notification) {
    this.setState({
      notification
    });

    setTimeout(() => {
      this.setState({
        notification: null
      })
    }, 2000);
  }

  async addTodo(event) {
    const response = await axios.post(`${this.apiUrl}/todos`, {
      name: this.state.newTodo
    });

    const todos = this.state.todos;
    todos.push(response.data);

    this.setState({
      todos: todos,
      newTodo: ''
    });

    this.alert("Item Added!");
  }

  async deleteTodo(index) {
    const todos = this.state.todos
    const todo = todos[index];
    await axios.delete(`${this.apiUrl}/todos/${todo.id}`);

    delete todos[index];

    this.setState({ todos });
    this.alert("Item Deleted!");
  }

  editTodo(index) {
    const todo = this.state.todos[index];

    this.setState({
      editing: true,
      newTodo: todo.name,
      editingIndex: index
    });
  }

  async updateTodo() {
    const todo = this.state.todos[this.state.editingIndex];
    todo.name = this.state.newTodo;
    const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`, {
      name: this.state.newTodo
    });

    const todos = this.state.todos;
    todos[this.state.editingIndex] = response.data;

    this.setState({
      todos,
      editing: false,
      newTodo: '',
      editingIndex: null
    });

    this.alert("Item Updated!");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.loading && (
            <img
              style={{ height: "40px", margin: "30px" }}
              src={loading}
              alt="loading"
            />
          )}
          {!this.state.loading && (
            <>
              <img src={logo} className="App-logo" alt="logo" />
              <div className="container" style={{ width: "475px" }}>
                {this.state.notification && (
                  <div className="alert alert-success">
                    <p className="textCenter">{this.state.notification}</p>
                  </div>
                )}
                <br />
                <ul className="list-group">
                  <div style={{ display: "flex" }}>
                    <input
                      type="text"
                      className="my-4 form-control"
                      placeholder="Add a new todo"
                      onChange={this.handleChange}
                      value={this.state.newTodo}
                    />
                    <button
                      className="btn-info form-control"
                      style={{width: "100px", marginLeft: "20px"}}
                      onClick={this.state.editing ? this.updateTodo: this.addTodo}
                      // disabled={this.state.newTodo < 5}
                    >
                      { this.state.editing ? "Update" : "New"}
                    </button>
                  </div>
                  <br />
                  {!this.state.editing && this.state.todos.map((item, index) => {
                    return (
                      <List
                        key={item.id}
                        deleteTodo={() => { this.deleteTodo(index)}}
                        editTodo={() => { this.editTodo(index)}}
                        item={item}
                      />
                    )
                  })}
                </ul>
              </div>
            </>
          )}
        </header>
      </div>
    );
  }
}

export default App;
