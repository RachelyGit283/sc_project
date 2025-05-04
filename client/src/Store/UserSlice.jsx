import { createSlice } from '@reduxjs/toolkit'

const initVal = {
    user: {}
}

const UserSlice = createSlice({
    name: 'user',
    initialState: initVal,
    reducers: {
        add:(state, action) => {
            state.user=action.payload;
        },
        remove:(state, action) => {
            state.car={};
        }
    }
})

export const { add,remove} = UserSlice.actions
export default UserSlice.reducer