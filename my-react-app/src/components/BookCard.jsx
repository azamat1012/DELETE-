import "../styles/BookCard.css"
const BookList = ({ books, onAddFavorite }) => { 
    return ( 
      <div className="book-card"> 
        {books.map((book) => ( 
          <div key={book.key} className="book-cover"> 
            {book.image && <img src={book.image} alt={book.title} />} 
            <div className="book-overlay">
              <button onClick={() => onAddFavorite(book)} className="favorite-btn">❤️</button> 
            </div>
            <div className="movie-info">
              <h4>{book.title}</h4> 
              <p>{book.author}</p> 
            </div>
         
          </div> 
        ))} 
      </div> 
    ); 
  }; 
   
  export default BookList;
