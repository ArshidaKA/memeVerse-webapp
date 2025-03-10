import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://api.imgflip.com/get_memes";

export const fetchMemes = createAsyncThunk("memes/fetchMemes", async () => {
  const response = await axios.get(API_URL);
  return response.data.data.memes.slice(1);
});

const memeSlice = createSlice({
  name: "memes",
  initialState: { memes: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemes.pending, (state) => { state.loading = true; })
      .addCase(fetchMemes.fulfilled, (state, action) => {
        state.memes = action.payload;
        state.loading = false;
      })
      .addCase(fetchMemes.rejected, (state) => { state.loading = false; });
  },
});

export default memeSlice.reducer;
