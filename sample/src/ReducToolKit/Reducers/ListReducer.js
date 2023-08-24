import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch users from an API
export const fetchList = createAsyncThunk("items/fetchItems", async () => {
  const Url = "http://localhost:3000/ItemsList";
  // "https://fakestoreapi.com/products?limit=10"  -fake api
  try {
    const response = await axios.get(Url);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Delete item
export const deleteItem = createAsyncThunk("items/deleteitem", async (id) => {
  const Url = `http://localhost:3000/ItemsList/${id}`;
  try {
    const response = await axios.delete(Url);
    return response.data;
  } catch (error) {
    throw error;
  }
});
// update Item (only fav)
export const updateFav = createAsyncThunk("items/updateItem", async (data) => {
  const Url = `http://localhost:3000/ItemsList/${data.id}`;
  try {
    const response = await axios.put(Url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// add fav items
export const addFavItems = createAsyncThunk("items/addItems", async (data) => {
  const Url = `http://localhost:3000/FavouriteList`;
  try {
    const response = await axios.post(Url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// get fav Items List
export const getFavItems = createAsyncThunk("items/getItems", async () => {
  const Url = `http://localhost:3000/FavouriteList`;
  try {
    const response = await axios.get(Url);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Delete Fav
export const deleteFavItems = createAsyncThunk(
  "items/deletefavItems",
  async (id) => {
    const Url = `http://localhost:3000/FavouriteList/${id}`;
    try {
      const response = await axios.delete(Url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  ItemsList: [],
  loading: false,
  error: null,
  addCart: [],
  showFavItemsList: [],
  isLoad:false
};

const ListReducer = createSlice({
  name: "ItemsList",
  initialState,
  reducers: {
    AddToCart: (state, action) => {
      state.addCart.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    // fetch data
    builder.addCase(fetchList.pending, (state) => {
      if(state.isLoad===false){
        state.loading = true;
        state.isLoad=true;
      }
    });
    builder.addCase(fetchList.fulfilled, (state, action) => {
      state.ItemsList = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchList.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isLoad=false;

    });

    // delete item
    builder.addCase(deleteItem.pending, (state) => {});
    builder.addCase(deleteItem.fulfilled, (state, action) => {});
    builder.addCase(deleteItem.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    // get fav items
    builder.addCase(getFavItems.pending, (state) => {});
    builder.addCase(getFavItems.fulfilled, (state, action) => {
      state.showFavItemsList = action.payload;
    });
    builder.addCase(getFavItems.rejected, (state, action) => {});
    // add fav items
    builder.addCase(addFavItems.pending, (state) => {});
    builder.addCase(addFavItems.fulfilled, (state, action) => {});
    builder.addCase(addFavItems.rejected, (state, action) => {});
    // delete fav
    builder.addCase(deleteFavItems.pending, (state) => {});
    builder.addCase(deleteFavItems.fulfilled, (state, action) => {});
    builder.addCase(deleteFavItems.rejected, (state, action) => {});
  },
});
export const { AddToCart } = ListReducer.actions;
export default ListReducer.reducer;
