import { store, RootState } from '../src/store';


describe('Redux Store', () => {
  it('should have the correct initial state', () => {
    const state: RootState = store.getState();
    expect(state.user).toEqual({
      id: null,
      name: null,
      email: null,
    });
  });

  it('should include the user reducer', () => {
    const state: RootState = store.getState();
    expect(state).toHaveProperty('user');
  });
});