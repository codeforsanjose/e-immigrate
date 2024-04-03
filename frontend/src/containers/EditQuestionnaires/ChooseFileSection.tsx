import React from 'react';
import { Button } from "../../components/Button/Button";
import { useToggle } from "../../hooks/useToggle";
import { ChooseFileForm } from "./ChooseFileForm";

type ChooseFileSectionProps = {
    workshopTitle: string;
    setWorkshopTitle: (value: string) => void;
    setQuestionnaireStatus: (status: string) => void;
    setRefetch: (value: boolean) => void;
};
export function ChooseFileSection(props: ChooseFileSectionProps) {
    const {
        setQuestionnaireStatus,
        setRefetch,
        setWorkshopTitle,
        workshopTitle,
    } = props;
    const {
        value: chooseFile,
        setValue: setChooseFile,
        toggleValue: toggleChooseFile,
    } = useToggle(false);
    if (chooseFile) {
        return (
            <ChooseFileForm
                setQuestionnaireStatus={setQuestionnaireStatus}
                setRefetch={setRefetch}
                setWorkshopTitle={setWorkshopTitle}
                workshopTitle={workshopTitle}
                setChooseFile={setChooseFile}
            />
        );
    }
    else {
        return (
            <div>
                <Button
                    label="Upload New Questionnaire"
                    onClick={toggleChooseFile}
                />
                <Button
                    label="Upload New Website content"
                    onClick={toggleChooseFile}
                />
            </div>
        );
    }
}