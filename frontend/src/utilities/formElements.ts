import { Checkbox } from "../components/Checkbox/Checkbox";
import { Date } from "../components/Date/Date";
import { Email } from "../components/Email/Email";
import { PhoneNumber } from "../components/PhoneNumber/PhoneNumber";
import { Radio } from "../components/Radio/Radio";
import { RadioWithFollowUp } from "../components/RadioWithFollowUp/RadioWithFollowUp";
import { Select } from "../components/Select/Select";
import { TextArea } from "../components/TextArea/TextArea";
import { TextInput } from "../components/TextInput/TextInput";
import { Zip } from "../components/Zip/Zip";

export const formElements = {
    checkbox: Checkbox,
    date: Date,
    email: Email,
    phoneNumber: PhoneNumber,
    radio: Radio,
    radioWithFollowUp: RadioWithFollowUp,
    dropDown: Select,
    textArea: TextArea,
    input: TextInput,
    zip: Zip,
};
export type FormElementName = keyof typeof formElements;