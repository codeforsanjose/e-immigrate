/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */


fillOutStep1 = () => {
    function getByName(name) {
        const input = document.querySelector(`[name='${name}']`);
        if (input == null) {
            console.error(`Failed to find field with name ${name}`);
            throw new Error(`Failed to find field with name ${name}`);
        }
        return input;
    }
    function setByName(name, value) {
        const input = document.querySelector(`[name='${name}']`);
        if (input == null) {
            console.error(`Failed to find field with name ${name}`);
            return false;
        }
        if (input instanceof HTMLInputElement) {
            const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
            setter.call(input, value);
            input.dispatchEvent(new Event('input', { bubbles: true }));
            return true;
        }
        else if (input instanceof HTMLSelectElement) {
            const setter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value').set;
            setter.call(input, value);
            input.dispatchEvent(new Event('input', { bubbles: true }));
            return true;
        }
        else {
            console.error('cannot set', {
                name,
                input,
            });
            throw new Error('cannot set');
        }
    }
    function checkElement(element) {
        if (element instanceof HTMLInputElement) {
            element.click();
            // const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'checked').set;
            // setter.call(element, true);
            // element.dispatchEvent(new Event('input', { bubbles: true }));
            return true;
        }
        else {
            console.error('cannot set', {
                element,
            });
            throw new Error('cannot set');
        }
    }
    function randomNumberBetween(min, maxExclusive) {
        const range = maxExclusive - min;
        return min + Math.floor(Math.random() * range);
    }
    function randomNumber(maxExclusive) {
        return Math.floor(Math.random() * maxExclusive);
    }
    function randomFromString(length, source) {
        let output = '';
        for (let index = 0; index < length; index++) {
            output += source[randomNumber(source.length)];
        }
        return output;
    }
    function randomOption(options) {
        return options[randomNumber(options.length)];
    }
    function randomString(length) {
        return randomFromString(length, 'abcdefghijklmnopqrstuvwxyz');
    }
    function randomInt(length) {
        return parseInt(randomFromString(length, '0123456789'));
    }
    function getOptions(element) {
        const blah = Array.from(element.querySelectorAll('option'));
        return blah.map(x => x.value).filter(x => x != null && x !== '');
    }
    
    const pairs = [
        ['full_name', randomString(8)],
        ['birth_country', randomString(6)],
        ['US_zipcode', `${randomInt(5)}`],
        ['mobile_phone', `2344${randomInt(6)}`],
        ['gender', randomOption([
            'Male',
            'Female',
            'Other',
        ])],
        ['age', `${randomNumberBetween(18, 90)}`],
        // ['preferred_language', randomOption(getOptions(getByName('preferred_language')))],
        ['preferred_language', 'English'],
        ['ethnicity', randomString(12)],
        ['email', `${randomString(12)}@jmstudios.net`],
    ];


    const howHear = Array.from(document.querySelectorAll("[name='how_did_you_hear_about_event']"));
    checkElement(randomOption(howHear));

    pairs.forEach(pair => {
        const [fieldName, value] = pair;
        setByName(fieldName, value);
    });
};
fillOutStep1();

fillOutStep3 = () => {
    Array.from(document.querySelectorAll('input')).filter(x => x.id.endsWith('Yes')).forEach(elem => elem.click());
    Array.from(document.querySelectorAll('input')).filter(x => x.id.endsWith('-No')).forEach(elem => elem.click());
};