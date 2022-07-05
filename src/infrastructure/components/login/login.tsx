import { useContext, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import login from './login.module.css';
import { AppContext } from '../../context/context';
import { LocalStore } from '../../services/local.store';
import { iUser } from '../../interfaces/user';

export function Login() {
    const { isLogged, setIsLogged } = useContext(AppContext);
    const { setUserLogged } = useContext(AppContext);
    const ls = new LocalStore<iUser>('Login');

    useEffect(() => {
        const storeUser = ls.getItems();
        console.log('LS:', storeUser);
        if (storeUser) {
            setUserLogged(storeUser);
            setIsLogged(true);
        }
    }, []);

    const handleClick = () => {
        if (isLogged) {
            doLogout();
        } else {
            doLogin();
        }
    };

    const doLogin = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const error: any = new Error('No credential');
                error.code = '';
                error.customData = { email: '' };
                if (!credential) throw error;
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log({ token, user });
                setIsLogged(true);
                const userData: iUser = {
                    uid: result.user.uid,
                    token: token,
                    name: result.user.displayName,
                    email: result.user.email,
                };
                setUserLogged(userData);
                ls.setItem(userData);
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log({
                    errorCode,
                    errorMessage,
                    email,
                    credential,
                });
            });
    };

    const doLogout = () => {
        setIsLogged(false);
    };

    return (
        <div className={login.host}>
            <button type="button" onClick={handleClick}>
                {isLogged ? 'Logout' : 'Login'}
            </button>
        </div>
    );
}