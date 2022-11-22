import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: '1',
        title: 'task 1',
        description: 'taks 1 description',
        complete: false
    },
    {
        id: '2',
        title: 'task 2',
        description: 'taks 2 description',
        complete: false
    }
]

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload);
        },
        deleteTask: (state, action) => {
            console.log(action);
            const index = state.findIndex(task => task.id === action.payload);
            if(index !== -1) {
                state = state.splice(index, 1);
            }
        }
    }
})

export const  { addTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;