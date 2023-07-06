import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModel: false,
  modelTitle: 'Processing',
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    SET_IS_API_CALLED: (state, { payload }) => {
      state.isModel = true;
      state.modelTitle = payload;
    },
    SET_IS_API_CALLED_FINISHED: (state) => {
      state.isModel = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { SET_IS_API_CALLED, SET_IS_API_CALLED_FINISHED } =
  loadingSlice.actions;

export default loadingSlice.reducer;
