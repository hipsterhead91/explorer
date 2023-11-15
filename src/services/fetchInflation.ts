// Общее
import { createAsyncThunk } from "@reduxjs/toolkit";



export const fetchInflation = createAsyncThunk(
  'currentChain/fetchInflation',
  async function (baseUrl: string, { rejectWithValue }) {

    try {
      const response = await fetch(`${baseUrl}/cosmos/mint/v1beta1/inflation`);
      if (!response.ok) throw new Error('Something went wrong');
      const data = await response.json();
      return data;
    }

    catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);