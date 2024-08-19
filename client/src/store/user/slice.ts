import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  token: {},
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    logOut() {
      setToken('');
      setIsAuth(false);
    },
  },
});

export default userSlice.reducer;
export const { setToken, setIsAuth, logOut } = userSlice.actions;
