# Outreach Automation Panel

A full-stack dashboard concept for planning, running, and monitoring outreach workflows. The project brings lead data, AI-assisted content, email delivery, and campaign analytics into one focused Next.js interface.

> **Status:** Functional prototype intended for product and workflow exploration.

## Highlights

- Campaign and outreach workflow dashboard
- AI-assisted content capabilities through the OpenAI SDK
- Lead collection and automation integration with Apify
- Email delivery integration with Resend
- Firebase client and admin support
- CSV import and parsing with Papa Parse
- Campaign reporting and charts with Recharts
- Type-safe development with TypeScript

## Technology

- Next.js 15
- React 19
- TypeScript 5
- Tailwind CSS
- Firebase and Firebase Admin
- OpenAI SDK
- Apify Client
- Resend
- Recharts
- Papa Parse

## Getting started

### Requirements

- Node.js 20+
- npm
- Local environment variables for any enabled external services

### Installation

```bash
git clone https://github.com/waseemakram-dev/mock_automation_panel.git
cd mock_automation_panel
npm install
npm run dev
```

Open [http://localhost:8001](http://localhost:8001) in your browser.

Create local environment configuration for Firebase, OpenAI, Apify, and Resend only when those integrations are required. Never commit real credentials.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server on port 8001 |
| `npm run build` | Create an optimized production build |
| `npm run start` | Run the production server on port 8001 |
| `npm run lint` | Run the project linter |

## Product direction

- Improve campaign creation and progress visibility
- Add stronger validation and error handling around integrations
- Expand lead segmentation and reporting
- Add role-based access and workspace controls
- Increase automated test coverage

## Author

Built by [Waseem Akram](https://github.com/waseemakram-dev).
