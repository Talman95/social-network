import React from 'react';
import {FormikHelpers, useFormik} from 'formik';
import s from './Login.module.css';
import * as Yup from 'yup';
import {Preloader} from "../common/Preloader/Preloader";
import {useDispatch} from "react-redux";
import {login} from "../../redux/authReducer";


export type formValuesModel = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {
    const dispatch = useDispatch()

    const schema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        password: Yup.string()
            .required('Required')
    })

    const submit = async (values: formValuesModel, {resetForm, setStatus, validateForm, setFieldError}: FormikHelpers<formValuesModel>) => {
        const res = await dispatch(login(values))
        if (res) {
            setStatus(res)
            // validateForm(schema).then(err => {
            //     setFieldError('email', 'Incorrect')
            //     setFieldError('password', 'Incorrect')
            // })
        } else {
            resetForm({})
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: true
        },
        validationSchema: schema,
        onSubmit: submit,
        // validateOnBlur: false,
        // validateOnChange: false,
    });

    if (formik.isSubmitting) {
        return <div className={s.login}>
            <Preloader/>
        </div>
    }

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
                            className={formik.errors.email && formik.touched.email ? s.error : ''}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <p className={s.errorMessage}>{formik.errors.email}</p>) : null}
                        {}
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className={formik.errors.password && formik.touched.password ? s.error : ''}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <p className={s.errorMessage}>{formik.errors.password}</p>) : null}

                        <div className={s.rememberMe}>
                            <input
                                id={"rememberMe"}
                                name={'rememberMe'}
                                type={'checkbox'}
                                onChange={formik.handleChange}
                                checked={formik.values.rememberMe}
                            />
                            <label htmlFor="checkbox">Remember Me?</label>
                        </div>

                        {formik.status && <div>{formik.status}</div>}
                        <button type="submit">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
};