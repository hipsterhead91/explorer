// Общее
import { createAsyncThunk } from "@reduxjs/toolkit";



export const fetchBlockHeight = createAsyncThunk(
  'currentChain/fetchBlockHeight',
  async function (baseUrl: string, { rejectWithValue }) {

    try {
      /* От рефетча по таймауту отказался, поскольку в компоненте Dashboard высота блока и так обновляется каждые 5 секунд. */
      const response = await fetch(`${baseUrl}/cosmos/base/tendermint/v1beta1/blocks/latest`);
      if (!response.ok) throw new Error('Something went wrong');
      const data = await response.json();
      return data.block.last_commit.height;
    }

    catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);