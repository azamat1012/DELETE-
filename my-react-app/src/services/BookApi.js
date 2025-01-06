export const getBooks = async () => {
  try {
    const response = await fetch("https://openlibrary.org/search.json?q=subject:fiction&sort=new");
    const data = await response.json();
    return mapBooks(data.docs);
  } catch (error) {
    console.error("Ошибка при загрузке книг:", error);
    throw error;
  }
};

export const searchBooks = async (query) => {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&sort=new`
    );
    const data = await response.json();
    return mapBooks(data.docs);
  } catch (error) {
    console.error("Ошибка при поиске книг:", error);
    throw error;
  }
};

const mapBooks = (books) => {
  return books.slice(0, 50).map((book) => {
    const coverImage = book.cover_edition_key
      ? `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`
      : "https://i.pinimg.com/736x/af/83/ef/af83ef36e728d4c09cdfe7059b3c33a2.jpg";
    
    console.log('Cover Image:', coverImage);
    return {
      key: book.key,
      title: book.title || "Название отсутствует",
      author: book.author_name?.[0] || "Автор неизвестен",
      image: coverImage,
    };
  });
};
