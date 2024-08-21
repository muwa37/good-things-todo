import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/common';

const initialState: { token: string; user: null | User; isAuth: boolean } = {
  token: '',
  user: null,
  isAuth: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },

    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },

    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },

    logOut() {
      setUser(null);
      setToken('');
      setIsAuth(false);
    },
  },
});

export default userSlice.reducer;
export const { setToken, setUser, setIsAuth, logOut } = userSlice.actions;
