import React, { useState,  useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Contacts.css';
import { contactsSelectors, contactOperations } from '../../redux/phonebook';
import EditContactForm from './EditContactForm';

export default function Contacts() {
  const dispacth = useDispatch();

  const libraryContacts = useSelector(contactsSelectors.getVisibleContacts);
  const onDelete = id => dispacth(contactOperations.deleteContact(id));
 

  const [editContact, setEditContact] = useState(false);
  const [idContact, setIdContact] = useState(null);

  const handleToggleEditForm = useCallback(id => {
    setEditContact(false);
    setEditContact(true);
    setIdContact(id);
  }, []);

  return (
    <div>
      <ul className="contacts__list">
        {libraryContacts.map(el => (
          <li className="contacts__item" key={el.id}>
            <p className="contact__name">
              {el.name}:<span className="contact__tel">{el.number}</span>
            </p>
            <button className="btn btn-red" onClick={() => onDelete(el.id)}>
              Delete
            </button>
            {editContact && idContact === el.id ? (
              <EditContactForm
                closeContact={handleToggleEditForm}
                contactItem={el}
              />
            ) : (
              <button
                className="btn"
                onClick={() => handleToggleEditForm(el.id)}
              >
                Edit
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

//   render() {
//     const { libraryContacts, onDelete } = this.props;

//     return (
//       <div>
//         <ul className="contacts__list">
//           {libraryContacts.map(el => (
//             <li className="contacts__item" key={el.id}>
//               <p className="contact__name">
//                 {el.name}:<span className="contact__tel">{el.number}</span>
//               </p>
//               <button className="btn btn-red" onClick={() => onDelete(el.id)}>
//                 Delete
//               </button>
//               {this.state.editContact && this.state.idContact === el.id ? <EditContactForm
//                   closeContact={this.handleToggleEditForm}
//                   contactItem={el}
//                 />: <button
//                 className="btn"
//                 onClick={() => this.handleToggleEditForm(el.id)}
//               >
//                 Edit
//               </button>}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

// cons = state => ({
//   libraryContacts: contactsSelectors.getVisibleContacts(state),
// });

// const mapDisptachToProps = {
//   onDelete: contactOperations.deleteContact,
//   onEdit: contactOperations.editContact,
// };

// export default connect(mapStateToProps, mapDisptachToProps)(Contacts);
