import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../api';

interface PaintingExpertiseState {
  author: string;
  error: string | null;
}

const initialState: PaintingExpertiseState = {
  author: '',
  error: null,
};

export const submitExpertise = createAsyncThunk(
  'expertise/submitExpertise',
  async (
    { expertiseId, author }: { expertiseId: string; author: string },
    { rejectWithValue },
  ) => {
    try {
      await api.paintingExpertise.paintingExpertisePutUpdate(expertiseId, {
        author,
      });

      const response = await api.paintingExpertise.paintingExpertiseFormUpdate(expertiseId);

      if (response.status === 200) {
        return expertiseId;
      } else {
        return rejectWithValue('Ошибка при формировании экспертизы.');
      }
    } catch {
      return rejectWithValue('Ошибка при формировании экспертизы.');
    }
  },
);

export const deleteExpertise = createAsyncThunk(
  'expertise/deleteExpertise',
  async (expertiseId: string, { rejectWithValue }) => {
    try {
      const response = await api.paintingExpertise.paintingExpertiseDeleteDelete(expertiseId);

      if (response.status === 200) {
        return expertiseId;
      } else {
        return rejectWithValue('Ошибка при удалении экспертизы.');
      }
    } catch {
      return rejectWithValue('Ошибка при удалении экспертизы.');
    }
  },
);

const expertiseSlice = createSlice({
  name: 'expertise',
  initialState,
  reducers: {
    updateExpertiseName: (state, action: PayloadAction<string>) => {
      state.author = action.payload;
    },
    clearExpertise: (state) => {
      state.author = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitExpertise.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteExpertise.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { updateExpertiseName, clearExpertise } = expertiseSlice.actions;

export default expertiseSlice.reducer;
