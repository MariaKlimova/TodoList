import React, { useReducer, useContext } from 'react'
import {Alert} from 'react-native'
import {TodoContext} from './todoContext'
import { todoReducer } from './todoReducer'
import { ADD_TODO, CLEAR_ERROR, HIDE_LOADER, REMOVE_TODO, SHOW_LOADER, UPDATE_TODO, SHOW_ERROR, FETCH_TODOS } from '../types'
import { ScreenContext } from '../screen/screenContext'

export const TodoState = ({ children }) => {
    const initialState = {
        todos: [],
        loading: false, 
        error: null
    }
    const {changeScreen} = useContext(ScreenContext)
    const [state, dispatch]= useReducer(todoReducer,initialState)

    const addTodo = async title => {
      const response = await fetch('https://rn-todo-app-645a0-default-rtdb.firebaseio.com/todos.json', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify( { title } )
      })
      const data = await response.json()
      //console.log('Data', data)
      dispatch({type: ADD_TODO, title, id: data.name})
    }
    const removeTodo = id =>{
        const todo = state.todos.find(t => todo.id !== id)
        Alert.alert(
          'Удаление элемента',
          `Вы уверены, что хотите удалить ${todo.title}`,
          [
    
            {
              text: 'Отмена',
              style: 'cancel'
            },
            { text: 'Удалить', 
              style: 'destructive',
              onPress: () => {
                setTodoId(null)
                setTodos(prev => prev.filter(todo => todo.id !== id))
            } }
          ],
          { cancelable: false }
        )
        
        changeScreen(null)
        dispatch({type: REMOVE_TODO, id})
    }

    const fetchTodos = async() =>{
      showLoader()
      const response = await fetch('https://rn-todo-app-645a0-default-rtdb.firebaseio.com/todos.json', {
        method: 'GET', 
        headers: {'Content-Type': 'application/json'}
      })
      const data = await response.json()
      const todos = Object.keys(data).map(key => ({...data[key], id: key}))
      dispatch({type: FETCH_TODOS, todos})
      hideLoader()
    }

    const updateTodo = (id, title) => dispatch({type: UPDATE_TODO, id, title})

    const showLoader = () => dispatch({ type: SHOW_LOADER })

    const hideLoader = () => dispatch({ type: HIDE_LOADER })

    const showError = error => dispatch({ type: SHOW_ERROR, error })

    const clearError = () => dispatch({ type: CLEAR_ERROR })

    return <TodoContext.Provider 
        value={{
            todos: state.todos,
            loading: state.loading, 
            error: state.error, 
            addTodo, 
            removeTodo,
            updateTodo,
            fetchTodos
        }}
    >
        {children}
    </TodoContext.Provider>
}