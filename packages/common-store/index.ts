import { store, RootState, AppDispatch } from './src/store';
import { setUser, clearUser } from './src/features/userSlice';

export {
    store, 
    setUser,
    clearUser
};

export type {
    RootState,
    AppDispatch
};

