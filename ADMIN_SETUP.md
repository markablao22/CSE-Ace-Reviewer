# Trusted Firebase administrator setup

The draft's administrator dashboard is hidden unless the signed-in Firebase user has the custom claim `admin: true`. The website cannot assign this claim to anyone.

## Assign the claim

Use a trusted machine or Cloud Shell signed in with a Google identity that has Firebase Authentication Admin privileges on the **CSE ACE Reviewer** project. Do not put a service-account key or credentials in this repository.

1. In Firebase Console, open **Authentication → Users** and copy the UID of the account you intend to administer. Confirm the account owner before using that UID.
2. In a trusted Node.js environment with `firebase-admin` installed and Application Default Credentials configured for project `cse-ace-reviewer`, run a short script like this. Replace `PASTE_CONFIRMED_UID_HERE` only with the UID you verified in step 1.

```js
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

initializeApp({
  credential: applicationDefault(),
  projectId: 'cse-ace-reviewer'
});

const uid = 'PASTE_CONFIRMED_UID_HERE';
const auth = getAuth();
const user = await auth.getUser(uid);
await auth.setCustomUserClaims(uid, { ...user.customClaims, admin: true });
console.log('Admin claim set for the confirmed UID.');
```

3. Have that user sign out and sign back in so Firebase issues a refreshed ID token. The admin panel checks the token claim and Firestore Rules enforce it.

To revoke the role, use the same trusted Admin SDK environment and remove only the `admin` property while preserving other custom claims.

## Important

- Never grant this claim to a UID based only on an email copied from a request.
- The claim grants broad admin powers over payment reviews, support tickets, and premium access. Keep it limited to the designated project owner.
- Admin claim setup and publishing Firestore Rules are separate steps. The payment button remains disabled in the draft until the code is intentionally enabled after rule review.
- Admin approval is manual GCash verification. Check the actual transaction in the GCash account before approving; a reference number alone is not proof of payment.
