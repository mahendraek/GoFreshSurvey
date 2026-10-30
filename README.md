# GoFresh Survey

Source code backup for the GoFresh/FreshBox customer survey.

## Live survey

https://gofreshboxsurvey.netlify.app/

## What is included

- `index.html` — mobile-friendly multi-step customer survey with welcome screen.
- `Code.gs` — Google Apps Script backend that appends survey responses to a Google Sheet.

## Current survey flow

1. Customer opens the survey from the Netlify site or QR code.
2. The browser submits the response to a deployed Google Apps Script web app.
3. Google Apps Script appends the response to the `Responses` tab in the configured Google Sheet.

The deployed Apps Script `/exec` URL is environment/deployment-specific and is intentionally not stored in this repository. Before deploying a new copy, replace `PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` in `index.html` with the active Apps Script Web App URL.

## Survey data captured

- Interest in the service
- Products of interest
- Preferred weekly box
- Delivery frequency
- Pilot participation interest
- Name
- Mobile number
- Email
- City / Area
- Comments / suggestions

## Current pilot pricing

- Small — ₹249/week
- Medium — ₹399/week
- Large — ₹499/week

## Google Apps Script setup

1. Open the response Google Sheet.
2. Open **Extensions → Apps Script**.
3. Add the contents of `Code.gs`.
4. Run `setup()` once and authorize it.
5. Deploy as a **Web app**.
6. Set **Execute as: Me** and **Who has access: Anyone**.
7. Copy the generated URL ending in `/exec`.
8. Put that URL in `API_URL` in `index.html`.
9. Deploy `index.html` to Netlify.

## Response confirmation

After a successful submission, the form is replaced with a confirmation message. The frontend also stops waiting after 15 seconds and shows a retry message if the submission does not complete.
