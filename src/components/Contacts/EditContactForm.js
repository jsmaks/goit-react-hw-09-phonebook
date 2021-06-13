import  { useEffect, useState, useCallback} from 'react';
import { useDispatch } from 'react-redux';
import contactOperations from '../../redux/phonebook/phonebook-operations';
// import contactSelectors from "../../redux/phonebook/phonebook-selectors";



export default function EditContactForm({ contactItem, closeContact }) {
  const dispatch = useDispatch();
  const [currentContact, setEditCurrentContact] = useState({
    id: '',
    name: '',
    number: '',
  });

  useEffect(() => {
    setEditCurrentContact(contactItem);
  }, [contactItem]);

const handleChange = useCallback(e=>{
  const {currentTarget:{name, value}} = e;
  setEditCurrentContact(prev=> ({...prev, [name]: value}))
},[])

const handleSubmit = useCallback(e =>{
  e.preventDefault();
  dispatch(contactOperations.editContact(currentContact))
  closeContact();

},[currentContact,dispatch,closeContact])

  return (
    <form className="form_edit"  onSubmit={handleSubmit}>
      
      <label>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          value={currentContact.name}
          onChange={handleChange}
        />
      </label>

      <label className="label_margin">
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          value={currentContact.number}
          onChange={handleChange}
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

