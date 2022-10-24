/*
    Functions for error handling
*/

export function handleError(e) {
    
    if (e.response) {
        console.log("Server Error: ", e);
    } else if (e.request) {
        console.log("Network Error: ", e);
    } else {
        console.log("Client Error: ", e);
    }
}