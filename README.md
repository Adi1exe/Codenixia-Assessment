# Codenixia Assessment

Codenixia Nexus is a modern, full-stack business automation web application. It features an intelligent AI Chatbot powered by Google's Gemini API, a secure and rate-limited Lead Generation system, background email notifications, and an administrative dashboard to manage submissions.

## 🌟 Key Features

- **🤖 AI Business Assistant:** Integrated chatbot using Google's Generative AI (Gemini API) to answer queries contextually.
- **📝 Lead Generation System:** A user-friendly lead capture form built with React.
- **🔒 Security First:** IP-based rate limiting using SlowAPI to prevent spam and abuse (e.g., max 5 lead submissions per minute).
- **📧 Automated Email Notifications:** Asynchronous background tasks that trigger email notifications upon successful lead submission.
- **📊 Admin Dashboard:** View, track, and manage all your leads securely.
- **⚡ High Performance:** Lightning-fast frontend tooling with Vite and an asynchronous Python backend powered by FastAPI.

## 🛠️ Technology Stack

### Frontend
- **Framework:** React + Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Toast Notifications:** React Hot Toast

### Backend
- **Framework:** FastAPI
- **Database:** SQLite with SQLAlchemy ORM
- **Rate Limiting:** SlowAPI
- **AI Integration:** Google Generative AI (`google-generativeai`)
- **Server:** Uvicorn

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Python (3.10+)
- Gemini API Key
- Email Provider SMTP Credentials

### 1. Clone the repository
```bash
git clone https://github.com/Adi1exe/Codenixia-Assessment.git
cd Codenixia-Assessment
```

### 2. Backend Setup
Navigate to the backend directory, set up your virtual environment, and install dependencies:

```bash
cd backend
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory based on `.env.example` (or configure the following variables):

```env
GEMINI_API_KEY=your_gemini_api_key_here
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

> [!WARNING]
> **Render Free Tier SMTP Restriction:** Render's free tier has a security wall that blocks outgoing SMTP traffic (via `smtplib`) to prevent spam and scamming activities. Standard email sending will not function on Render's free tier; consider using an API-based mail service (e.g., SendGrid, Resend) or upgrading to a paid tier if SMTP is required.

Run the backend server:
```bash
uvicorn app.main:app --reload
```
The backend API and Swagger UI will be available at [http://localhost:8000/docs](http://localhost:8000/docs).

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and install dependencies:

```bash
cd frontend
npm install
```

Run the development server:
```bash
npm run dev
```
The frontend will be accessible at [http://localhost:5173](http://localhost:5173).

## 📡 API Endpoints

- `POST /api/chat`: Send messages to the Gemini AI chatbot.
- `POST /api/leads`: Submit a new lead (Rate limited to 5/minute per IP). Triggers a background email.
- `GET /api/admin/leads`: Retrieve all submitted leads from the database.

## 📂 Project Structure

```text
Codenixia/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── ai_service.py      # Gemini AI integration
│   │   ├── database.py        # SQLite SQLAlchemy configuration
│   │   ├── email_service.py   # Background email sending logic
│   │   ├── main.py            # FastAPI entry point & routes
│   │   ├── models.py          # Database models
│   │   └── schemas.py         # Pydantic validation schemas
│   ├── requirements.txt
│   └── .env                   # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/        # React UI components (Dashboard, LeadForm)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Enhancements Made:

1.  **Backend Enhancements:**
    *   **Rate Limiting:** Implemented `slowapi` to restrict lead submissions to a maximum of 5 per minute per IP address, preventing spam and abuse.
    *   **System Instruction Updates:** Enhanced the Gemini AI system prompt to strictly enforce the "human-in-the-loop" policy, ensuring the AI never claims ownership of building custom automations and always redirects users to the lead form for expert consultation.
    *   **Admin Dashboard:** Added an internal admin-only API endpoint to fetch and display all lead submissions from the database.

2.  **Frontend Enhancements:**
    *   **Dashboard:** Created a comprehensive Admin Dashboard (`/dashboard`) to visualize telemetry data.
    *   **Data Visualization:** Added KPI cards (Leads Captured, Active Pipelines, Database Status) and a real-time Intel Matrix table to display submitted leads.
    *   **Admin UI/UX:** Implemented a "Glassmorphism" design theme with dark mode, backdrop blur effects, hover animations, and loading states.
    *   **Secret Route:** Made the dashboard accessible only via direct URL access (no navigation link) to maintain the "secret" feel of an admin-only portal.

**Access the Dashboard:** Once the backend is running, you can view the admin dashboard at `http://localhost:5173/dashboard` (requires at least one lead to be submitted first).

This Project is made for Codenixia Assessment by Aditya Dolas.

## Socials

- **GitHub:** https://github.com/Adi1exe
- **LinkedIn:** https://www.linkedin.com/in/dolas-aditya/
- **X(Twitter):** https://x.com/DolasAditya
- **Instagram:** https://www.instagram.com/heyyyyadi/
- **Portfolio:** https://adityadolas-theta.vercel.app
