"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface DrawerState {
  open: boolean;
}

const initialState = {
  open: true,
} as DrawerState;

const namespace = "drawer";

const drawerSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    toggleDrawer(state) {
      const content = document.getElementById("page-layout");
      if (!state.open) {
        content?.classList.replace("page-layout-closed", "page-layout-open");
      } else {
        content?.classList.replace("page-layout-open", "page-layout-closed");
      }
      state.open = !state.open;
    },
    openDrawer(state) {
      const content = document.getElementById("page-layout");
      content?.classList.replace("page-layout-closed", "page-layout-open");
      state.open = true;
    },
    closeDrawer(state) {
      const content = document.getElementById("page-layout");
      content?.classList.replace("page-layout-open", "page-layout-closed");
      state.open = false;
    },
  },
});

export const { openDrawer, closeDrawer, toggleDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
