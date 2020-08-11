import React, { useEffect } from 'react';

import './HubspotForm.css';

const HubspotForm = ({ hubspotFormId }) => {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/shell.js';
    document.body.appendChild(script);
    
    script.addEventListener('load', () => {
      if(window.hbspt) {
        window.hbspt.forms.create({
          portalId: '8034478',
          formId: hubspotFormId,
          target: '#hubspotForm'
        })
      }
    });
  }, [hubspotFormId])

  return (
    <div id='hubspotForm'></div>
  )
};

export default HubspotForm;
