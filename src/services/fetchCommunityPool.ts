// Общее
import { createAsyncThunk } from "@reduxjs/toolkit";



export const fetchCommunityPool = createAsyncThunk(
  'currentChain/fetchCommunityPool',
  async function (baseUrl: string, { rejectWithValue }) {

    try {
      let response = await fetch(`${baseUrl}/cosmos/distribution/v1beta1/community_pool`);
      if (!response.ok) {
        setTimeout(async () => {
          response = await fetch(`${baseUrl}/cosmos/distribution/v1beta1/community_pool`);
          if (!response.ok) return;
        }, 6000);
      };
      const data = await response.json();
      return data.pool;
    }

    catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);