import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import contactOperations from '../../redux/phonebook/phonebook-operations';
import contactsSelectors from '../../redux/phonebook/phonebook-selectors';
import './Form.css';

export default function Form() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name:'',
    naumber:'',
  })


  const handleChange = useCallback(e=>{
    const {currentTarget:{name, value}} = e;
    setUser(prev=> ({...prev, [name]: value}))
  },[])

  const libraryContacts = useSelector(contactsSelectors.getVisibleContacts);


  const checkOnDuplicate = useCallback( list => {
    const nameLowerCase = user.name.toLowerCase();

    list.find(({ name }) => name.toLowerCase() === nameLowerCase)
      ? alert(`${user.name} is alredy in contacts`)
      : dispatch(contactOperations.addContact(user));
  }, [dispatch, user]) 

  const handleSubmit = useCallback(e => {
    e.preventDefault();
    checkOnDuplicate(libraryContacts);
    setUser({name:'',number:''})
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
          value={user.name}
          onChange={handleChange}
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
          value={user.number}
          onChange={handleChange}
        />
      </label>

      <button className="btn" type="submit">
        Add contact
      </button>
    </form>
  );
}
