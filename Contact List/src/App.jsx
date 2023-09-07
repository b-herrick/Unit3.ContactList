import { useState, useEffect } from 'react'

function App() {
  const [contacts, setContacts]=useState([]);
  const [hash, setHash]=useState(window.location.hash.slice(1)*1);

  useEffect(()=>{
    const data=async()=>{
      const url=await fetch('https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users');
      const json=await url.json();
      setContacts(json);
    }
    data();
  },[]);

  useEffect(()=>{
    window.addEventListener('hashchange',()=>{
      setHash(window.location.hash.slice(1)*1);
    });
  },[]);

  const contact = contacts.find(contact=>hash===contact.id);

  return(
    <>
      <h1>You have ({contacts.length}) friends</h1>
      <h2>{contact ? contact.name:null}, Email: {contact ? contact.email:null}</h2>
      <ul>
        {
          contacts.map(contact=>{
            return(
              <li key={contact.id} className={contact.id===hash ? 'selected':''}>
                <a href={`#${contact.id===hash ? '':contact.id}`}>{contact.name}</a>
              </li>
            );
          })
        }
      </ul>
    </>
  )
}

export default App
