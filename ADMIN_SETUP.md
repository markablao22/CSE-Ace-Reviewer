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

## Import the private Premium question bank

The app reads Premium items from `premiumQuestionBanks/v1`, which the Rules allow only to active Premium users and trusted admins. The importer uses the Admin SDK, so run it only from a trusted machine that is authorized for this Firebase project.

1. Prepare a fresh 470-item JSON array matching the app format: `[category, prompt, choices, answerIndex, explanation]`. Do not use the previously generated draft items as paid-only content; those were committed to this public repository and remain visible in its commit history.
2. In a trusted local folder, install the importer dependency from `tools/premium-import/package.json` with `npm install`.
3. Sign into Google Cloud Application Default Credentials with an identity authorized to write to this project. Do not create or commit service-account keys for this.
4. Run `node import-questions.mjs /path/to/private-question-bank.json` from the importer folder. The script validates the shape and writes one Firestore document. Keep the source JSON private and remove any local copy you no longer need.
5. Sign in as a Premium test account after rules and test data are configured; confirm the app can read all 470 items. A free account should receive a permission error if it tries to fetch the bank.

The payment button remains disabled in the web app. Do not enable it until the bank is freshly prepared, the Rules have been reviewed and deployed, and the designated admin account is set up.
