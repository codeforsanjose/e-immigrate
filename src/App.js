import React, { useState, useEffect } from 'react';
import { languageOptions, contentVariations } from './LanguageContent';
import { ReactComponent as LanguagePicker } from './components/LanguagePicker.svg';
import HubspotForm from './components/HubspotForm';

function App() {

  const [language, setLanguage] = useState('en')
  
  
  const browserLanguage = window.navigator.userLanguage || window.navigator.language;
   
  useEffect(() => {
    if (browserLanguage){
      setLanguage(browserLanguage.substring(0,2))
    }
  },[browserLanguage])

  console.log('browserLanguage :>> ', browserLanguage);

  
  return (
    <div className='container d-flex flex-column align-items-center justify-content-center pt-4'>

      <h3>{ contentVariations[language].language }:</h3>
      <div className="btn-group">
        <button type="button" className="btn btn-md btn-primary dropdown-toggle d-flex align-items-center" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <LanguagePicker height='2rem' width='2rem' className='mr-2 '/>
          <span className='mr-2 d-flex-row align-items-center' style={ { verticalAlign: 'middle' }}>
            { contentVariations[language].value }
          </span>
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          { 
            languageOptions.map( (lang, idx) => {
              return (
                <button className='dropdown-item' value={lang.code} key={idx} onClick={ev => setLanguage(ev.target.value)} >{lang.full}</button>
              )
            })
          }
        </div>
      </div>

      <div className='my-5 mx-4 embed-responsive embed-responsive-16by9'>
        <iframe width="560" height="315" src={ contentVariations[language].video } title='Project New Citizen Video' frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
      
      <HubspotForm hubspotFormId={ contentVariations[language].hubspotFormId } />
      
    </div>
  );
}

export default App;
