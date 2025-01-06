import { useState, useEffect } from "react";  
import BookList from "../components/BookCard";  
import LoadingIndicator from "../components/LoadingIndicator";  
import { getBooks, searchBooks } from "../services/BookApi"; 
import api from "../services/api"; 
import "../styles/Home.css";
import NavBar from "../components/NavBar";

const Home = () => { 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [books, setBooks] = useState([]); 
  const [loading, setLoading] = useState(false);  
  const [noResults, setNoResults] = useState(false); 

  useEffect(() => { 
    const fetchDefaultBooks = async () => { 
      setLoading(true); 
      try { 
        const defaultBooks = await getBooks(); 
        setBooks(defaultBooks.slice(0, 50)); 
      } catch (error) { 
        console.error("Ошибка при загрузке книг:", error); 
      } finally { 
        setLoading(false); 
      } 
    }; 

    fetchDefaultBooks(); 
  }, []); 

  const handleSearchBooks = async (query) => { 
    setLoading(true); 
    setNoResults(false); 
    const amountOfRetrievingBooks = 50;
    try { 
      const searchResults = await searchBooks(query); 
      if (searchResults.length === 0) {
        setNoResults(true); 
      } else {
        setBooks(searchResults.slice(0, amountOfRetrievingBooks)); 
      }
    } catch (error) { 
      console.error("Ошибка при поиске книг:", error); 
    } finally { 
      setLoading(false); 
    } 
  };

  const addFavorite = async (book) => { 
    const payload = { 
      book: { 
        title: book.title, 
        author: book.author, 
        cover_image: book.image, 
      }, 
    }; 

    try { 
      await api.post("/api/favorites/", payload); 
      alert("Книга добавлена в избранные!"); 
    } catch (error) { 
      console.error("Ошибка при загрузке:", error.response?.data || error.message); 
      alert("Что-то пошло не так"); 
    } 
  }; 

  const handleSearchButtonClick = (event) => {
    event.preventDefault();  
    if (searchTerm.trim() !== "") {
      handleSearchBooks(searchTerm);
    }
  };

  return ( 
    <>
      <div>
        <NavBar/>
      </div>
      <div className="book-container"> 
        
        <form onSubmit={handleSearchButtonClick} className="search-form">
          <input 
              type="text" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              placeholder="Введите название книги..." 
              className="search-input" 
          /> 
          <button type="submit" className="search-button">
              Поиск
          </button>
        </form>

        {loading ? ( 
          <LoadingIndicator /> 
        ) : noResults ? ( 
          <p>К сожалению, по вашему запросу ничего не найдено.</p> 
        ) : books.length > 0 ? ( 
          <div className="books-grid">
              <BookList books={books} onAddFavorite={addFavorite} /> 
          </div>
        ) : ( 
          <p>Введите название книги для поиска</p> 
        )} 
      </div> 
    </>
  ); 
}; 
 
export default Home;
