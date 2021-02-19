import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles, Button, SvgIcon, Grid
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import { UserPlus as UserPlusIcon, UserMinus as UserMinusIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  plusUserButton: {
    backgroundColor: theme.palette.button.success
  },
  minusUserButton: {
    backgroundColor: theme.palette.button.dangerous
  },
}));

const Results = ({ className, customers, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const getStatusClient = (status) => {
    switch (status) {
      case 'AVAILABLE': {
        return 'Available';
      }
      case 'MY_CLIENT': {
        return 'Already Client';
      }
      case 'OTHER_CLIENT': {
        return 'Disable';
      }
      default: {
        return 'Disable';
      }
    }
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Registration date
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                >
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={customer.avatarUrl}
                      >
                        {getInitials(customer.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.email}
                  </TableCell>
                  <TableCell>
                    {customer.phone}
                  </TableCell>
                  <TableCell>
                    {getStatusClient(customer.status)}
                  </TableCell>
                  <TableCell>
                    <Grid
                      container
                      spacing="1"
                    >
                      <Grid item>
                        <Button
                          className={classes.plusUserButton}
                          variant="contained"
                          disabled={!(customer.status === 'AVAILABLE')}
                        >
                          <SvgIcon
                            fontSize="small"
                            color="inherit"
                          >
                            <UserPlusIcon />
                          </SvgIcon>
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          className={classes.minusUserButton}
                          variant="contained"
                          disabled={!(customer.status === 'MY_CLIENT')}
                        >
                          <SvgIcon
                            fontSize="small"
                            color="inherit"
                          >
                            <UserMinusIcon />
                          </SvgIcon>
                        </Button>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
