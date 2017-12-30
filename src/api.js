const endpoint = 'http://localhost:8081'

const queryAPI = (path, method, body) => fetch(endpoint + path, { method: method, body: body })

const getTodos = () => queryAPI('/todo', 'GET').then(d => d.json())

const removeTodo = id => queryAPI(`/todo/${id}`, 'DELETE')

const createTodo = todo => queryAPI('/todo', 'POST', JSON.stringify(todo)).then(d => d.json())

const patchTodo = (id, todo) => queryAPI(`/todo/${id}`, 'PATCH', JSON.stringify(todo))

export default { getTodos, removeTodo, createTodo, patchTodo }
