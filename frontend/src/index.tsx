import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { App } from './containers/App/App';

function bootstrap() {
    const rootNode = document.getElementById('root');
    if (rootNode == null) {
        console.error("Failed to find the 'root' element");
        return;
    }
    const root = createRoot(rootNode);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );
}
bootstrap();