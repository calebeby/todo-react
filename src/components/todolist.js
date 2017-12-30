import { h, renderer, Component } from 'preact'
import Todo from './todo'
import api from '../api.js'

const transformResponse = body => {
  let todos = {}
  body.forEach(item => {
    todos[item.id] = item
    delete todos[item.id].id
  })
  return todos
}

class TodoList extends Component {
  constructor() {
    super()

    this.state = { description: '' }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.create(e.target.children[0].value)
    this.setState({ description: '' })
  }

  patchCompleted = id => {
    return e => {
      api
        .patchTodo(id, { isCompleted: e.target.checked })
        .then(() => {
          this.setState(state => {
            state.todos[id].isCompleted = e.target.checked
            return state
          })
        })
        .catch(alert)
    }
  }

  remove = id => {
    return () => {
      api
        .removeTodo(id)
        .then(() =>
          this.setState(state => {
            delete state.todos[id]
            return state
          })
        )
        .catch(alert)
    }
  }

  create = description => {
    let todo = {
      description,
      createdAt: Math.round(new Date().getTime() / 1000),
    }

    api.createTodo(todo).then(d => {
      this.setState(state => {
        state.todos[d.response.id] = todo
        return state
      })
    })
  }

  componentWillMount() {
    api
      .getTodos()
      .then(body => this.setState({ todos: transformResponse(body.response) }))
      .catch(alert)
  }

  render(props, { todos }) {
    return (
      <div class="todolist">
        <h1>Todos</h1>
        <form onSubmit={this.handleSubmit} id="todoForm">
          <input type="text" placeholder="What needs to be done?" value={this.state.description} />
        </form>
        <ul class="todos">
          {todos
            ? Object.keys(todos).map(id => (
                <li>
                  <Todo
                    data={todos[id]}
                    onCompletedChange={this.patchCompleted(id)}
                    onRemove={this.remove(id)}
                  />
                </li>
              ))
            : null}
        </ul>
      </div>
    )
  }
}

export default TodoList
