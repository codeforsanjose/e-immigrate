import React from 'react';
import { Button } from '../../components/Button/Button';
// import { useNavigate } from 'react-router-dom';
import image from '../../data/images/CiiT Logo.png';

import './WorkshopLandingPage.css';
import { useNavigate } from 'react-router-dom';
import { useContentContext } from '../../contexts/ContentContext';
import { useClosingDateHook } from '../../hooks/useClosingDateHook';


export function WorkshopLandingPage() {
    const { content } = useContentContext();

    const navigate = useNavigate();
    const goToStep1 = React.useCallback(() => {
        navigate('/eligibility');
    }, [navigate]);
    const closingDateFromDoc = content.closingDate ?? '04/18/24'; // fallback 
    const closedUI = useClosingDateHook({ closingDate: closingDateFromDoc });
    return (
        <div className="WorkshopLandingPage">
            <h1>{content.homeWelcomeMessage}</h1>
            <div className="content">
                <div>
                    <div className="description">
                        <h2>{content.homeHeader1}</h2>
                        <p>{content.homeText1}</p>
                    </div>
                    <div className="description last">
                        <h2>{content.homeHeader2}</h2>
                        <p>{content.homeText2}</p>
                        <p>{content.homeText3}</p>
                        <h2>
                            <a
                                href="https://www.e-immigrate.info"
                                target="_blank" rel="noreferrer"
                            >
                                www.e-immigrate.info
                            </a>
                        </h2>
                    </div>

                    {<Button label={'Start'} onClick={goToStep1} />}
                    {closedUI && <><h3>{content.closedMessage}</h3></>}
                </div>
                <img src={image} alt="CIIT Logo" width="100%" height="auto" />
            </div>
        </div>
    );
}
