# ShareFare

A community-driven food sharing marketplace built with React 19 and TypeScript. ShareFare connects neighbors to reduce food waste by enabling users to share surplus food items through a modern, responsive web application.

## Project Structure

```
ShareFare/
├── components/           # Reusable UI components
│   ├── Button.tsx        # Primary button component with variants
│   ├── ChatInterface.tsx # Messaging interface with survey modal
│   ├── FilterPanel.tsx   # Category and dietary filters
│   ├── ItemCard.tsx      # Food item display card
│   ├── Layout.tsx        # App shell with navigation
│   ├── UserProfileModal.tsx # User profile preview popup
│   └── ...
├── pages/                # Route-level components
│   ├── Home.tsx          # Main feed with filtering
│   ├── ItemDetail.tsx    # Individual item view
│   ├── AddItem.tsx       # Item creation form
│   ├── Messages.tsx      # Conversations list
│   ├── Profile.tsx       # User profile & stats
│   └── Login.tsx         # Authentication
├── context/              # React Context providers
│   └── AppContext.tsx    # Global state management
├── types.ts              # TypeScript type definitions
├── constants.ts          # Mock data and app configuration
├── utils.ts              # Helper functions
└── App.tsx               # Router configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ShareFare.git
cd ShareFare/ShareFare

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Available Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start Vite dev server with HMR   |
| `npm run build`   | Build production bundle          |
| `npm run preview` | Preview production build locally |

## Architecture

### State Management

The application uses React Context (see `AppContext`) for global state management to simulate:

- Current user session
- Items, conversations, and messages
- CRUD operations for items and messages

## API Integration

Currently uses mock data from `constants.ts`. Designed for easy integration with a REST or GraphQL backend by replacing context methods with API calls.
