import { createReducer } from '@reduxjs/toolkit';
import { requestComments, requestCommentsSuccess, requestCommentsError, commentCreated, commentDeleted } from './actions';
import { CommentsState } from '../../types/Comments';

export const commentsReducer = createReducer<CommentsState>({
  data: [],
  error: false,
  loading: false
}, {
  [requestComments.type]: (state) => {
    state.data = [];
    state.error = false;
    state.loading = true;
  },

  [requestCommentsSuccess.type]: (state, { payload }) => {
    state.data = payload;
    state.error = false;
    state.loading = false;
  },

  [requestCommentsError.type]: (state) => {
    state.data = [];
    state.error = true;
    state.loading = false;
  },

  [commentCreated.type]: (state, { payload }) => {
    state.data.push(payload);
  },

  [commentDeleted.type]: (state, { payload: { id } }) => {
    state.data = state.data.filter(s => s.id !== id);
    state.error = false;
    state.loading = false;
  }
});
