import { createSlice } from '@reduxjs/toolkit';

export const bikeSlice = createSlice({
    name: 'bike',
    initialState: {
      choosen : {},
      bikes : []
    },
    reducers: {
      select: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
      find: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
      clear: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
    }
    
});

export const { select, find, clear } = bikeSlice.actions;

export const bikeData = (state) => state.bike;

export default bikeSlice.reducer;