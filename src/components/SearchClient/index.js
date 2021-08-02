import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

const SearchClient = ({
  clients,
  clientDefault,
  searchSelectedHandler,
  inputRef,
  disabled,
  ...rest
}) => {
  return (
    <Autocomplete
      id="search-client"
      freeSolo
      options={clients.map((option) => option)}
      onChange={(event, client) => {
        searchSelectedHandler(client);
      }}
      value={clients.find(client => client.identifier === clientDefault)}
      disabled={disabled}
      getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
      renderInput={(params) => (
        <TextField {...rest} {...params} label="Client" name="client"
                   variant="outlined" inputRef={inputRef}/>
      )}
    />
  );
};

SearchClient.propTypes = {
  clients: PropTypes.array,
  clientDefault: PropTypes.string,
  searchSelectedHandler: PropTypes.func,
  inputRef: PropTypes.func,
  disabled: PropTypes.bool
};

SearchClient.defaultProps = {
  disabled: false
};

export default SearchClient;
