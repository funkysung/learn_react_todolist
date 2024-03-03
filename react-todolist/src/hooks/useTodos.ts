import { useEffect, useState } from "react";
import { Todo } from "../types/todo";
import { dummyData } from "../data/todos";

export default function useTodos() {
    const [todos, setTodos] = useState(() => {
        //below section brings saved todo list from local storage (if exists)
        const savedTodos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]")
        return savedTodos.length > 0 ? savedTodos : dummyData;
      })
    
      //useEffect is a react component that does not need to be rendered every time by refresing
      //if any paramenter is passed onto the empty array, the effect will occur only when the array value is altered
      //this useEffect below allows to store the todolist in browser local memory every time todos item is altered
      //can check this in work by looking in dev mode -> application -> local storage
      useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
      }, [todos])
    
    
      function setTodoCompleted(id: number, completed: boolean) {
        setTodos((prevTodos) => 
        prevTodos.map(todo => (todo.id === id ? {...todo, completed} : todo))
        )
      }
    
      function addTodo(title: string) {
        setTodos(prevTodos => [
          {
            id: Date.now(),
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

      return {
        todos,
        setTodoCompleted,
        addTodo,
        deleteTodo,
        deleteAllCompleted
      }
}