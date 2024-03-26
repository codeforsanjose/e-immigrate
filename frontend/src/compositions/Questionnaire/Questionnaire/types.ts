import { ReactSetter } from "../../../types/common";

export type OtherComponentProps = {
    setShowFollowUp: ReactSetter<Record<string, boolean>>;
    setErrors: ReactSetter<Record<string, unknown>>;
};

export type FollowupMap = Record<string, boolean>;
