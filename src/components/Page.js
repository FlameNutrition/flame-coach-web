import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import Loading from './Core/Loading';
import Warning from './Warning';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  container: {
    height: '100%'
  }
}));

// eslint-disable-next-line react/display-name
const Page = React.forwardRef(({
  isError,
  isLoading,
  title,
  children,
  ...rest
}, ref) => {
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
    <div
      className={classes.root}
      ref={ref}
      {...rest}
    >
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Container
        className={classes.container}
        maxWidth={false}
      >
        {elem}
      </Container>
    </div>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool
};

Page.defaultProps = {
  isLoading: false,
  isError: false
};

export default Page;
