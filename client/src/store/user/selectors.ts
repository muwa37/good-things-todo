import { RootState } from '..';

export const selectToken = (state: RootState) => state.user.token;
export const selectIsAuth = (state: RootState) => state.user.isAuth;
