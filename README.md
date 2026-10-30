# CSE ACE Reviewer

A responsive Civil Service Examination practice website with category-based quizzes, answer explanations, a timer, and per-browser progress tracking.

## Run locally
1. Download or clone this repository.
2. Open `index.html` in Chrome, Edge, or Firefox.
3. Create a local demo account or choose **Continue as guest**.
4. Choose a subject and start a practice test.

## Publish with GitHub Pages
1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, select **GitHub Actions**.
3. The workflow in `.github/workflows/pages.yml` deploys the site from the `main` branch.
4. After the workflow succeeds, open the Pages URL shown in repository Settings.

## Android APK
The `android` folder contains a lightweight Android WebView wrapper that loads the same local website. Pushes to `main` trigger the Android workflow. Download the generated APK from **Actions → Android APK → Artifacts** after a successful run.

## Important project status
- This draft combines 30 starter questions, 468 added questions, and 2 supplemental questions (500 total). The added bank is a generated study draft and needs subject-matter review before it is marketed as a polished or official-quality exam reviewer.
- Email/password login uses Firebase Authentication. Student profiles and personal progress summaries are synchronized to Cloud Firestore when the matching `firestore.rules` are published. A local browser copy is retained as a fallback. Progress totals are user-editable practice statistics and must not be treated as official scores.
- The draft includes manual GCash reference submission, admin review, Premium access, and customer support UI. Payment submission remains deliberately disabled (`PAYMENT_FLOW_READY=false`) until the exact Firestore Rules are reviewed and published and a trusted admin claim is configured. A reference number is not proof of payment; an admin must check the GCash transaction independently.
- Questions are for practice and are not official CSC exam questions. Always verify current exam coverage and laws using authoritative sources.

## Firestore setup
1. In Firebase Console, open **Firestore Database → Rules**.
2. Review the `firestore.rules` file in this repository and publish its contents only after confirming the project and rule structure.
3. Student documents are stored at `users/{uid}`; progress summaries are stored at `users/{uid}/progress/summary`.
4. `premiumAccess/{uid}` is read-only to the student. Only trusted server code using Firebase Admin SDK and an `admin: true` custom claim can grant or change Premium access. Do not set this claim from client-side code.
5. This draft adds `paymentRequests/{id}` and `supportTickets/{id}` rules. Payment requests can only be created as pending for ₱250; only an admin claim may approve/reject or grant Premium. Read [ADMIN_SETUP.md](ADMIN_SETUP.md) before configuring an admin. Rules are not published to Firebase by this draft.

## Before accepting payments
1. Review the draft branch and question bank; all questions are practice material and should be checked for accuracy and exam coverage.
2. Review and publish the exact `firestore.rules` only after confirming the Firebase project and rules.
3. Configure a trusted admin claim for the account you designate, following [ADMIN_SETUP.md](ADMIN_SETUP.md).
4. Independently confirm GCash payment before approving a request. Do not enable the payment button until these steps are complete.

Never commit private service-account keys, payment secrets, or webhook secrets to this repository.
