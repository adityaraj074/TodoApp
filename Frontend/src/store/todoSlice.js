import {createSlice} from '@reduxjs/toolkit';

const initialState = {todo: []};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todo.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todo = state.todo.filter(item => item._id !== action.payload);
    },
    markCompleted: (state, action) => {
      const todoItem = state.todo.find(item => item._id === action.payload);
      if (todoItem) {
        todoItem.completed = true;
      }
    },
    replaceTodos: (state, action) => {
      state.todo = action.payload;
    },
  },
});

export const {addTodo, deleteTodo, markCompleted, replaceTodos} =
  todoSlice.actions;
export default todoSlice.reducer;
