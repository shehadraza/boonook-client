# BookNook – A Small Online Library

**Live site:** https://boonook-client.vercel.app

BookNook is a small online library. Add a book, borrow a book, return a book.
Readers can browse every book, add their own, borrow a book for 14 days and
return it when they are done.

## Features

- **Animated home page:** a Swiper slider with three slides, a New Arrivals section that loads the six newest books from the database, and sections that explain how borrowing works.
- **Secure login:** register and login with email and password or with Google, using BetterAuth with the MongoDB adapter. Passwords need an uppercase letter, a lowercase letter and at least 6 characters.
- **Private routes:** Add Book, Book Details, My Books and My Borrows need a login. After logging in you return to the page you wanted, and a reload never sends you back to Login.
- **Manage your books:** add a book with a cover image uploaded to imgbb, edit it with a pre-filled form, and delete it after a confirm modal.
- **Borrow and return:** borrowing reduces the available copies and returning adds one back. When no copies are left the button shows "Not Available".
- **No double borrow:** you cannot borrow the same book twice at the same time. An error toast explains why.
- **Search and filter:** find books by title or author and filter by category (Fiction, Science, History, Kids, Others).
- **Dark and light theme:** switch the theme from the navbar. The choice is remembered.
- **Smooth and responsive:** Framer Motion animations, a loading spinner, toast messages for every success and error, a custom 404 page and a layout that works on mobile, tablet and desktop.

## Tech Stack

- Next.js (App Router) and TypeScript
- Tailwind CSS and daisyUI
- BetterAuth with the MongoDB adapter and JWT
- Swiper.js, Framer Motion, React Hot Toast
- Express.js and MongoDB on the server

## Routes

| Route | Access | Page |
|---|---|---|
| `/` | Public | Home |
| `/books` | Public | All Books |
| `/login`, `/register` | Public | Authentication |
| `/books/:id` | Private | Book Details and Borrow |
| `/add-book` | Private | Add Book |
| `/my-books` | Private | Edit and delete your books |
| `/my-borrows` | Private | Return borrowed books |
| `/profile` | Private | My Profile |

## Run Locally

```bash
git clone https://github.com/shehadraza/boonook-client.git
cd booknook-client
npm install
npm run dev
```

Create a `.env.local` file in the project root:

```env
MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Server

The API lives in a separate repository:
https://github.com/shehadraza/booknook-server