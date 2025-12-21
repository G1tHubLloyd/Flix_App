# Part 2 Implementation Checklist ✅

## Requirements & Status

### Profile View Implementation
- ✅ Profile view created and accessible from navigation bar
- ✅ Displays user information (username, email, birthday)
- ✅ Allows updating user information (email, birthday, password)
- ✅ Password field is optional (leave blank to keep current)
- ✅ Username field is disabled (cannot be changed)
- ✅ Deregister functionality with confirmation dialog
- ✅ Displays favorite movies as a list with cards
- ✅ Filters movies using `user.favoriteMovies` array
- ✅ Shows movie count in favorites section header
- ✅ Links to movie details from favorite cards

### Favorite Functionality
- ✅ "Favorite" button in MovieCard component
- ✅ "Favorite" button in MovieView component
- ✅ Toggle favorites (add/remove)
- ✅ Visual distinction (♥ for favorited, ♡ for not favorited)
- ✅ Different button colors (danger for favorited, primary for not)
- ✅ Remove favorite from ProfileView
- ✅ Favorites sync with backend API
- ✅ Favorites persist in localStorage per user

### Navigation & Routing
- ✅ All navigation links working correctly
- ✅ Authenticated users can access:
  - Home (/)
  - Profile (/profile)
  - Movie details (/movies/:movieId)
  - Logout button
- ✅ Unauthenticated users see:
  - Login (/login)
  - Signup (/signup)
- ✅ Protected routes redirect to login when not authenticated
- ✅ Login/Signup redirect to home when already authenticated
- ✅ Catch-all route handles invalid URLs

### Bootstrap Styling
- ✅ ProfileView uses Bootstrap cards, forms, buttons
- ✅ MovieView uses Bootstrap grid, cards, buttons, badges
- ✅ MainView uses Bootstrap alerts for loading/error states
- ✅ LoginView and SignupView use Bootstrap forms
- ✅ NavigationBar uses custom styling (diagonal design)
- ✅ Consistent styling across all views
- ✅ Responsive design with Bootstrap classes

## Testing Checklist

### Navigation Tests
- [ ] Click "Home" link - navigates to main movie list
- [ ] Click "Profile" link - navigates to profile page
- [ ] Click movie card - navigates to movie details
- [ ] Click "Back to Movies" in MovieView - returns to home
- [ ] Click "Browse Movies" in empty favorites - navigates to home
- [ ] Click "Logout" - logs out and redirects to login
- [ ] Click movie in favorites list - navigates to movie details

### Profile View Tests
- [ ] Profile displays correct username
- [ ] Profile displays correct email
- [ ] Profile displays formatted birthday
- [ ] Click "Edit Profile" - shows edit form
- [ ] Change email and save - updates successfully
- [ ] Change birthday and save - updates successfully
- [ ] Enter new password and save - updates successfully
- [ ] Leave password blank and save - keeps current password
- [ ] Click "Cancel" - discards changes and returns to view mode
- [ ] Favorite movies section shows correct count
- [ ] Each favorite movie displays correctly
- [ ] Click "Remove" on favorite - removes from list
- [ ] Click "Delete Account" - shows confirmation dialog
- [ ] Confirm account deletion - deletes account and logs out

### Favorite Functionality Tests
- [ ] Click "Favorite" on MovieCard - adds to favorites
- [ ] Button changes to "Favorited" with heart icon
- [ ] Click "Favorited" on MovieCard - removes from favorites
- [ ] Button changes back to "Favorite" with outline heart
- [ ] Click "Add to Favorites" in MovieView - adds to favorites
- [ ] Click "Remove from Favorites" in MovieView - removes from favorites
- [ ] Navigate to Profile - see newly added favorite
- [ ] Remove favorite from Profile - no longer shows in list
- [ ] Favorites persist after logout and login

### API Integration Tests
- [ ] Login calls API and receives token
- [ ] Signup calls API and creates new user
- [ ] Movies load from API on login
- [ ] Add favorite syncs with backend
- [ ] Remove favorite syncs with backend
- [ ] Profile update syncs with backend
- [ ] Account deletion calls API
- [ ] Error handling works for failed API calls

### Edge Cases
- [ ] Access protected route when logged out - redirects to login
- [ ] Access /login when logged in - redirects to home
- [ ] Access /signup when logged in - redirects to home
- [ ] Access invalid URL - redirects appropriately
- [ ] MovieView with invalid ID - shows "not found" message
- [ ] Empty favorites list - shows helpful message with browse link
- [ ] Loading state shows while fetching movies
- [ ] Error state shows if API fails

## File Structure Verification

```
my-client/
├── package.json ✅
├── index.html ✅
├── .env.example ✅
├── .gitignore ✅
├── README.md ✅
└── src/
    ├── index.scss ✅
    ├── index.jsx ✅ (entry point)
    ├── App.jsx ✅
    ├── api.js ✅
    └── components/
        ├── login-view/
        │   └── login-view.jsx ✅
        ├── main-view/
        │   └── main-view.jsx ✅
        ├── movie-card/
        │   └── movie-card.jsx ✅
        ├── movie-view/
        │   └── movie-view.jsx ✅
        ├── signup-view/
        │   └── signup-view.jsx ✅
        ├── profile-view/
        │   └── profile-view.jsx ✅
        └── navigation-bar/
            ├── navigation-bar.jsx ✅
            └── navigation-bar.scss ✅
```

## Pre-Submission Checklist

- [ ] All tests pass
- [ ] Code is properly formatted
- [ ] No console errors in browser
- [ ] All features work as expected
- [ ] Bootstrap styling is consistent
- [ ] Navigation works correctly
- [ ] API integration is complete
- [ ] README is up to date
- [ ] .gitignore includes node_modules, dist, .env
- [ ] .env.example is provided
- [ ] Branch created from main
- [ ] All changes committed to branch
- [ ] Create zip file of repository
- [ ] Create pull request on GitHub
- [ ] Send PR link and zip to tutor

## Next Steps After Approval

1. Wait for tutor approval of pull request
2. Merge pull request into main branch
3. Pull latest main locally
4. Continue with next task

## Known Dependencies

### Backend Must Be Running
The client requires the backend API to be running at the URL specified in `VITE_API_BASE_URL`.

### Database Must Have Movies
The backend database should be seeded with movie data for the app to display content.

### Environment Variables
Create `.env` file in my-client directory:
```
VITE_API_BASE_URL=http://localhost:5000
```
