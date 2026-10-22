import { createSlice } from "@reduxjs/toolkit";
import type { ConnectionsType } from "../modals/common";

const initialState: ConnectionsType = [];
const connectionSlice = createSlice({
    name: 'connections',
    initialState,
    reducers: {
        addConnections: (_state, action) => action.payload,
        removeConnections: (_state) => [] 
    }
})

export const { addConnections, removeConnections} = connectionSlice.actions;
export default connectionSlice.reducer;