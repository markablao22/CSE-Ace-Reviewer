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
- The current repository contains a **30-question starter bank**, not 500 unique questions yet. The practice selector supports larger requested counts but only available questions are used.
- Email/password login uses Firebase Authentication. Student profiles and personal progress summaries are synchronized to Cloud Firestore when the matching `firestore.rules` are published. A local browser copy is retained as a fallback. Progress totals are user-editable practice statistics and must not be treated as official scores.
- Premium payment is not active. Do not collect real payments until a payment provider, secure backend, and verified webhook flow are configured.
- Questions are for practice and are not official CSC exam questions. Always verify current exam coverage and laws using authoritative sources.

## Firestore setup
1. In Firebase Console, open **Firestore Database → Rules**.
2. Review the `firestore.rules` file in this repository and publish its contents only after confirming the project and rule structure.
3. Student documents are stored at `users/{uid}`; progress summaries are stored at `users/{uid}/progress/summary`.
4. `premiumAccess/{uid}` is read-only to the student. Only trusted server code using Firebase Admin SDK and an `admin: true` custom claim can grant or change Premium access. Do not set this claim from client-side code.
5. The current client does not implement payment processing or Premium activation. Configure a trusted backend and independently verified payment webhook before accepting payments.

## Next configuration needed
To enable secure accounts and cross-device progress, configure a Firebase project (Authentication + Firestore) and add its web configuration. For real payments, choose a provider and configure server-side verification. Never commit private service-account keys, payment secrets, or webhook secrets to this public repository.
