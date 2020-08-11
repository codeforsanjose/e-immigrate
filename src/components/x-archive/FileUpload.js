import React from 'react';

const FileUpload = ({ submitForm, phoneNumber, setPhoneNumber, document, setDocument }) => {

  const onSubmit = (e) => {
    e.preventDefault();
    submitForm({
      phoneNumber: phoneNumber * 1,
      document: document
    })
  };

  return (
    <form onSubmit={onSubmit}>
      <div style={ { display:'flex', flexDirection:'column', width:'200px' }}>
        <label htmlFor='phoneNumber'>Phone Number</label>
        <input type='text' id='phoneNumber' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />

        <label htmlFor='document'>Document</label>
        <input type='text' id='document' value={document} onChange={e => setDocument(e.target.value)} />

        <button type='submit'>Submit</button>
      </div>

    </form>
  );
};

export default FileUpload;