import React, { FC, useEffect, useRef } from 'react';
import { User, UserManager } from 'oidc-client';
import { setAuthHeader } from './auth-headers';

type AuthProviderProps = {
    userManager: UserManager;
};

const AuthProvider: FC<AuthProviderProps> = ({
    userManager: manager,
    children,
}): any => {
    let userManager = useRef<UserManager>();
    useEffect(() => {
        userManager.current = manager;
        const onUserLoaded = (user: User) => {
            console.log('User loaded: ', user);
            setAuthHeader(user.access_token);
        };
        const onUserUnloaded = () => {
            setAuthHeader(null);
            console.log('User unloaded');
        };
        const onAccessTokenExpiring = () => {
            console.log('User token expiring');
        };
        const onAccessTokenExpired = () => {
            console.log('User token expired');
        };
        const onUserSignedOut = () => {
            console.log('User signed out');
        };

        userManager.current.events.addUserLoaded(onUserLoaded);
        userManager.current.events.addUserUnloaded(onUserUnloaded);
        userManager.current.events.addAccessTokenExpiring(
            onAccessTokenExpiring
        );
        userManager.current.events.addAccessTokenExpired(onAccessTokenExpired);
        userManager.current.events.addUserSignedOut(onUserSignedOut);

        return function cleanup() {
            if (userManager && userManager.current) {
                userManager.current.events.removeUserLoaded(onUserLoaded);
                userManager.current.events.removeUserUnloaded(onUserUnloaded);
                userManager.current.events.removeAccessTokenExpiring(
                    onAccessTokenExpiring
                );
                userManager.current.events.removeAccessTokenExpired(
                    onAccessTokenExpired
                );
                userManager.current.events.removeUserSignedOut(onUserSignedOut);
            }
        };
    }, [manager]);

    return React.Children.only(children);
};

export default AuthProvider;
