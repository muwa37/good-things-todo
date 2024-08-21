import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/common';

const initialState = {
  token: '',
  user: {},
  isAuth: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },

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
