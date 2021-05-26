import { useEffect, FC } from 'react';
import { useHistory } from 'react-router-dom';
import { signinRedirectCallback } from './user-service';

const SigninOidc: FC<{}> = () => {
    const history = useHistory();
    useEffect(() => {
        async function signinAsync() {
            await signinRedirectCallback();
            history.push('/');
        }
        signinAsync();
    }, [history]);
    return <div>Redirecting...</div>;
};

export default SigninOidc;
