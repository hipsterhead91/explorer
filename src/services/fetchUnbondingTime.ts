// Общее
import { createAsyncThunk } from "@reduxjs/toolkit";



export const fetchUnbondingTime = createAsyncThunk(
  'currentChain/fetchUnbondingTime',
  async function (baseUrl: string, { rejectWithValue }) {

    try {
      /* На самом деле, по этому адресу мы получаем не сроки анбондинга напрямую, а объект с различными данными, среди которых, помимо всего прочего, хранятся и сроки - сейчас я извлекаю их в другом месте, но возможно стоит перенести логику сюда. */
      const response = await fetch(`${baseUrl}/cosmos/staking/v1beta1/params`);
      if (!response.ok) throw new Error('Something went wrong');
      const data = await response.json();
      return data;
    }

    catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);