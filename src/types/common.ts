export type BindFieldFunction = (value: string) => Record<string, unknown>; 
export type CollectAnswerFunction = (slug: string, value: string) => void;
export type ContentData = {
    errorMessage?: string;
};
export type QData = {
    slug: string;
    required?: boolean;
};


export type ReactSetter<T> = ((value: T | ((current: T) => T)) => void)