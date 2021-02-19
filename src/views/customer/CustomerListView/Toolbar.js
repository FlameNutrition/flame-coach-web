import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Button, Card, CardContent, Grid, makeStyles, SvgIcon, TextField
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles(() => ({
  root: {},
  searchButton: {
    height: '100%'
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardContent>
          <Grid
            container
            spacing="2"
          >
            <Grid item xs="8">
              <TextField
                fullWidth
                placeholder="Search customer"
                variant="outlined"
              />
            </Grid>
            <Grid item xs="4">
              <Button
                color="primary"
                variant="contained"
                className={classes.searchButton}
              >
                <SvgIcon
                  fontSize="small"
                  color="inherit"
                >
                  <SearchIcon />
                </SvgIcon>
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
