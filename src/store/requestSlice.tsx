import { createSlice } from "@reduxjs/toolkit";
import type { RequestsType } from "../modals/common";

const initialState: RequestsType = [];
const requestsSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        addRequests: (_state, action) => action.payload,
        removeRequests: (state, action) => {
            const filterData = state.filter((request) => request._id != action.payload);
            return filterData;
        },
        deleteRequest: (_state) => [],
    }
})

export const { addRequests, removeRequests, deleteRequest } = requestsSlice.actions;
export default requestsSlice.reducer;