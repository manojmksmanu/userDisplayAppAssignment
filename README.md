# User Directory App

A React Native Expo mobile application that fetches and displays user data from the Random Data API. The app shows detailed information for 80 users, with navigation controls to browse through the user list.

## Features

- Fetches data for 80 users from Random Data API
- Displays user information including:
  - ID
  - UID
  - Password
  - First Name
  - Last Name
  - Username
  - Email
  - Avatar (user image)
- Navigation buttons to move between users
- Error handling for API failures
- Loading states for improved user experience

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Setup Instructions

1. Clone the repository:

   ```
   git clone https://github.com/manojmksmanu/userDisplayAppAssignment.git
   cd user-directory
   ```

2. Install dependencies:

   ```
   npm install
   ```

   or if you use yarn:

   ```
   yarn install
   ```

3. Start the Expo development server:

   ```
   npx expo start
   ```

4. Run the app:
   - Scan the QR code with Expo Go app on your Android device
   - For iOS, scan the QR code with your camera app and follow the prompt
   - Press 'i' to open in iOS simulator (requires Xcode)
   - Press 'a' to open in Android emulator (requires Android Studio)

## Project Structure

src/
├── app/
│ ├── \_layout.tsx # Root layout configuration
│ └── index.tsx # Main app component with user list and navigation
├── components/
│ └── UserCard.tsx # Reusable component for user details
├── services/
│ └── api.ts # API fetching logic using Axios
├── app.json # Expo configuration file
├── assets/ # App icons and splash screen images
└── tsconfig.json # TypeScript configuration

app/_layout.tsx: Defines the app’s root layout (minimal unless using Expo Router).

app/index.tsx: Core application logic, state management, and UI rendering.

components/UserCard.tsx: Displays individual user info with an avatar and loading state.

services/api.ts: Handles API calls with Axios for modularity.

## API Integration

The app fetches user data from the Random Data API:

```
https://random-data-api.com/api/users/random_user?size=80
```

## Technical Implementation

Technical Implementation

Language: TypeScript for type safety

State Management: useState for managing users, loading, and error states

useEffect for initial data fetching

useCallback for memoizing API calls

API Fetching: Axios with error handling and timeout support

UI Components: React Native core components (View, Text, Image, etc.)

Expo’s LinearGradient for styling

Navigation: Custom state-based navigation using currentUserIndex

Error Handling: Try/catch with user-friendly messages

Image Loading: ActivityIndicator placeholder for avatars

