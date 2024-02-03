import { useState, useEffect } from "react"
import { v4 as uuid } from 'uuid';
import List from '@mui/material/List';
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { Box, Typography } from "@mui/material";

const getInitialData = () => {
    const data = JSON.parse(localStorage.getItem("todos"))
    if (!data) return [];
    return data;
}

export default function TodoList() {
    const [todos, setTodos] = useState(getInitialData)

    useEffect(() => {
        localStorage.setItem(
            'todos',
            JSON.stringify(todos)
        )
    }, [todos])

    const removeTodo = (id) => {
        setTodos((prevTodos) => {
            return prevTodos.filter(t => t.id !== id)
        }
        )
    }
    const toggleTodo = (id) => {
        setTodos((prevTodos) => {
            return prevTodos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed }
                }
                else {
                    return todo
                }
            })
        })
    }

    const createTodo = (text) => {
        setTodos((prevTodos) => {
            return [...prevTodos, { text: text, id: uuid(), completed: false }]
        })
    }

    return (
        <Box sx={{
            display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", m: 3
        }}>
            <Typography variant="h1" component="h2">
                Todos
            </Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {todos.map(todo => {
                    return <TodoItem todo={todo} key={todo.id} remove={removeTodo} toggle={toggleTodo} />
                })}
                <TodoForm addTodo={createTodo} />
            </List>
        </Box>
    )
}