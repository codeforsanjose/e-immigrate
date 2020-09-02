import React, { useEffect } from 'react';

import './HubspotForm.css';

const HubspotForm = ({ hubspot }) => {
  const { step, line1, line2, hubspotFormId, language = 'en' } = hubspot;

  const submitFormEvent = (event) => {
    console.log('the event is', event)
  }
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.hsforms.net/forms/shell.js'
    document.body.appendChild(script)
    
    script.addEventListener('load', () => {
      if(window.hbspt) {
        window.hbspt.forms.create({
          portalId: '8034478',
          formId: hubspotFormId,
          target: `#hubspotForm-${ language }`,
          onFormSubmit: submitFormEvent,
        })
      }
    })
  }, [hubspotFormId, language])

  const englishForm = language === 'en'
    ? (
      <div className='hubspot'>
        <div className='titleText'>
          <div className='step'>{ step }</div>
          <div className='title1'>{ line1 }</div>
          <div className='title2'>{ line2 }</div>
        </div>
        <div id='hubspotForm-en'></div>
        
      </div>
    )
    : null
  const spanishForm = language === 'es'
    ? (
      <div className='hubspot'>
        <div className='titleText'>
          <div className='step'>{ step }</div>
          <div className='title1'>{ line1 }</div>
          <div className='title2'>{ line2 }</div>
        </div>
        <div id='hubspotForm-es'></div>
        
      </div>
    )
    : null
  return language === 'en'
    ? englishForm
    : spanishForm
}

export default HubspotForm
