import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function AddressForm() {
    return (
        <React.Fragment>
            <form>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        color="success"
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        color="success"
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        color="success"
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        color="success"
                        id="phoneNumber"
                        name="phonenumber"
                        label="Phone Number"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        color="success"
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        color="success"
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        color="success"
                        id="state"
                        name="state"
                        label="County"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
            </Grid>
            </form>
        </React.Fragment>
    );
}