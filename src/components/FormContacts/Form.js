import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import contactOperations from '../../redux/phonebook/phonebook-operations';
import contactsSelectors from '../../redux/phonebook/phonebook-selectors';
import './Form.css';

export default function Form() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeName = e => {
    setName(e.currentTarget.value);
  };

  const handleChangeNumber = e => {
    setNumber(e.currentTarget.value);
  };

  const libraryContacts = useSelector(contactsSelectors.getVisibleContacts);

  const addContact = useCallback((name, number) =>
  dispatch(contactOperations.addContact(name, number)), [dispatch])

  const checkOnDuplicate = useCallback( list => {
    const nameLowerCase = name.toLowerCase();

    list.find(({ name }) => name.toLowerCase() === nameLowerCase)
      ? alert(`${name} is alredy in contacts`)
      : addContact(name, number);
  }, [addContact,name,number]) 

  const handleSubmit = useCallback(e => {
    e.preventDefault();
    checkOnDuplicate(libraryContacts);
    setName('');
    setNumber('');
  },[checkOnDuplicate, libraryContacts]);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          value={name}
          onChange={handleChangeName}
        />
      </label>

      <label>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          value={number}
          onChange={handleChangeNumber}
        />
      </label>

      <button className="btn" type="submit">
        Add contact
      </button>
    </form>
  );
}
