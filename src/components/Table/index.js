import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";

const Table = ({
  title,
  data,
  columns,
  options,
  themeTable
}) => {

  return (
    themeTable
      ? <ThemeProvider theme={themeTable}>
        <MUIDataTable
          title={title}
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
      : <MUIDataTable
        title={title}
        data={data}
        columns={columns}
        options={options}
      />
  );

};

Table.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array,
  columns: PropTypes.array,
  options: PropTypes.object,
  themeTable: PropTypes.object
};

Table.defaultProps = {
  data: [],
  columns: [],
  options: {},
  themeTable: null
};

export default Table;
