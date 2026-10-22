import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionsReducer from "./connectionSlice";
import requestsReducer from "./requestSlice";

export const store = configureStore({
    reducer:  {
        user : userReducer,
        feed: feedReducer,
        connections: connectionsReducer,
        requests: requestsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;