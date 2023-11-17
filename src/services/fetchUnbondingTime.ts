// Общее
import { createAsyncThunk } from "@reduxjs/toolkit";



export const fetchUnbondingTime = createAsyncThunk(
  'currentChain/fetchUnbondingTime',
  async function (baseUrl: string, { rejectWithValue }) {

    try {
      const response = await fetch(`${baseUrl}/cosmos/staking/v1beta1/params`);
      if (!response.ok) throw new Error('Something went wrong');
      const data = await response.json();
      return data.params.unbonding_time;
    }

    catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);