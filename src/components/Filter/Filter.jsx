import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/phonebook/phonebook-actions';
import contactsSelectors from '../../redux/phonebook/phonebook-selectors';

export default function Filter() {
  const dispatch = useDispatch();

  const onChange = event =>
    dispatch(actions.changeFilter(event.currentTarget.value));
  const value = useSelector(contactsSelectors.getFilter);

  return (
    <label>
      Find contacts by name
      <input type="text" value={value} onChange={onChange} />
    </label>
  );
}
