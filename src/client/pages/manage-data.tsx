import * as React from "react";
import { Form, Field, Formik, FormikHelpers } from 'formik';
import { TextField } from 'formik-mui';
import * as yup from 'yup';
import { Button, Grid, InputAdornment, LinearProgress, styled } from "@mui/material";
import { Container } from "@mui/system";

type Values = {
    name: string;
    price: number;
    delta: number;
}
const initialValues = {
    name: '',
    price: 0,
    delta: 0,
};

export const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    price: yup
        .number()
        .positive('Enter a positive price')
        .required('Price is required'),
    delta: yup
        .number()
        .min(0, 'min value is 0')
        .max(1, 'max value is 1')
        .required('Price is required'),
});

const StyledField = styled(Field)(({ theme }) => ({
    margin: "12px",
  }));


export function ManageData() {
    const handleSubmit = (values: Values, actions: FormikHelpers<Values>) => {
        setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
        }, 1000);
    };
    return (
        <Container>
                <Grid
                    item
                    xl={4}
                    lg={4}
                    sm={4}
                    xs={4}
                >
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {(props) => {
                            const { errors, isValid, isSubmitting, touched } = props;

                            return (

                                <Form noValidate>
                                    <StyledField
                                        component={TextField}
                                        name="name"
                                        label="Name"
                                        fullWidth
                                        required
                                    />

                                    <StyledField
                                        component={TextField}
                                        name="price"
                                        label="Price"
                                        type="number"
                                        step={0.01}
                                        fullWidth
                                        required
                                        
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                                        }}
                                    />

                                    <StyledField
                                        component={TextField}
                                        name="delta"
                                        label="Delta"
                                        type="number"
                                        step={0.01}
                                        fullWidth
                                        required
                                        helperText={touched.delta ? errors.delta : 'Value between 0 and 1'}
                                    />

                                    {isSubmitting && <LinearProgress />}

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={!isValid || isSubmitting}
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            )
                        }
                        }
                    </Formik>
                </Grid>
        </Container>
    )
}