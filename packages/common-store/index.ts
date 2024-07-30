import { store, RootState, AppDispatch } from './src/store';
import { setUser, clearUser, UserState } from './src/features/userSlice';

export {
    store, 
    setUser,
    clearUser
};

export type {
    RootState,
    AppDispatch,
    UserState
};

