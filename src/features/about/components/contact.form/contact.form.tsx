import { SyntheticEvent, useLayoutEffect, useRef, useState } from 'react';
import AppInput from '../../../../infrastructure/components/input/app.input';

interface iContact {
    userName: string;
    email: string;
}

export function ContactForm() {
    const initialState: iContact = {
        userName: '',
        email: '',
    };
    const initialSendState: {
        send: boolean;
        userToSend: iContact | null;
    } = { send: false, userToSend: null };
    const [formState, setFormState] = useState(initialState);
    const [validState, setValidState] = useState(false);
    const [sendState, setSendState] = useState(initialSendState);

    const userRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useLayoutEffect(() => {
        console.log({ formRef });
    });

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        setSendState({ send: true, userToSend: formState });
        setFormState(initialState);
        setValidState(false);
    };

    return (
        <>
            <h3>Formulario de contacto</h3>
            <form onSubmit={handleSubmit} noValidate ref={formRef}>
                <AppInput
                    name="userName"
                    placeholder="Dinos tu nombre"
                    formInfo={{ setFormState, setValidState, formRef }}
                    required={true}
                    ref={userRef}
                    initialValue={formState.userName}
                ></AppInput>
                <AppInput
                    name="email"
                    placeholder="Dinos tu email"
                    type="email"
                    formInfo={{ setFormState, setValidState, formRef }}
                    required={true}
                    ref={emailRef}
                    initialValue={formState.email}
                ></AppInput>
                <button type="submit" disabled={!validState}>
                    Enviar
                </button>
            </form>
            <div>
                {sendState.send && (
                    <>
                        <p>
                            Gracias{' '}
                            {(sendState.userToSend as iContact).userName}
                        </p>
                        <p>
                            <span>Te enviaremos información a tu correo </span>
                            <em role={'log'}>
                                {(sendState.userToSend as iContact).email}
                            </em>
                        </p>
                    </>
                )}
            </div>
        </>
    );
}