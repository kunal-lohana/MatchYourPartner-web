import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: 'requests',
    initialState: null,
    reducers: {
        addRequests: (state, action) => action.payload,
        removeRequests: (state, action) => {
            const filterData = state.filter((request) => request._id != action.payload);
            return filterData;
        }
    }
})

export const { addRequests, removeRequests } = requestsSlice.actions;
export default requestsSlice.reducer;