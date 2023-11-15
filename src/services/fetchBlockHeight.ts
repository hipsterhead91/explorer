// Общее
import { createAsyncThunk } from "@reduxjs/toolkit";



export const fetchBlockHeight = createAsyncThunk(
  'currentChain/fetchBlockHeight',
  async function (baseUrl: string, { rejectWithValue }) {

    try {
      const response = await fetch(`${baseUrl}/cosmos/base/tendermint/v1beta1/blocks/latest`);
      if (!response.ok) throw new Error('Something went wrong');
      const data = await response.json();
      return data;
    }

    catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);