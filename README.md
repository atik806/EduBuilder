# EduBuilder

## Description
A platform that helps students develop academic projects by offering complete solutions, mentorship, and coding support. We provide personalized help with software, hardware, and research-based projects — from idea to execution.

## Services Offered
- Java project support
- C# project support
- Software, hardware, and research-based project guidance
- Personalized mentorship
- Coding support

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Python (Flask, Firebase Admin)

## Project Structure

```
EduBuilder/
├── backend/
│   ├── app.py
│   └── requirements.txt
├── frontend/
│   ├── admin.html
│   ├── admin.js
│   ├── index.html
│   ├── script.js
│   └── style.css
├── edubuilder-service-account.json  # (NOT included in repo, see below)
├── .gitignore
└── README.md
```

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repo-url>
cd EduBuilder
```

### 2. Backend Setup (Python)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Place your Firebase service account JSON as `edubuilder-service-account.json` in the `EduBuilder` root directory (NOT tracked by git).
4. Start the backend server:
   ```bash
   python app.py
   ```

### 3. Frontend Usage
- Open `EduBuilder/frontend/index.html` in your web browser.
- For admin features, use `admin.html`.

## Backend API Endpoints
- `POST /api/contact` — Submit a contact form (public)
- `POST /api/admin/login` — Admin login (returns token)
- `GET /api/admin/contacts` — Get all contact submissions (admin, requires Bearer token)

## Security Warning
**Never upload your `edubuilder-service-account.json` or any credentials to GitHub.**

## License
MIT 