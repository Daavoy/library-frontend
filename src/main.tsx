import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import App from './App.tsx';
import BookList from './components/BookList.tsx';
import { BookPage } from './components/BookPage.tsx';
import LoginPage from './components/LoginPage.tsx';
import RegisterPage from './components/RegisterPage.tsx';
import { BookProvider } from './contexts/BooksProvider.tsx';
import { UserBooksProvider } from './contexts/UserBooksProvider.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserBooksProvider>
      <BookProvider >
        <BrowserRouter>
          <nav>
            <Link to="/login">Login</Link > | {" "}
            <Link to="/register">Register</Link >
          </nav>
          <Routes >
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<App />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/:id" element={<BookPage />} />
          </Routes>
        </BrowserRouter>
      </BookProvider>
    </UserBooksProvider>
  </StrictMode>,
)
