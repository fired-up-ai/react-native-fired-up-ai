import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { AuthProvider, useAuth } from '../AuthContext';
import { AuthService } from '@fired-up-ai/web-firebase';

// Mock AuthService
jest.mock('@fired-up-ai/web-firebase', () => {
    return {
        AuthService: jest.fn().mockImplementation(() => {
            return {
                getAuth: jest.fn().mockReturnValue({
                    onAuthStateChanged: jest.fn((callback) => {
                        callback(null); // Mock initial state as null
                        return jest.fn(); // Mock unsubscribe function
                    }),
                }),
                signInWithEmail: jest.fn(),
                signUpWithEmail: jest.fn(),
                signOut: jest.fn(),
                signInWithGoogle: jest.fn(),
                signInWithGithub: jest.fn(),
            };
        }),
    };
});

const TestComponent = () => {
    const { user, signInEmail, signUpEmail, signOut, signInGoogle, signInGitHub } = useAuth();

    return (
        <div>
            <div data-testid="user">{user ? 'Logged In' : 'Logged Out'}</div>
            <button onClick={() => signInEmail('test@example.com', 'password')}>Sign In Email</button>
            <button onClick={() => signUpEmail('test@example.com', 'password')}>Sign Up Email</button>
            <button onClick={() => signOut()}>Sign Out</button>
            <button onClick={() => signInGoogle()}>Sign In Google</button>
            <button onClick={() => signInGitHub()}>Sign In GitHub</button>
        </div>
    );
};

describe('AuthContext', () => {
    let authServiceMock: any;

    beforeEach(() => {
        authServiceMock = new AuthService();
    });

    it('should render without crashing', () => {
        const { getByTestId } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );
        expect(getByTestId('user')).toContain('Logged Out');
    });

    it('should call signInEmail on button click', async () => {
        const { getByText } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );
        fireEvent.press(getByText('Sign In Email'));
        await waitFor(() => expect(authServiceMock.signInWithEmail).toHaveBeenCalledWith('test@example.com', 'password'));
    });

    it('should call signUpEmail on button click', async () => {
        const { getByText } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );
        fireEvent.press(getByText('Sign Up Email'));
        await waitFor(() => expect(authServiceMock.signUpWithEmail).toHaveBeenCalledWith('test@example.com', 'password'));
    });

    it('should call signOut on button click', async () => {
        const { getByText } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );
        fireEvent.press(getByText('Sign Out'));
        await waitFor(() => expect(authServiceMock.signOut).toHaveBeenCalled());
    });

    it('should call signInGoogle on button click', async () => {
        const { getByText } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );
        fireEvent.press(getByText('Sign In Google'));
        await waitFor(() => expect(authServiceMock.signInWithGoogle).toHaveBeenCalled());
    });

    it('should call signInGitHub on button click', async () => {
        const { getByText } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );
        fireEvent.press(getByText('Sign In GitHub'));
        await waitFor(() => expect(authServiceMock.signInWithGithub).toHaveBeenCalled());
    });
});