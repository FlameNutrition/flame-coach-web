import PropTypes from 'prop-types';
import { colors } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core";
import { AttachMoney as MoneyIcon } from '@material-ui/icons';
import DashboardBox from '../../Core/DashboardBox';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.green[500],
    height: 56,
    width: 56
  },
  content: {
    height: '100%'
  }
}));

const Income = ({
  total,
  currency,
  isLoading,
}) => {
  const classes = useStyles();

  return (
    <DashboardBox isLoading={isLoading}>
      <Grid
        container
        justifyContent="space-between"
        spacing={3}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            BALANCE MONTH INCOME
          </Typography>
          <Typography
            color="textPrimary"
            variant="h5"
          >
            {total} {currency
          }
          </Typography>
        </Grid>
        <Grid item>
          <Avatar className={classes.avatar}>
            <MoneyIcon/>
          </Avatar>
        </Grid>
      </Grid>
    </DashboardBox>
  );
};

Income.propTypes = {
  total: PropTypes.number,
  currency: PropTypes.string,
  isLoading: PropTypes.bool.isRequired
};

Income.defaultProps = {
  total: 0.0,
  currency: '£'
};

export default Income;
