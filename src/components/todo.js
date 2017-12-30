import { h, renderer, Component } from 'preact'

class Todo extends Component {
  render = ({ data, onCompletedChange, onRemove }) => {
    return (
      <div class="todo">
        <input type="checkbox" checked={data.isCompleted} onChange={onCompletedChange} />
        <span>{data.description}</span>
        <input type="button" onClick={onRemove} value="x" />
      </div>
    )
  }
}

export default Todo
