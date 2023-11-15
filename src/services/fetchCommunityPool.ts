// Общее
import { createAsyncThunk } from "@reduxjs/toolkit";



export const fetchCommunityPool = createAsyncThunk(
  'currentChain/fetchCommunityPool',
  async function (baseUrl: string, { rejectWithValue }) {

    try {
      // const response = await fetch(`${baseUrl}/cosmos/distribution/v1beta1/community_pool`);
      // if (!response.ok) throw new Error('Something went wrong');
      // const data = await response.json();
      // return data.pool;
      let response = await fetch(`${baseUrl}/cosmos/distribution/v1beta1/community_pool`);
      if (!response.ok) {
        setTimeout(async () => {
          response = await fetch(`${baseUrl}/cosmos/distribution/v1beta1/community_pool`);
          if (!response.ok) return;
        }, 5000);
      };
      const data = await response.json();
      return data.pool;
    }

    catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);