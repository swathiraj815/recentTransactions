import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';

import { getTransactions } from './api'
import { LocaleContext } from './contexts.js'

const useStyles = makeStyles({
  container: {
    width: "80%",
    margin: "0 auto",
  },
  header: {
    fontWeight: "bold"
  },
});

export default function TransactionSummary({ count }) {
  const [months, setMonths] = useState({});
  const { locales, currencyOptions } = useContext(LocaleContext);
  const classes = useStyles();

  useEffect(() => {
    getTransactions(count).then(setMonths);
  }, [count])

  if(Object.keys(months).length === 0) {
    return <CircularProgress size={80} />;
  }

  return (
    <TableContainer classes={{ root: classes.container}} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell classes={{root: classes.header}}>Month</TableCell>
            <TableCell classes={{root: classes.header}} align="center">Purchase Total</TableCell>
            <TableCell classes={{root: classes.header}} align="center">Points Earned</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(months).map((each) => (
            <TableRow key={each}>
              <TableCell classes={{root: classes.header}} scope="row">{each}</TableCell>
              <TableCell align="center">{months[each].moneySpent.toLocaleString(locales, currencyOptions)}</TableCell>
              <TableCell align="center">{months[each].score.toLocaleString(locales)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TransactionSummary.propTypes = {
  count: PropTypes.number
};

TransactionSummary.defaultProps = {
  count: 3
};