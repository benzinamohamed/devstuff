import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toasts: []
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    toastAdded: (state, action) => {
      state.toasts.push(action.payload);
    },
    toastRemoved: (state, action) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    toastsCleared: (state) => {
      state.toasts = [];
    }
  }
});

export const { toastAdded, toastRemoved, toastsCleared } = toastSlice.actions;

export const showToast = (message, type = 'success') => (dispatch) => {
  const id = Date.now() + Math.random();
  dispatch(toastAdded({ id, message, type }));
  setTimeout(() => {
    dispatch(toastRemoved(id));
  }, 3500);
};

export const removeToast = (id) => (dispatch) => {
  dispatch(toastRemoved(id));
};

export const selectToasts = (state) => state.toast.toasts;

export default toastSlice.reducer;
