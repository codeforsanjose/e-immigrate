type AgencyContainer = {
    agency: string;
};
export function isAgencyObject(value: unknown): value is AgencyContainer {
    if (value == null) return false;
    else if (typeof value !== 'object') return false;
    if (!('agency' in value)) return false;
    return typeof (value.agency) === 'number';
}

export function isValueYes(value: string | null): value is 'Yes' {
    if (value == null) return false;
    return value.length > 0 && value.toUpperCase() === 'YES';
}