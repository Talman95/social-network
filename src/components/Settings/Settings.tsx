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
import {useFormik} from "formik";
import * as Yup from "yup";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {ProfileType} from "../../api/types";
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkIcon from '@mui/icons-material/Link';
import LaptopIcon from '@mui/icons-material/Laptop';
import TwitterIcon from '@mui/icons-material/Twitter';
import {useAppDispatch} from "../../features/hooks/hooks";
import {updateProfile} from "../../redux/profileReducer";

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

const contacts = [
    {title: 'GitHub', icon: <GitHubIcon/>, propsTitle: 'contacts.github'},
    {title: 'VK', icon: null, propsTitle: 'contacts.vk'},
    {title: 'Facebook', icon: <FacebookIcon/>, propsTitle: 'contacts.facebook'},
    {title: 'Instagram', icon: <InstagramIcon/>, propsTitle: 'contacts.instagram'},
    {title: 'Twitter', icon: <TwitterIcon/>, propsTitle: 'contacts.twitter'},
    {title: 'Website', icon: <LaptopIcon/>, propsTitle: 'contacts.website'},
    {title: 'YouTube', icon: <YouTubeIcon/>, propsTitle: 'contacts.youtube'},
    {title: 'MainLink', icon: <LinkIcon/>, propsTitle: 'contacts.mainLink'},

]

export const Settings = () => {
    const dispatch = useAppDispatch()

    const profile = useSelector<AppStateType, ProfileType | null>(state => state.auth.currentUser)

    const validationSchema = Yup.object({
        fullName: Yup.string()
            .required('Name is required'),
    })

    const submit = (values: formValuesModel) => {
        dispatch(updateProfile(values))
    }

    const formik = useFormik({
        initialValues: {
            aboutMe: profile?.aboutMe || '',
            contacts: {
                facebook: profile?.contacts.facebook || '',
                website: profile?.contacts.website || '',
                vk: profile?.contacts.vk || '',
                twitter: profile?.contacts.twitter || '',
                instagram: profile?.contacts.instagram || '',
                youtube: profile?.contacts.youtube || '',
                github: profile?.contacts.github || '',
                mainLink: profile?.contacts.mainLink || '',
            },
            lookingForAJob: profile?.lookingForAJob || false,
            lookingForAJobDescription: profile?.lookingForAJobDescription || '',
            fullName: profile?.fullName || '',
        },
        validationSchema: validationSchema,
        onSubmit: submit,
    })


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
                                        control={<Checkbox {...formik.getFieldProps('lookingForAJob')}/>}
                                        label={"Looking for a job?"}
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
                                {contacts.map(({title, propsTitle, icon}) => (
                                    <>
                                        <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center'}}>
                                            {icon}
                                            <Typography variant={'subtitle1'} color={'text.secondary'}
                                                        component={'div'}>
                                                {title}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id={'standard-basic'}
                                                variant={'standard'}
                                                fullWidth
                                                {...formik.getFieldProps(`${propsTitle}`)}
                                            />
                                        </Grid>
                                    </>
                                ))}
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
    )
}