// Общее
import { createAsyncThunk } from "@reduxjs/toolkit";



export const fetchSupply = createAsyncThunk(
  'currentChain/fetchSupply',
  async function (baseUrl: string, { rejectWithValue }) {

    try {
      const response = await fetch(`${baseUrl}/cosmos/bank/v1beta1/supply?pagination.limit=9999999`);
      if (!response.ok) throw new Error('Something went wrong');
      const data = await response.json();
      return data.supply;
    }

    catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);