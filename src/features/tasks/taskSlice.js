import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: '1',
        title: 'task 1',
        description: 'taks 1 description',
        status: 'pending'
    },
    {
        id: '2',
        title: 'task 2',
        description: 'taks 2 description',
        status: "inProgress"
    },
    {
        id: '3',
        title: 'task 3',
        description: 'taks 3 description',
        status: "complete"
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
            const index = state.findIndex(task => task.id === action.payload);
            if(index !== -1) {
                state.splice(index, 1);
            }
        },
        updateTask: (state, action) => {
            const index = state.findIndex(task => task.id === action.payload.id);
            if(index !== -1) {
                state.splice(index, 1, action.payload);
            }
        },
        swapTasks: (state, action) => {
            const [i1, i2] = action.payload;
            const task1 = state[i1];
            const task2 = state[i2];
            state.splice(i1, 1, task2);
            state.splice(i2, 1, task1);
        }
    }
})

export const  { addTask, deleteTask, updateTask, swapTasks } = taskSlice.actions;
export default taskSlice.reducer;