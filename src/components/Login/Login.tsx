import React from 'react';
import {Field, Form, Formik, FormikHelpers} from 'formik';
import s from './Login.module.css';

const loginFormValidate = (values: any) => {
    const errors = {}
    return errors
}

type loginFormObjectType = {
    login: string
    password: string
    rememberMe: boolean
}

export const Login = () => {

    const submit = (values: loginFormObjectType, {setSubmitting}: FormikHelpers<loginFormObjectType>) => {
        setTimeout(() => {
            alert(JSON.stringify(values));
            setSubmitting(false);
        }, 400);
    }

    return (
        <div>
            <h1>Login</h1>
            <Formik
                initialValues={{login: '', password: '', rememberMe: false}}
                validate={loginFormValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <div className={s.form}>
                            <label htmlFor={'email'}>Email:</label>
                            <Field type="email" name="login" placeholder={'Email'}/>

                            <label htmlFor={'password'}>Password:</label>
                            <Field type="password" name="password" placeholder={'Password'}/>

                            <div className={s.box}>
                                <label htmlFor={'checkbox'}>Remember me?</label>
                                <Field type="checkbox" name="rememberMe"/>
                            </div>

                            <div>
                                <button type="submit" disabled={isSubmitting}>
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};