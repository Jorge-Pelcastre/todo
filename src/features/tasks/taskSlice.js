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
    },
    {
        id: '4',
        title: 'task 4',
        description: 'taks 4 description',
        status: "complete"
    },
    {
        id: '5',
        title: 'task 5',
        description: 'taks 5 description',
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
            const [i1, i2, type] = action.payload;
            const status = state.filter(t => t.status === type);
            const task1 = status[i1];
            const task2 = status[i2];
            state.splice(state.findIndex(t => t.id === task1.id), 1, task2);
            state.splice(state.findIndex(t => t.id === task2.id), 1, task1);
        },
        changeStatus: (state, action) => {
            const [index, oldStatus, newStatus] = action.payload;
            const status = state.filter(t => t.status === oldStatus);
            status[index].status = newStatus;
        }
    }
})

export const  { addTask, deleteTask, updateTask, swapTasks, changeStatus } = taskSlice.actions;
export default taskSlice.reducer;