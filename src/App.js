import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import axios from 'axios';

function App() {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [document, setDocument] = useState('');

  const submitForm = (user) => {
    axios.post('http://localhost:5000/api/users/add', user)
      .then(response => {
        console.log('response:', response.data)
      })
  };

  return (
    <div>
      <h1>e-immigrate</h1>
      <FileUpload submitForm={submitForm} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} document={document} setDocument={setDocument} />
    </div>
  );
}

export default App;
