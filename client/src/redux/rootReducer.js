import { createAction, createReducer } from '@reduxjs/toolkit';

export const getFile = createAction('root/getFile');
export const setLoading = createAction('root/setLoading');

const initialState = { url: '', fileName: '', loading: false };

const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getFile, (state, action) => {
      state.url = action.payload.url;
      state.fileName = action.payload.fileName;
    })
    .addCase(setLoading, (state, action) => {
      state.loading = action.payload;
    });
});

export default rootReducer;
