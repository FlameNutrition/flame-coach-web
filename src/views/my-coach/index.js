import React, { useState } from "react";
import Page from "../../components/Page";
import PropTypes from "prop-types";
import { Box, Grid } from "@material-ui/core";
import Card from "../../components/Core/Card";

const MyCoachView = ({
    customerIdentifier
}) => {

    return (
        <Page
            title="My Coach"
            isError={false}
            isLoading={false}
        >
            <Grid
                direction="row"
                container
                spacing={1}
            >
                <Grid item xs={12}>
                    <Card title="Form">Hello</Card>
                </Grid>
                <Grid item xs={12}>
                    <Card title="Chat">chat</Card>
                </Grid>
            </Grid>
        </Page>
    );
};

MyCoachView.propTypes = {
    customerIdentifier: PropTypes.string.isRequired
};

export default MyCoachView;
