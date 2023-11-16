// Общее
import { createAsyncThunk } from "@reduxjs/toolkit";



export const fetchProposals = createAsyncThunk(
  'currentChain/fetchProposals',
  async function (baseUrl: string, { rejectWithValue }) {

    try {
      // const response = await fetch(`${baseUrl}/cosmos/gov/v1beta1/proposals`);
      // if (!response.ok) throw new Error('Something went wrong');
      // const data = await response.json();
      // return data.proposals;
      let response = await fetch(`${baseUrl}/cosmos/gov/v1beta1/proposals`);
      if (!response.ok) {
        setTimeout(async () => {
          response = await fetch(`${baseUrl}/cosmos/gov/v1beta1/proposals`);
          if (!response.ok) return;
        }, 5000);
      }
      const data = await response.json();
      return data.proposals;
    }

    catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);