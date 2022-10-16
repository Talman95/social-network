import React, {FC} from 'react';
import {Box, Button, Checkbox, Divider, FormControl, FormControlLabel, TextField, Typography} from "@mui/material";
import {ContactsType, ProfileType} from "../../../../api/api";
import {styled} from "@mui/material/styles";
import {useAppDispatch} from "../../../../features/hooks/hooks";
import * as Yup from "yup";
import {useFormik} from "formik";
import {updateProfile, UpdateProfileModal} from "../../../../redux/profileReducer";

const TitleContainer = styled('span')(({theme}) => ({
    ...theme.typography.subtitle2,
    fontWeight: '400',
    width: '110px',
    [theme.breakpoints.up("sm")]: {
        ...theme.typography.body1,
        width: '140px',
        fontWeight: '500',
    }
}));
const ValueContainer = styled('span')(({theme}) => ({
    ...theme.typography.subtitle2,
    wordWrap: "break-word",
    [theme.breakpoints.up("sm")]: {
        ...theme.typography.body1,
        fontWeight: '400',
    }
}));
const ContactContainer = styled(Box)(({theme}) => ({
    display: 'grid',
    wordWrap: "break-word",
    [theme.breakpoints.up("sm")]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flexStart',
    }
}))

type ProfileDataFormType = {
    profile: ProfileType
    offEditMode: () => void
}

export const ProfileDataForm: FC<ProfileDataFormType> = ({profile, offEditMode}) => {
    const dispatch = useAppDispatch()

    const validationSchema = Yup.object({
        fullName: Yup.string()
            .required('Name is required'),
    })

    const submit = (values: UpdateProfileModal) => {
        dispatch(updateProfile(values))
        offEditMode()
    }
    const formik = useFormik({
        initialValues: {
            aboutMe: profile?.aboutMe,
            contacts: {
                facebook: profile?.contacts.facebook,
                website: profile?.contacts.website,
                vk: profile?.contacts.vk,
                twitter: profile?.contacts.twitter,
                instagram: profile?.contacts.instagram,
                youtube: profile?.contacts.youtube,
                github: profile?.contacts.github,
                mainLink: profile?.contacts.mainLink,
            },
            lookingForAJob: profile?.lookingForAJob,
            lookingForAJobDescription: profile?.lookingForAJobDescription,
            fullName: profile?.fullName,
        },
        validationSchema: validationSchema,
        onSubmit: submit,
    });

    return (
        <>
            <FormControl>
                <form onSubmit={formik.handleSubmit}>
                    <ContactContainer>
                        <TitleContainer>Name:</TitleContainer>
                        <ValueContainer>
                            <TextField id="full-name" variant="standard"
                                       fullWidth
                                       {...formik.getFieldProps('fullName')}
                                       error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                       helperText={formik.touched.fullName && formik.errors.fullName}
                            />
                        </ValueContainer>
                    </ContactContainer>

                    <Box sx={{alignSelf: "flex-start"}}>
                        <FormControlLabel
                            control={<Checkbox checked={formik.values.lookingForAJob} onChange={formik.handleChange}
                                               name={"lookingForAJob"}/>}
                            label={"Looking for a job?"}
                            name={"lookingForAJob"}
                            id={"lookingForAJob"}
                        />
                    </Box>

                    <ContactContainer>
                        <TitleContainer>Description:</TitleContainer>
                        <ValueContainer>
                            <TextField id="looking-for-description" variant="standard"
                                       fullWidth
                                       {...formik.getFieldProps('lookingForAJobDescription')}
                            />
                        </ValueContainer>
                    </ContactContainer>

                    <ContactContainer>
                        <TitleContainer>About me:</TitleContainer>
                        <ValueContainer>
                            <TextField id="about-me" variant="standard"
                                       fullWidth
                                       {...formik.getFieldProps('aboutMe')}
                            />
                        </ValueContainer>
                    </ContactContainer>

                    <Divider sx={{marginTop: '15px', marginBottom: '15px'}}/>

                    <Typography component="div" variant={'h6'} sx={{fontWeight: "400"}}>
                        Contacts
                    </Typography>
                    {Object
                        .keys(profile.contacts)
                        .map(key => <Contact key={key} name={key} onChange={formik.handleChange}
                                             value={formik.values.contacts[key as keyof ContactsType]}/>)
                    }
                    <Box sx={{alignSelf: "flex-start", marginTop: "15px"}}>
                        <Button variant={"contained"} type={"submit"} sx={{width: "80px", marginRight: "15px"}}>
                            SAVE
                        </Button>
                        <Button variant={"contained"} onClick={offEditMode} sx={{width: "80px"}}>
                            CANCEL
                        </Button>
                    </Box>
                </form>
            </FormControl>
        </>
    )
}

type ContactType = {
    name: string
    onChange: (e: React.ChangeEvent<any>) => void
    value: string
}

const Contact: FC<ContactType> = ({name, onChange, value}) => {
    const id = `contacts.${name}`
    return (
        <ContactContainer>
            <TitleContainer>{name}:</TitleContainer>
            <ValueContainer>
                <TextField
                    id={id}
                    variant="standard"
                    fullWidth
                    name={id}
                    onChange={onChange}
                    value={value}
                />
            </ValueContainer>
        </ContactContainer>
    )
}