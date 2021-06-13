import React, { Component } from 'react';
import { connect } from 'react-redux';
import contactOperations from '../../redux/phonebook/phonebook-operations';
// import contactSelectors from "../../redux/phonebook/phonebook-selectors";

const styles = {
  form: {
    display: 'flex',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // borderBottom: '1px solid #2A363B',
  },
};

class EditContactForm extends Component {
  state = {
    id: '',
    name: '',
    number: '',
  };

  componentDidMount() {
    this.setState({
      id: this.props.contactItem.id,
      name: this.props.contactItem.name,
      number: this.props.contactItem.number,
    });
    // this.setState({ number: this.props.contactItem.number });
  }

  handleChange = e => {
    const { name, value } = e.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    const { id, name, number} = this.state;
    e.preventDefault();
    this.props.editContact(id, name, number);
    this.props.closeContact();
  };

  render() {
    const { name, number } = this.state;
    const { closeContact } = this.props;

    return (
      <form style={styles.form} onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            value={name}
            onChange={this.handleChange}
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
            onChange={this.handleChange}
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
}

const mapDispatchToProps = {
  editContact: contactOperations.editContact,
};

export default connect(null, mapDispatchToProps)(EditContactForm);


// import React, { useState, useEffect, useCallback} from 'react';
// import { useDispatch } from 'react-redux';
// import contactOperations from '../../redux/phonebook/phonebook-operations';

// const styles = {
//   form: {
//     display: 'flex',
//   },
// };

// export default function EditContactForm({ contactItem, closeContact }) {
//   const dispatch = useDispatch;

//   const [id, setId] = useState('');
//   const [name, setName] = useState('');
//   const [number, setNumber] = useState('');

//   // const saveContact = closeContact;
 
//   useEffect( ()=> {
//     setId(contactItem.id);
//     setName(contactItem.name);
//     setNumber(contactItem.number);
//   }, [contactItem.id, contactItem.name, contactItem.number]);

//   const handleChangeName = e => {
//     setName(e.currentTarget.value);
//   };

//   const handleChangeNumber = e => {
//     setNumber(e.currentTarget.value);
//   };

  
//   const handleSubmit = useCallback(e => {
//     e.preventDefault();
    
//     dispatch(contactOperations.editContact(id, name, number));
    
//     closeContact();
//   }, [closeContact, dispatch, id, name, number]);



//   return (
//     <form style={styles.form} onSubmit={handleSubmit}>
//       <label>
//         Name
//         <input
//           type="text"
//           name="name"
//           pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//           title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
//           required
//           value={name}
//           onChange={handleChangeName}
//         />
//       </label>

//       <label>
//         Number
//         <input
//           type="tel"
//           name="number"
//           pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//           title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
//           required
//           value={number}
//           onChange={handleChangeNumber}
//         />
//       </label>

//       <button className="btn" type="submit">
//         Save
//       </button>
//       <button className="btn" type="button" onClick={closeContact}>
//         Close
//       </button>
//     </form>
//   );
// }


