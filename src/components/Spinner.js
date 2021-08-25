import PropTypes from 'prop-types';
import Page from './Page';
import Container from '@material-ui/core/Container';
import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import Loading from './Core/Loading';
import Warning from './Warning';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    height: '100%'
  },
  container: {
    height: '100%'
  }
}));

const Spinner = ({
  isError,
  isLoading,
  pageTitle,
  children,
}) => {
  const classes = useStyles();

  let elem = <Loading size={100}/>;

  if (!isLoading) {
    if (!isError) {
      elem = children;
    } else {
      elem = <Warning message={process.env.NEXT_PUBLIC_MSG_SERVER_ERROR}/>;
    }
  }

  return (
    <Page
      className={classes.root}
      title={pageTitle}
    >
      <Container
        className={classes.container}
        maxWidth={false}
      >
        {elem}
      </Container>
    </Page>
  );
};

Spinner.propTypes = {
  children: PropTypes.node.isRequired,
  pageTitle: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired
};

export default Spinner;
