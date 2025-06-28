import BookList from "./components/BookList"
import { BookProvider } from "./contexts/BooksProvider"

function App() {

  return (
    <BookProvider >
      <BookList />
    </BookProvider>
  )
}

export default App
