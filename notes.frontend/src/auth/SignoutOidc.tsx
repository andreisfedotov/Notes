import { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { signoutRedirectCallback } from './user-service';

const SignoutOidc: FC<{}> = () => {
    const history = useHistory();
    useEffect(() => {
        const signoutAsync = async () => {
            await signoutRedirectCallback();
            history.push('/');
        };
        signoutAsync();
    }, [history]);
    return <div>Redirecting...</div>;
};

export default SignoutOidc;
