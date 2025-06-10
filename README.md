
# Mentorship Platform

A modern web application connecting mentors and mentees, built with React, TypeScript, and Supabase.

## 🚀 Features

- **User Authentication**: Secure login/signup with email/password and Google OAuth
- **Mentor Discovery**: Browse and search for mentors across various fields
- **User Profiles**: Comprehensive profile management for both mentors and mentees
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Radix UI
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth (Email/Password + Google OAuth)
- **Database**: Supabase PostgreSQL
- **State Management**: React Context API, TanStack Query
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Charts**: Recharts

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Maitreya20/we-mentor.git
cd we-mentor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── NavBar.tsx      # Navigation component
│   ├── Footer.tsx      # Footer component
│   └── ...
├── contexts/           # React Context providers
│   ├── AuthContext.tsx # Authentication context
│   └── PaymentContext.tsx
├── pages/              # Page components
│   ├── Index.tsx       # Home page
│   ├── Login.tsx       # Login page
│   ├── SignUp.tsx      # Registration page
│   └── ...
├── integrations/       # External service integrations
│   └── supabase/       # Supabase configuration
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── data/               # Static data and configurations
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

## 🗄️ Database Setup

This project uses Supabase as the backend. To set up your database:

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the SQL migrations in the Supabase SQL editor
3. Configure Row Level Security (RLS) policies
4. Set up Google OAuth in Supabase Auth settings

## 🔐 Authentication

The app supports multiple authentication methods:
- Email and password
- Google OAuth

Make sure to configure the redirect URLs in your Supabase project settings.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
- Check the [Issues](https://github.com/yourusername/mentorship-platform/issues) page
- Create a new issue if your problem isn't already reported

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev) - AI-powered web development
- UI components by [shadcn/ui](https://ui.shadcn.com/)
- Backend powered by [Supabase](https://supabase.com/)
- Icons by [Lucide](https://lucide.dev/)

---
