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
- Login and progress are currently stored in the browser's local storage. This is a prototype, not secure cloud authentication, and accounts do not sync between devices.
- Premium payment is not active. Do not collect real payments until a payment provider, secure backend, and verified webhook flow are configured.
- Questions are for practice and are not official CSC exam questions. Always verify current exam coverage and laws using authoritative sources.

## Next configuration needed
To enable secure accounts and cross-device progress, configure a Firebase project (Authentication + Firestore) and add its web configuration. For real payments, choose a provider and configure server-side verification. Never commit private service-account keys, payment secrets, or webhook secrets to this public repository.
