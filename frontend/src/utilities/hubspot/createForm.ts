import { getHbspt } from "./hbsptWrapper";
import { type CreateHubspotFormInput } from "./types";

const SCRIPT_SOURCE = 'https://js.hsforms.net/forms/shell.js';
export function createHubspotForm(data: CreateHubspotFormInput) {
    const scriptTags = Array.from(document.querySelectorAll('script'));
    const hubspotScripts = scriptTags.filter(x => x.src === SCRIPT_SOURCE);
    if (hubspotScripts.length > 1) {
        const currentHubspot = getHbspt();
        if (currentHubspot != null) {
            currentHubspot.forms.create(data);
            return;
        }
    }
    const script = document.createElement('script');
    script.src = SCRIPT_SOURCE;
    document.body.appendChild(script);
    function onScriptLoad() {
        const hbspt = getHbspt();
        if (hbspt == null) {
            console.error(`Failed to find the 'hbspt' global`);
            return;
        }
        hbspt.forms.create(data);
        script.removeEventListener('load', onScriptLoad);
    }
    script.addEventListener('load', onScriptLoad);
}
// eslint-disable-next-line @typescript-eslint/promise-function-async
export function createHubspotFormAsync(data: CreateHubspotFormInput): Promise<boolean> {
    const scriptTags = Array.from(document.querySelectorAll('script'));
    const hubspotScripts = scriptTags.filter(x => x.src === SCRIPT_SOURCE);
    if (hubspotScripts.length > 1) {
        const currentHubspot = getHbspt();
        if (currentHubspot != null) {
            currentHubspot.forms.create(data);
            return Promise.resolve(true);
        }
    }
    const script = document.createElement('script');
    script.src = SCRIPT_SOURCE;
    document.body.appendChild(script);
    return new Promise<boolean>((resolve, reject) => {
        function onScriptLoad() {
            const hbspt = getHbspt();
            if (hbspt == null) {
                console.error(`Failed to find the 'hbspt' global`);
                reject(new Error(`Failed to find the 'hbspt' global`));
                return;
            }
            hbspt.forms.create(data);
            script.removeEventListener('load', onScriptLoad);
            resolve(true);
        }
        script.addEventListener('load', onScriptLoad);
    });
}