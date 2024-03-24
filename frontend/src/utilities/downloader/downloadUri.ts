import { fetchWrapper } from "../../sendRequest/sendRequest";
import { getAuthToken } from "../auth_utils";

async function getAsBlobWithAuth(uri: string) {
    const jwt = getAuthToken();
    const response = await fetchWrapper({
        url: uri,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve file');
    }

    const blob = await response.blob();
    return blob;
}

type DownloadUriConfig = {
    uri: string;
    filename: string;
    auth: boolean;
};
export async function downloadUri(config: DownloadUriConfig) {
    const {
        auth,
        filename,
        uri,
    } = config;

    let effectiveUri = uri;
    if (auth) {
        const blob = await getAsBlobWithAuth(uri);
        effectiveUri = window.URL.createObjectURL(blob);
    }

    const link = document.createElement('a');
    link.href = effectiveUri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
}