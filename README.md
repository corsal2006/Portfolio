# Siddesh Naik 3D Editable Portfolio

A 3D animated engineering portfolio built with HTML, CSS, JavaScript, Three.js, Vercel Functions, and Vercel Blob. The site includes a hidden owner editor that can update portfolio text, links, skills, experience, projects, project images, profile photo, and resume PDF.

![Desktop preview](screenshots/desktop.png)

![Mobile preview](screenshots/mobile.png)

## Features

- Full-screen animated Three.js background.
- Responsive portfolio sections for hero, tech stack, experience, projects, profile, achievements, and contact.
- Owner edit mode protected by a special code.
- Editable resume PDF link with upload support.
- Editable project cards with project image upload support.
- Persistent deployed edits using Vercel Blob.
- Local JSON fallback for development.

## How Permanent Editing Works

When deployed on Vercel, the portfolio saves data outside the codebase:

- Portfolio content is saved as `portfolio/profile.json` in Vercel Blob.
- Uploaded files are saved under `portfolio/uploads/...` in Vercel Blob.
- Visitors load the same saved portfolio data from the API.
- Changes made from owner mode are visible to everyone, even after redeploys.

Important: permanent deployed edits require a connected Vercel Blob store and the `BLOB_READ_WRITE_TOKEN` environment variable. Without that token, Vercel serverless functions cannot permanently write data.

## Owner Mode

1. Open the portfolio.
2. Click the lock button in the header.
3. Enter the special code.
4. Default code: `23`.
5. Edit any field.
6. Changes autosave.

For production, set `OWNER_CODE` in Vercel environment variables if you want a code other than `23`.

## Run Locally

```bash
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:4173
```

Local edits are saved to `data/profile.json` through the local API.

## Deploy With Permanent Edits On Vercel

1. Push the project to GitHub.
2. Import the GitHub repo into Vercel.
3. In Vercel, create or connect a Vercel Blob store.
4. Make sure Vercel adds `BLOB_READ_WRITE_TOKEN` to the project environment variables.
5. Optional: add `OWNER_CODE` to change the edit code.
6. Redeploy the project after adding environment variables.
7. Open the live site, unlock owner mode, edit content, and save.
8. Open the site in another browser/device to confirm everyone sees the saved changes.

## Make This Your Own Portfolio

1. Fork this repository or clone it.

```bash
git clone https://github.com/corsal2006/Portfolio.git
cd Portfolio
```

2. Install dependencies.

```bash
npm install
```

3. Update the default portfolio data in `data/profile.json`.

Change:

- `name`
- `tagline`
- `role`
- `summary`
- `about`
- `email`
- `phone`
- `socials`
- `skills`
- `experience`
- `projects`
- `achievements`

4. Replace the resume.

Put your PDF at:

```text
resume.pdf
```

Or upload a resume later from owner mode.

5. Run locally and check the design.

```bash
npm run dev
```

6. Use owner mode for quick edits.

Click the lock button, enter `23`, and update your content from the browser.

7. Deploy to Vercel and connect Vercel Blob.

This is the key step that makes browser edits permanent for everyone.

8. Change the owner code for your own deployment.

In Vercel project settings, add:

```text
OWNER_CODE=your-secret-code
```

Then redeploy.

## Project Structure

```text
api/
  profile.js        Vercel API for reading and saving portfolio JSON
  upload.js         Vercel API for resume and image uploads
data/
  profile.json      Default local portfolio data
lib/
  portfolio-storage.mjs
screenshots/
  desktop.png
  mobile.png
src/
  main.js           Portfolio rendering, editor, uploads, Three.js scene
  styles.css        UI styling
server.mjs          Local development server
resume.pdf          Default resume PDF
```

## Storage Notes

This project does not commit edits made from owner mode back to GitHub. Runtime edits belong in Vercel Blob so they can be changed after deployment and shared with all visitors immediately.

GitHub stores the source code. Vercel Blob stores live portfolio edits and uploaded media.
