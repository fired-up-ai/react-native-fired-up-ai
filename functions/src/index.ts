import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import cors from 'cors';

admin.initializeApp();

let allowedOrigins: string[] = [
    'http://localhost:8100',
    // Add your domains here
];

const corsOptionsDelegate = (req: any, callback: any) => {
    let corsOptions;
    if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
}

cors(corsOptionsDelegate);

export const setUserRole = functions.https.onCall(async (data: any, context: any) => {
    try {
        if (!context.auth) {
            throw new functions.https.HttpsError(
                'unauthenticated', 
                'Only authenticated users can set user roles'
            );
        }

        if (!data.uid || !data.role) {
            throw new functions.https.HttpsError(
                'invalid-argument', 
                'You must provide a uid and role to set a user role'
            );
        }

        const user = await admin.auth().getUser(data.uid);
        const currentClaims = user.customClaims || {};
        let roles = currentClaims.roles ? [...currentClaims.roles] : [];
        if (!roles.includes(data.role)) {
            roles.push(data.role);

            await admin.auth().setCustomUserClaims(data.uid, { ...currentClaims, roles: roles });
        }
        return { message: `Success! ${data.role} role has been added to ${data.uid}` };
        
    } catch (error: any) {
        throw new functions.https.HttpsError('unknown', error.message, error);
    }
});


export const removeUserRole = functions.https.onCall(async (data: any, context: any) => {
    try {
      if (!context.auth) {
        throw new Error('Not authenticated');
      }
      const { uid, userRole } = data;
      if (!uid || !userRole) {
        throw new Error('uid and userRole are required');
      }
  
      // Retrieve the current custom claims for the user
      const user = await admin.auth().getUser(uid);
      const currentClaims = user.customClaims || {};
  
      // Check if the roles claim exists and if the new role is already part of the roles
      let roles = currentClaims.roles ? [...currentClaims.roles] : [];
      if (roles.includes(userRole)) {
        // Add the new role to the roles array
        roles = roles.filter(role => role !== userRole);
  
        // Update the user's custom claims with the modified roles
        await admin.auth().setCustomUserClaims(uid, { ...currentClaims, roles: roles });
      }
  
      return { message: `Success! ${uid} has been assigned the role: ${userRole}` };
    } catch (error) {
      return { error: "Unable to set userRole: " + error };
    }
});