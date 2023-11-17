// Общее
import { createAsyncThunk } from "@reduxjs/toolkit";

// Прочее
import { filterActive, filterInactive, sortByTokens, addRanks } from "../utils/formatting";



export const fetchValidators = createAsyncThunk(
  'currentChain/fetchValidators',
  async function (baseUrl: string, { rejectWithValue }) {

    try {
      const response = await fetch(`${baseUrl}/cosmos/staking/v1beta1/validators?pagination.limit=9999999`);
      if (!response.ok) throw new Error('Something went wrong');
      const data = await response.json();
      let active = filterActive(data.validators);
      let inactive = filterInactive(data.validators);
      active = sortByTokens(active);
      inactive = sortByTokens(inactive);
      let all = active.concat(inactive);
      all = addRanks(all);
      return all;
    }

    catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);