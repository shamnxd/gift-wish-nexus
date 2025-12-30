# 🎅 Gift Wish Nexus - Secret Santa Platform

A magical platform that connects children's Christmas wishes with generous sponsors, bringing joy and making dreams come true during the holiday season.

## 🌟 Project Concept

**Gift Wish Nexus** is a heartwarming web application that creates a bridge between children who write letters to Santa and sponsors who want to make a difference. The platform enables:

- **Children** to write heartfelt letters to Santa, sharing their Christmas wishes, dreams, and drawings
- **Sponsors** (companies or individuals) to sponsor gifts for children, bringing their wishes to life
- **Santa's Dashboard** to manage letters, assign sponsors, and track deliveries

### How It Works

1. **Children Write Letters**: Kids can visit the platform, fill out a letter to Santa with their name, age, location, gift preferences, and even upload drawings
2. **Letters Are Saved**: All letters are securely stored in Firebase, creating a magical database of wishes
3. **Sponsors Step In**: Companies or individuals can become sponsors, choosing how many gifts they want to sponsor (at ₹100 per gift)
4. **Payment & Confirmation**: Sponsors can select payment methods (PayPal or other), complete the sponsorship, and get confirmation
5. **Santa's Dashboard**: Administrators can view all letters, assign sponsors to specific wishes, and track the delivery status

### Key Features

- ✉️ **Letter Writing System**: Beautiful, child-friendly interface for writing letters to Santa
- 🎁 **Gift Sponsorship**: Easy sponsorship system with payment options (mock PayPal integration)
- 💰 **Transparent Pricing**: ₹100 per gift with automatic total calculation
- 📊 **Santa's Dashboard**: Comprehensive admin panel to manage letters and sponsors
- 🖼️ **Image Uploads**: Support for children's drawings and sponsor logos via Firebase Storage
- 🔄 **Real-time Updates**: All data synced with Firebase Firestore
- 🎨 **Beautiful UI**: Modern, festive design with Christmas theme

## 🚀 Lovable Project Info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

This project is built and managed with [Lovable](https://lovable.dev), an AI-powered development platform.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## 🛠️ Technologies Used

This project is built with modern web technologies:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library for building interactive interfaces
- **shadcn-ui** - Beautiful, accessible component library
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase** - Backend as a Service
  - **Firestore** - NoSQL database for letters and sponsors
  - **Storage** - File storage for drawings and logos
- **React Router** - Client-side routing
- **React Query** - Data fetching and state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## 🔥 Firebase Setup

This project uses Firebase for storing letters and sponsor data. Follow these steps to set up Firebase:

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Enable Google Analytics (optional)

### Step 2: Enable Services

1. **Firestore Database**:
   - Go to Firestore Database in the left sidebar
   - Click "Create database"
   - Start in test mode (for development) or production mode
   - Choose your preferred location

2. **Storage**:
   - Go to Storage in the left sidebar
   - Click "Get started"
   - Start in test mode (for development)
   - Use the same location as Firestore

### Step 3: Get Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon (`</>`) to add a web app
4. Register your app and copy the configuration

### Step 4: Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

### Step 5: Security Rules

**Firestore Rules** (for development):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // Only for development!
    }
  }
}
```

**Storage Rules** (for development):
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true; // Only for development!
    }
  }
}
```

⚠️ **Important**: Update these rules for production to secure your data!

### Payment System Note

The payment system is currently a **mock implementation**. Sponsors can select PayPal as a payment method, but no actual payment processing occurs. The data is saved directly to Firebase with a generated transaction ID. To integrate real payments, you would need to integrate with PayPal SDK or other payment gateways.

## 📦 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn-ui components
│   └── ...             # Custom components (Navbar, Footer, etc.)
├── pages/              # Page components
│   ├── Index.tsx       # Home page
│   ├── WriteLetter.tsx # Letter writing page
│   ├── Sponsor.tsx     # Sponsor registration page
│   └── SantaDashboard.tsx # Admin dashboard
├── lib/                # Utilities and services
│   ├── firebase.ts     # Firebase configuration
│   └── firebase/       # Firebase service modules
│       ├── letters.ts  # Letter CRUD operations
│       └── sponsors.ts # Sponsor CRUD operations
└── hooks/              # Custom React hooks
```

## 🚀 Deployment

### Deploy with Lovable

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on **Share → Publish**.

### Deploy Manually

1. Build the project:
   ```sh
   npm run build
   ```

2. Deploy the `dist` folder to your preferred hosting service:
   - Vercel
   - Netlify
   - Firebase Hosting
   - Any static hosting service

## 🌐 Custom Domain

Yes, you can connect a custom domain to your Lovable project!

1. Navigate to **Project > Settings > Domains**
2. Click **Connect Domain**
3. Follow the instructions to configure your domain

Read more: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 📝 License

This project is open source and available for use.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

---

**Made with ❤️ and 🎄 using [Lovable](https://lovable.dev)**
