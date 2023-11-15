// Общее
import { createAsyncThunk } from "@reduxjs/toolkit";



export const fetchTotalBonded = createAsyncThunk(
  'currentChain/fetchTotalBonded',
  async function (baseUrl: string, { rejectWithValue }) {

    try {
      const response = await fetch(`${baseUrl}/cosmos/staking/v1beta1/pool`);
      if (!response.ok) throw new Error('Something went wrong');
      const data = await response.json();
      return data;
    }

    catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);