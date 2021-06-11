import React, { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import contactOperations from '../../redux/phonebook/phonebook-operations';

const styles = {
  form: {
    display: 'flex',
  },
};

export default function EditContactForm({ contactItem, closeContact }) {
  const dispatch = useDispatch;

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect( ()=> {
    setId(contactItem.id);
    setName(contactItem.name);
    setNumber(contactItem.number);
  }, [contactItem.id, contactItem.name, contactItem.number]);

  const handleChangeName = e => {
    setName(e.currentTarget.value);
  };

  const handleChangeNumber = e => {
    setNumber(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(contactOperations.editContact(id, name, number));
    closeContact();
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
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
        Save
      </button>
      <button className="btn" type="button" onClick={closeContact}>
        Close
      </button>
    </form>
  );
}
