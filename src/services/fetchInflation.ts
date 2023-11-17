// Общее
import { createAsyncThunk } from "@reduxjs/toolkit";



export const fetchInflation = createAsyncThunk(
  'currentChain/fetchInflation',
  async function (baseUrl: string, { rejectWithValue }) {

    try {
      let response = await fetch(`${baseUrl}/cosmos/mint/v1beta1/inflation`);
      if (!response.ok) {
        setTimeout(async () => {
          response = await fetch(`${baseUrl}/cosmos/mint/v1beta1/inflation`);
          if (!response.ok) return;
        }, 8000);
      }
      const data = await response.json();
      return data.inflation;
    }

    catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);