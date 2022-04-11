import React from 'react';
import {useFormik} from 'formik';
import s from './Login.module.css';

const validate = (values: formValuesModel) => {
    const errors: any = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    }

    return errors;
};

type formValuesModel = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: true
        },
        validate,
        onSubmit: (values: formValuesModel) => {
            alert(JSON.stringify(values));
        },
    });
    return (
        <div className={s.login}>
            <div className={s.container}>
                <h1 className={s.formTitle}>Sign In</h1>
                <div className={s.formContainer}>
                    <form
                        onSubmit={formik.handleSubmit}
                        className={s.form}
                    >
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={formik.errors.email ? s.error : ''}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className={s.errorMessage}>{formik.errors.email}</div>) : null}

                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className={formik.errors.password ? s.error : ''}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className={s.errorMessage}>{formik.errors.password}</div>) : null}

                        <div className={s.rememberMe}>
                            <label htmlFor="checkbox">Remember Me?</label>
                            <input
                                id={"rememberMe"}
                                name={'rememberMe'}
                                type={'checkbox'}
                                onChange={formik.handleChange}
                                checked={formik.values.rememberMe}
                            />
                        </div>

                        <button type="submit">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
};