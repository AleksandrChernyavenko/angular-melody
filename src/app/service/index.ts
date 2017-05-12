let host = window.location.hostname;
let BASE_SOCKET = host;
if (window.location.port) {
    host += `:${window.location.port}`;
    BASE_SOCKET = 'melody.local';
}

export const BASE_URL: string = `https://${host}`;
export const BASE_API_URL: string = `${BASE_URL}/api/`;
export const BASE_SOCKET_URL: string = `${BASE_SOCKET}`;
export const BASE_AUDIO_URL: string = `${BASE_URL}/storage`;



