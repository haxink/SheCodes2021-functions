import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onCall(async (data, context) => {
    functions.logger.info(`Hello  ${data?.email}`);
    return "Hello from Firebase!";
});
