import React from "react";
import { apiUrls } from "../../sendRequest/apiUrls";
import { sendRequest } from "../../sendRequest/sendRequest";

type ChooseFileFormProps = {
    workshopTitle: string;
    setChooseFile: (state?: boolean) => void;
    setWorkshopTitle: (value: string) => void;
    setQuestionnaireStatus: (status: string) => void;
    setRefetch: (value: boolean) => void;
};
export function ChooseFileForm(props: ChooseFileFormProps) {
    const {
        setWorkshopTitle,
        setChooseFile,
        setQuestionnaireStatus,
        setRefetch,
        workshopTitle,
    } = props;
    const uploadNewQuestionnaire = React.useCallback(async (qustionnaireFile: File | undefined): Promise<boolean> => {
        if (qustionnaireFile == null) {
            console.error('No file selected');
            return false;
        }
        const formData = new FormData();

        formData.append(
            'questionnaire',
            qustionnaireFile,
            qustionnaireFile.name,
        );
        formData.append('title', workshopTitle);
        setQuestionnaireStatus('Uploading ' + qustionnaireFile.name);
        try {
            await sendRequest({
                url: apiUrls.uploadQuestinnaires,
                method: 'POST',
                body: formData,
            }, {
                browser_gen_content_type: true,
                includeAuth: true,
            });
            setQuestionnaireStatus('Uploaded ' + qustionnaireFile.name);
            setRefetch(true);

            setTimeout(() => setQuestionnaireStatus(''), 10 * 1000);
            setChooseFile(undefined);
            return true;
        }
        catch {
            setQuestionnaireStatus(`Error! Upload of ${qustionnaireFile.name} failed`);
            setTimeout(() => setQuestionnaireStatus(''), 10 * 1000);
            setChooseFile(undefined);
            return false;
        }
    }, [setQuestionnaireStatus, setRefetch, setChooseFile, workshopTitle]);
    const [currentFile, setCurrentFile] = React.useState<File | undefined>(undefined);

    const onFileSelected = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentFile(e.target.files?.[0]);
    }, []);
    const onSubmitClicked = React.useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentFile == null) return;
        await uploadNewQuestionnaire(currentFile);
    }, [currentFile, uploadNewQuestionnaire]);
    const onCancelClicked = React.useCallback(() => {
        setWorkshopTitle('');
        setCurrentFile(undefined);
        setChooseFile(false);
    }, [setChooseFile, setWorkshopTitle]);
    const titleIdBase = React.useId();
    const fileIdBase = React.useId();
    const titleId = `workshopTitle-${titleIdBase}`;
    const fileId = `file-${fileIdBase}`;
    const isFilePickerDisabled = workshopTitle == null || workshopTitle === '';
    return (
        <form className='ChooseFileForm'>
            <label htmlFor={titleId}>Workshop Title:</label>
            <input
                id={titleId}
                onChange={(e) => setWorkshopTitle(e.target.value)}
                required
                type="text"
            ></input>
            <div className='flex flex-column'>
                <label htmlFor={fileId}>
                    Pick a file:
                </label>
                {isFilePickerDisabled ? <span>Please specify a title first!</span> : null}
            </div>
            <input
                disabled={isFilePickerDisabled}
                required
                type="file"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={onFileSelected} 
            />
            <div className="flex flex-row">
                <button 
                    type='submit' 
                    onClick={onSubmitClicked}
                    disabled={isFilePickerDisabled || currentFile == null}
                >
                    Submit
                </button>
                <button 
                    type='reset' 
                    onClick={onCancelClicked}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}