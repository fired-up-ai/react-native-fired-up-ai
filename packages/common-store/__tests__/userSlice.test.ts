import userReducer, { setUser, clearUser, UserState } from '../src/features/userSlice';


describe('userSlice', () => {
  const initialState: UserState = {
    id: null,
    name: null,
    email: null,
  };

  it('should return the initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setUser', () => {
    const user = { id: '1', name: 'John Doe', email: 'john.doe@example.com' };
    const actual = userReducer(initialState, setUser(user));
    expect(actual.id).toEqual(user.id);
    expect(actual.name).toEqual(user.name);
    expect(actual.email).toEqual(user.email);
  });

  it('should handle clearUser', () => {
    const user = { id: '1', name: 'John Doe', email: 'john.doe@example.com' };
    const stateWithUser = userReducer(initialState, setUser(user));
    const actual = userReducer(stateWithUser, clearUser());
    expect(actual.id).toEqual(null);
    expect(actual.name).toEqual(null);
    expect(actual.email).toEqual(null);
  });
});