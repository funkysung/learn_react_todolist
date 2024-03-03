import { useState } from "react";
//import TodoItem from "./components/TodoItem"
import { dummyData } from "./data/todos"
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import TodoSummary from "./components/TodoSummary";

function App() {
  const [todos, setTodos] = useState(dummyData)


  function setTodoCompleted(id: number, completed: boolean) {
    setTodos((prevTodos) => 
    prevTodos.map(todo => (todo.id === id ? {...todo, completed} : todo))
    )
  }

  function addTodo(title: string) {
    setTodos(prevTodos => [
      {
        id: prevTodos.length + 1,
        title,
        completed: false
      },
      ...prevTodos //this structure adds the new item on top of the existing list
    ])
  }

  function deleteTodo(id: number) {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id)) // set todo, make copy of prev todo, copy into the prevtodo the current array wiwth those with unmatching id filtered out
  }

  function deleteAllCompleted() {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed))
  }

  return (
    <main className = "py-10 h-screen space-y-5 overflow-y-auto">
      <h1 className="font-bold text-3xl text-center">
        Your Todos
      </h1>
      <div className="max-w-lg mx-auto bg-slate-100 rounded-md p-5 space-y-6">
        <AddTodoForm onSubmit={addTodo} />
        <TodoList
        todos = {todos}
        onCompletedChange={setTodoCompleted}
        onDelete={deleteTodo}
        />
      </div>
      <TodoSummary 
      todos={todos}
      deleteAllCompleted={deleteAllCompleted}
      />
    </main>
  )
}

export default App
