// Общее
import { createAsyncThunk } from "@reduxjs/toolkit";



export const fetchTotalBonded = createAsyncThunk(
  'currentChain/fetchTotalBonded',
  async function (baseUrl: string, { rejectWithValue }) {

    try {
      let response = await fetch(`${baseUrl}/cosmos/staking/v1beta1/pool`);
      if (!response.ok) {
        setTimeout(async () => {
          response = await fetch(`${baseUrl}/cosmos/staking/v1beta1/pool`);
          if (!response.ok) return;
        }, 4000);
      }
      const data = await response.json();
      return data.pool.bonded_tokens;
    }

    catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);