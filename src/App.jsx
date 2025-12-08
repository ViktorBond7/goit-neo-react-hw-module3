import { useEffect, useState } from "react";
import initialContacts from "../src/contacts.json";
// import * as Yup from "yup";

import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";

const STOREGE_CONTACTS_KEY = "contacts";

function App() {
  const [contacts, setContacts] = useState(() =>
    // JSON.parse(localStorage.getItem(STOREGE_CONTACTS_KEY)) ?? initialContacts
    {
      try {
        const saved = localStorage.getItem(STOREGE_CONTACTS_KEY);

        return saved.length > 2 ? JSON.parse(saved) : initialContacts;
      } catch {
        return initialContacts;
      }
    }
  );

  console.log(initialContacts);

  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem(STOREGE_CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const addContact = (contact) => {
    setContacts((prev) => {
      return [...prev, contact];
    });
  };

  const deleteContact = (id) =>
    setContacts((prev) => prev.filter((contact) => contact.id !== id));

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContacts={addContact} />
      <SearchBox value={filter} onFilter={setFilter} />
      <ContactList contacts={visibleContacts} onDelete={deleteContact} />
    </div>
  );
}

export default App;
