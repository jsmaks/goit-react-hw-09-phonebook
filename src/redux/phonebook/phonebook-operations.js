import axios from "axios";
import {
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  editContactRequest,
  editContactSuccess,
  editContactError,
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsError,
} from "./phonebook-actions";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";


const fetchContacts = () => async (dispatch) => {
  dispatch(fetchContactsRequest());
  try {
    const { data } = await axios.get("/contacts");
    dispatch(fetchContactsSuccess(data));
  } catch (error) {
    dispatch(fetchContactsError(error.message));
  }

  //   axios
  //     .get("/contacts")
  //     .then(({ data }) => dispatch(fetchContactsSuccess(data)))
  //     .catch((error) => dispatch(fetchContactsError(error)));
};

const addContact = (name, number) => (dispatch) => {
   const data = { name, number };
  dispatch(addContactRequest());
  axios
    .post("/contacts", data)
    .then(({ data }) => dispatch(addContactSuccess(data)))
    .catch((error) => dispatch(addContactError(error.message)));
};

const deleteContact = (id) => (dispatch) => {
  dispatch(deleteContactRequest());

  axios
    .delete(`/contacts/${id}`)
    .then(() => dispatch(deleteContactSuccess(id)))
    .catch((error) => dispatch(deleteContactError(error.message)));
};

const editContact = ( id, name, number ) => dispatch => {
  
  const update = { name, number };
  

  dispatch(editContactRequest());

  axios
    .patch(`/contacts/${id}`, update)
    .then(({ data }) => dispatch(editContactSuccess(data)))
    .catch(error => dispatch(editContactError(error.message)));
};

// eslint-disable-next-line
export default {
  addContact,
  deleteContact,
  editContact,
  fetchContacts,
};
