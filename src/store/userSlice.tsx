import { createSlice } from "@reduxjs/toolkit";
import type { UserType } from "../modals/common";

type UserState = Partial<UserType> | null;

const initialState = null as UserState;

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser:(_state, action) =>  action.payload,
        removeUser:(_state) =>  null,
    }
})
export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;