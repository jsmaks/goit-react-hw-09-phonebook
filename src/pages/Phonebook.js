import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Container from "../components/Container/Container";

import Form from '../components/FormContacts/Form';
import Contacts from '../components/Contacts/ContactsList';
import Filter from '../components/Filter/Filter';
import contactsOperations from '../redux/phonebook/phonebook-operations';
import contactsSelectors from '../redux/phonebook/phonebook-selectors';

export default function Phonebook() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  const isLoadingContacts = useSelector(contactsSelectors.getLoading);

  return (
    <div>
      <h1>Phonebook</h1>
      <Form />
      <h2>Contacts</h2>
      <Filter />
      {isLoadingContacts && <h1>Загружаем...</h1>}
      <Contacts />
    </div>
  );
}
