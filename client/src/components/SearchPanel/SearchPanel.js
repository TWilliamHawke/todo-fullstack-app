import React, { useState } from 'react';
import './search-panel.css'
import { connect } from 'react-redux';
import { setFilterTitle } from '../../redux/filtersActions'

export const SearchPanel = ({ setFilterTitle }) => {
  const [value, setValue] = useState('')

  const onSearch = e => {
    setValue(e.target.value)
    setFilterTitle(e.target.value)
  }

  return (
    <input type="text"
      value={value}
      onChange = {onSearch}
      className="form-control search-input"
      placeholder="type to search" />
  );
};

const mapDispatchToProps = {
  setFilterTitle
}

export default connect(null, mapDispatchToProps)(SearchPanel);