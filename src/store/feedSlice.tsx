import { createSlice } from "@reduxjs/toolkit";
import type { FeedsType } from "../modals/common";


const initialState: FeedsType = [];
const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
         addFeed(_state, action) {
            return action.payload
        },
        filterFeed(state, action) {
            return state?.filter((feed) => feed._id != action.payload)
        },
        removeFeed: (_state) => [],
    }
})

export const { addFeed, removeFeed, filterFeed } = feedSlice.actions;

export default feedSlice.reducer;