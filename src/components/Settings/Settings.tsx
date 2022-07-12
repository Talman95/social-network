import React from 'react';
import {
    Box,
    Button,
    Card,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import {FormikHelpers, useFormik} from "formik";
import * as Yup from "yup";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {ProfileType} from "../../api/api";
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkIcon from '@mui/icons-material/Link';
import LaptopIcon from '@mui/icons-material/Laptop';
import TwitterIcon from '@mui/icons-material/Twitter';
import {updateProfile} from "../../redux/authReducer";
import {useAppDispatch} from "../../features/hooks/hooks";

export type formValuesModel = {
    aboutMe: string
    contacts: {
        facebook: string
        website: string
        vk: string
        twitter: string
        instagram: string
        youtube: string
        github: string
        mainLink: string
    },
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
}

export const Settings = () => {
    const profile = useSelector<AppStateType, ProfileType | null>(state => state.auth.profile)
    const dispatch = useAppDispatch()

    const validationSchema = Yup.object({
        fullName: Yup.string()
            .required('Name is required'),
    })

    const submit = (values: formValuesModel, {resetForm}: FormikHelpers<formValuesModel>) => {
        dispatch(updateProfile(values))
    }
    const formik = useFormik({
        initialValues: {
            aboutMe: profile?.aboutMe ? profile.aboutMe : '',
            contacts: {
                facebook: profile?.contacts.facebook ? profile.contacts.facebook : '',
                website: profile?.contacts.website ? profile.contacts.website : '',
                vk: profile?.contacts.vk ? profile.contacts.vk : '',
                twitter: profile?.contacts.twitter ? profile.contacts.twitter : '',
                instagram: profile?.contacts.instagram ? profile.contacts.instagram : '',
                youtube: profile?.contacts.youtube ? profile.contacts.youtube : '',
                github: profile?.contacts.github ? profile.contacts.github : '',
                mainLink: profile?.contacts.mainLink ? profile.contacts.mainLink : '',
            },
            lookingForAJob: profile?.lookingForAJob ? profile.lookingForAJob : false,
            lookingForAJobDescription: profile?.lookingForAJobDescription ? profile.lookingForAJobDescription : '',
            fullName: profile?.fullName ? profile.fullName : '',
        },
        validationSchema: validationSchema,
        onSubmit: submit,
    });


    return (
        <Card>
            <Box p={4}>
                <FormControl>
                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <Typography variant="h5">
                                Main
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center'}}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Name
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        fullWidth
                                        {...formik.getFieldProps('fullName')}
                                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                        helperText={formik.touched.fullName && formik.errors.fullName}
                                    />
                                </Grid>

                                <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center'}}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        About me
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        fullWidth
                                        {...formik.getFieldProps('aboutMe')}
                                    />
                                </Grid>

                                <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center'}}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Looking for a job?
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label={"Looking for a job?"}
                                        name={"Looking for a job?"}
                                    />
                                </Grid>

                                <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center'}}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Description
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="outlined-multiline-static"
                                        multiline
                                        fullWidth
                                        rows={4}
                                        {...formik.getFieldProps('lookingForAJobDescription')}
                                    />
                                </Grid>
                            </Grid>

                            <Typography variant="h5">
                                Contacts
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center'}}>
                                    <GitHubIcon/>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Github
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        fullWidth
                                        {...formik.getFieldProps('contacts.github')}
                                    />
                                </Grid>

                                <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center'}}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        VK
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        fullWidth
                                        {...formik.getFieldProps('contacts.vk')}
                                    />
                                </Grid>

                                <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center'}}>
                                    <FacebookIcon sx={{color: 'blue'}}/>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Facebook
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        fullWidth
                                        {...formik.getFieldProps('contacts.facebook')}
                                    />
                                </Grid>

                                <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center'}}>
                                    <InstagramIcon sx={{color: 'pink'}}/>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Instagram
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        fullWidth
                                        {...formik.getFieldProps('contacts.instagram')}
                                    />
                                </Grid>

                                <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center'}}>
                                    <TwitterIcon sx={{color: 'blue'}}/>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Twitter
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        fullWidth
                                        {...formik.getFieldProps('contacts.twitter')}
                                    />
                                </Grid>

                                <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center'}}>
                                    <LaptopIcon sx={{color: 'blue'}}/>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        WebSite
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        fullWidth
                                        {...formik.getFieldProps('contacts.website')}
                                    />
                                </Grid>

                                <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center'}}>
                                    <YouTubeIcon sx={{color: 'red'}}/>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Youtube
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        fullWidth
                                        {...formik.getFieldProps('contacts.youtube')}
                                    />
                                </Grid>

                                <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center'}}>
                                    <LinkIcon sx={{color: 'blue'}}/>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        MainLink
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="standard-basic"
                                        variant="standard"
                                        fullWidth
                                        {...formik.getFieldProps('contacts.mainLink')}
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Button color={"primary"} variant={"contained"} type={"submit"}>
                                    Save
                                </Button>
                            </Grid>
                        </FormGroup>
                    </form>
                </FormControl>
            </Box>
        </Card>
    );
};