
import { Div } from './App.styled';
import { useState,useEffect } from "react";
// import { nanoid } from 'nanoid'
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Section } from './Section/Section';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';


export function App() { 
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  const [isTyping, setIsTyping] = useState(false);
 
  
  const addContact = ({ name, number }) => {
    setIsTyping(true);

    const contact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(contacts => {
      if (contacts.some(contact => contact.name === name)) {
        alert(`${contact.name} is already in contacts`);
        return [...contacts]
      }
      return [contact, ...contacts]
    });
  };
  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setIsTyping(true);
    setContacts(contacts.filter(contact => contact.id !== contactId));
    setFilter('')
  };
  
  useEffect(() => {
    if (isTyping) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
      // 
    }
    
  });

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts)
    if (parsedContacts !== null) {
      setContacts(parsedContacts)
    }
  },[isTyping]);

  
    return <Div className='thema'>
      <Section title="Phonebook">
        <ContactForm
          onSubmit={addContact}
        />
      </Section>
      <Section title="Contacts">
        <Filter  value={filter} onChange={changeFilter}/>
        <ContactList
          contacts={getVisibleContacts()}
          onDeleteContactList={deleteContact}
        />
      </Section>
    </Div>
}