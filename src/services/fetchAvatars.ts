// Общее
import { Octokit } from "@octokit/rest";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Типизация
import IChain from "../models/IChain";



const octokit = new Octokit();

export const fetchAvatars = createAsyncThunk(
  'currentChain/fetchAvatars',
  async function (chain: IChain, { rejectWithValue }) {

    try {
      const response = await octokit.repos.getContent({
        owner: 'cosmostation',
        repo: 'cosmostation_token_resource',
        path: `moniker/${chain.cosmostationId}`
      });
      return response.data;
    }

    catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);