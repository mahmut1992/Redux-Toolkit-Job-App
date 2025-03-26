import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  error: null,
  jobs: [],
};

const jobSlice = createSlice({
  name: "job",
  initialState: initialState,
  reducers: {
    setloading: (state) => {
      state.isLoading = true;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    setJobs: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.jobs = action.payload;
    },
    createJob: (state, action) => {
      // action içinde gelen payload değerini state içerisindeki jobs dizisine aktar
      state.jobs.push(action.payload);
    },
    deleteJob: (state, action) => {
      // deleteJob a gelen id  (dispatch(deleteJob(id))) ile DeleteButtondan gönderdik  ile silinecek veri state içerisinden bul ve state den kaldır
      const index = state.jobs.findIndex((i) => i.id == action.payload);
      state.jobs.splice(index, 1);
    },
  },
});

// Aksiyonlar
export const { setloading, setError, setJobs, createJob, deleteJob } =
  jobSlice.actions;

// Reducer
export default jobSlice.reducer;
