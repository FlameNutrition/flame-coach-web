import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

const SearchClient = ({
  clients,
  searchSelectedHandler
}) => {
  return (
    <Autocomplete
      id="search-client"
      freeSolo
      options={clients.map((option) => option)}
      onChange={(event, client) => {
        searchSelectedHandler(client);
      }}
      getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
      renderInput={(params) => (
        <TextField {...params} label="Client" margin="normal" variant="outlined"/>
      )}
    />
  );
};

SearchClient.propTypes = {
  clients: PropTypes.object,
  searchSelectedHandler: PropTypes.func
};

export default SearchClient;
