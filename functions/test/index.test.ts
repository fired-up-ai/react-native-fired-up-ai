const testFunctions = require('firebase-functions-test')({
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  projectId: process.env.FIREBASE_PROJECT_ID,
}, process.env.GOOGLE_APPLICATION_CREDENTIALS);

const myFunctions = require('../src/index');

const wrappedSetUserRole = testFunctions.wrap(myFunctions.setUserRole);

describe('Firebase Functions Tests using firebase-functions-test', () => {
  describe('setUserRole', () => {
    it('should throw an error if the user is not authenticated', async () => {
      const data = { uid: 'some-uid', role: 'teacher' };
      const context = {
        auth: {
          uid: 'some-uid'
        }
      };

      
    });

    it('should throw an error if the uid or role is not provided', async () => {
      const data = { uid: 'some-uid' };
      const context = {
        auth: {
          uid: 'some-uid'
        }
      };

      
    });

    it('should add a role to a user', async () => {
      const data = { uid: 'some-uid', role: 'admin' };
      const context = {
        auth: {
          uid: 'some-uid'
        }
      };

      const result = await wrappedSetUserRole(data, context);
    });
  });
});