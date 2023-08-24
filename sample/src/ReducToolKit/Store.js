import { configureStore } from "@reduxjs/toolkit";
import ListReducer from "./Reducers/ListReducer";

const Store = configureStore({
  reducer: {
    list : ListReducer,
  },
});

export default Store;
