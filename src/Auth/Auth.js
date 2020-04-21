import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Container, Typography } from '@material-ui/core';
import CButton from '../Components/CButton';
import Logo from '../Images/Logo.svg';
import CTextField from '../Components/CTextField';
import { AccountCircle, Lock } from '@material-ui/icons'
import CCheckbox from '../Components/CCheckbox';
import { Env } from '../Env';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Session from './Session';
let session = new Session();

const styles = makeStyles((theme) => ({
    bg: {
        height: "100vh",
        [theme.breakpoints.up("md")]: {
            background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
        }
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: "100vh",
        [theme.breakpoints.up("md")]: {
            flexDirection: 'row',
            background: `linear-gradient(to bottom, #FFFFFF, #F2F2F2)`,
            width: 716,
            height: 414,
            margin: [[0, "auto"]],
            borderRadius: 20,
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.5)",
        },
    },
    header: {
        [theme.breakpoints.down("sm")]: {
            background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            boxShadow: "0 1px 12px rgba(0, 0, 0, 0.5)",
        },
        [theme.breakpoints.up("md")]: {
            [theme.breakpoints.up("md")]: {
                flex: "1 1 0"
            }
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center",
        padding: 32,
    },
    companyName: {
        color: "white",
        fontSize: 24,
        fontWeight: 700,
        [theme.breakpoints.up("md")]: {
            color: theme.palette.text.primary,
        }
    },
    companyDescription: {
        color: "white",
        fontSize: 14,
        fontWeight: 400,
        [theme.breakpoints.up("md")]: {
            color: theme.palette.text.primary,
        }
    },
    formContainer: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        [theme.breakpoints.up("md")]: {
            flex: "1 1 0",

        }
    },
    form: {
        marginTop: theme.spacing(3),
        display: 'flex',
        alignItems: "center",
        flexDirection: "column",
        [theme.breakpoints.down("sm")]: {
            maxWidth: 343,
            margin: [[theme.spacing(3), "auto"]],
        }
    },
    logo: {
        [theme.breakpoints.up("md")]: {
            height: 250,
        }
    },
}))

export default function Auth() {
    const classes = styles();
    const history = useHistory();
    const [values, setValues] = React.useState({ login: "", password: "" });
    const [errors, setErrors] = React.useState({ login: "", password: "" });

    /**
     * 
     * @param {Event} field 
     */
    const handleChange = (field) => (evt) => {
        setValues({ ...values, [field]: evt.target.value });
        setErrors({ ...errors, [field]: "" });
    };

    if (session.isConnected()) {
        history.replace("/");
    }

    /**
     * 
     * @param {Event} evt 
     */
    const handleSubmit = (evt) => {
        evt.preventDefault();
        let lErrors = {
            login: (values.login.length === 0 ? "Veuillez remplir le champ login" : ""),
            password: (values.password.length === 0 ? "Veuillez remplir le mot de passe" : "")
        };
        setErrors(lErrors);
        if (lErrors.password.length > 0 || lErrors.login.length > 0)
            return;
        axios.post(`${Env.ApiEndpoint}/auth`, { login: values.login, password: values.password }).then((response) => {
            if (response.data.accessToken) {
                session.setAccessToken(response.data.accessToken);
                history.push("/");
            }
        }).catch((reason) => {
            if (reason.response && reason.response.status === 401) {
                setErrors({ login: "Login ou mot de passe incorrects", password: "" });
            } else {
                setErrors({ login: "Une erreur s'est produite. Veuillez recommencer", password: "" });
            }
        });
    }
    return (
        <div className={classes.bg}>
            <div className={classes.root}>
                <div className={classes.header}>
                    <img src={Logo} alt="Logo" className={classes.logo} />
                    <Typography className={classes.companyName}>Company Name</Typography>
                    <Typography className={classes.companyDescription}>Lorem Ipsum Dolor sit amet</Typography>
                </div>
                <Container className={classes.formContainer}>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Typography style={{ fontWeight: 500 }}>Authentifiez-vous</Typography>
                        <CTextField error={Boolean(errors.login)} helperText={errors.login} value={values.login} onChange={handleChange("login")} label="Email" variant="outlined" fullWidth InputProps={{ startAdornment: <AccountCircle /> }} />
                        <CTextField error={Boolean(errors.password)} helperText={errors.password} value={values.password} onChange={handleChange("password")} label="Password" variant="outlined" fullWidth type="password" InputProps={{ startAdornment: <Lock /> }} />
                        <CCheckbox label="Se souvenir de moi" fullWidth />
                        <CButton disabled={values.login.length === 0 || values.password.length === 0} type="submit" fullWidth variant="contained" color="primary">Connexion</CButton>
                    </form>
                </Container>
            </div>
        </div>
    )
}