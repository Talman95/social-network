import React from 'react';
import {FormikHelpers, useFormik} from 'formik';
import * as Yup from 'yup';
import {Preloader} from "../common/Preloader/Preloader";
import {login} from "../../redux/authReducer";
import Grid from '@mui/material/Grid';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, TextField} from "@mui/material";
import {useAppDispatch} from "../../features/hooks/hooks";


export type formValuesModel = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch()

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required'),
    })

    const submit = async (values: formValuesModel, {
        resetForm, setStatus,
    }: FormikHelpers<formValuesModel>) => {
        await dispatch(login(values))
        resetForm({})
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: true
        },
        validationSchema: validationSchema,
        onSubmit: submit,
    });

    if (formik.isSubmitting) {
        return <div>
            <Preloader/>
        </div>
    }

    return (
        <Grid container justifyContent={"center"}>
            <Grid item justifyContent={"center"}>
                <FormControl>
                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <TextField
                                id={"email"}
                                label={"Email"}
                                type={"email"}
                                margin={"normal"}
                                {...formik.getFieldProps('email')}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField
                                id={"password"}
                                label={"Password"}
                                type={"password"}
                                margin={"normal"}
                                {...formik.getFieldProps('password')}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <FormControlLabel
                                label={"Remember me?"}
                                control={<Checkbox {...formik.getFieldProps("rememberMe")}/>}
                            />
                            <Button color={"primary"} variant={"contained"} type={"submit"}>
                                Sign In
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
            </Grid>
        </Grid>
    );
};