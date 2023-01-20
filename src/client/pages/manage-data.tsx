import * as React from "react";
import { Form, Field, Formik, FormikHelpers } from "formik";
import { TextField } from "formik-mui";
import * as yup from "yup";
import {
    Button,
    Grid,
    InputAdornment,
    LinearProgress,
    styled,
    Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";

type Values = {
    name: string;
    price: number;
    // delta: number;
};
const initialValues = {
    name: "",
    price: 0,
    // delta: 0,
};

export const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    price: yup
        .number()
        .positive("Enter a positive price")
        .required("Price is required"),
    // delta: yup
    //     .number()
    //     .min(0, "min value is 0")
    //     .max(1, "max value is 1")
    //     .required("Price is required"),
});

const StyledField = styled(Field)(({ theme }) => ({
    margin: "12px",
}));

export function ManageData() {
    const handleSubmit = async (
        formValues: Values,
        actions: FormikHelpers<Values>
    ) => {
        try {
            let response = await axios({
                method: "GET",
                url: "/api/database/shop/table/items",
                baseURL: "http://localhost:3000",
            });

            console.log({ response });

            response = await axios({
                method: "PUT",
                url: "/api/database/shop/table",
                baseURL: "http://localhost:3000",
                data: {
                    table: "items",
                    colums: ["id", "name", "price"],
                    values: [
                        response.data.length + 1,
                        formValues.name,
                        formValues.price,
                    ],
                },
            });

            console.log({ response });

            actions.setSubmitting(false);
        } catch (error) {
            console.error(JSON.stringify(error));
        }
    };

    return (
        <Container>
            <Grid item xl={4} lg={4} sm={4} xs={4}>
                <Typography color="primary">Add item</Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {(props) => {
                        const { errors, isValid, isSubmitting, touched } =
                            props;

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
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                €
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                {/* <StyledField
                                    component={TextField}
                                    name="delta"
                                    label="Delta"
                                    type="number"
                                    step={0.01}
                                    fullWidth
                                    required
                                    helperText={
                                        touched.delta
                                            ? errors.delta
                                            : "Value between 0 and 1"
                                    }
                                /> */}

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
                        );
                    }}
                </Formik>
            </Grid>
        </Container>
    );
}
