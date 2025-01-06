import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/Favorites.css";
import NavBar from "../components/NavBar";
const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await api.get("/api/favorites/");
      const favoritesWithState = response.data.map((fav) => ({
        ...fav,
        rating: fav.rating || "",
      }));
      setFavorites(favoritesWithState);
    } catch (error) {
      console.error("Ошибка", error);
    }
  };

  const handleRatingChange = (favoriteId, value) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map((fav) =>
        fav.id === favoriteId ? { ...fav, rating: value } : fav
      )
    );
  };

  const removeFavorite = async (favoriteId) => {
    try {
      await api.delete(`/api/favorites/${favoriteId}/`);
      setFavorites(favorites.filter((fav) => fav.id !== favoriteId));
      alert("Книга удалена из избранных!");
    } catch (error) {
      console.error("Ошибка:", error.response?.data || error.message);
      alert("Что-то пошло не так");
    }
  };

  const updateRating = async (favoriteId) => {
    const favorite = favorites.find((fav) => fav.id === favoriteId);

    try {
      const payload = {
        rating: favorite.rating,
      };

      await api.patch(`/api/favorites/${favoriteId}/`, payload);
      alert("Оценка сохранена!");
    } catch (error) {
      console.error(
        "Что-то пошло не так",
        error.response?.data || error.message
      );
      alert("Ошибка");
    }
  };

  return (
    <>
      <div>
        <NavBar/>
      </div>
      <div className="favorites-container">
        <h2>Мои избранные:</h2>
        {favorites.length === 0 ? (
          <p>No favorite books yet.</p>
        ) : (
          favorites.map((favorite) => (
            <div key={favorite.id} className="book-row">
              <div className="book-cover">
                {favorite.book.cover_image && (
                  <div className="book-image">
                    <img
                    src={favorite.book.cover_image}
                    alt={favorite.book.title}
                    />
                  </div>
                )}
                <div className="delete-btn">
                <button onClick={() => removeFavorite(favorite.id)}>
                  Удалить
                </button>
                </div>
              </div>
              
              <div className="book-info">
                <h4>-{favorite.book.title}-</h4>
                <p>Автор: {favorite.book.author}</p>
              </div>
              <div className="rating-container">
                <label>
                  <select
                    value={favorite.rating}
                    onChange={(e) =>
                      handleRatingChange(favorite.id, e.target.value)
                    }
                  >
                    <option value="">Оценка</option>
                    <option value="1">🙁</option>
                    <option value="2">😑</option>
                    <option value="3">🙂</option>
                    <option value="4">🥹</option>
                    <option value="5">😍</option>
                  </select>
                </label>
                <button
                  onClick={() => updateRating(favorite.id)}
                  style={{ marginRight: "10px" }}
                >
                  Сохранить отзыв
                </button>
              
              </div>
            </div>
          ))
        )}
      </div>
    </>
    
  );
};

export default Favorites;
