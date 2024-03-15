export type BindFieldFunction = (value: string) => Record<string, unknown>; 
export type CollectAnswerFunction = (slug: string, value: unknown) => void;
export type ContentData = {
    errorMessage?: string;
};
export type QData = {
    category: string;
    slug: string;
    required?: boolean;
};


export type ReactSetter<T> = ((value: T | ((current: T) => T)) => void)
export type DirectReactSetter<T> = (value: T) => void;