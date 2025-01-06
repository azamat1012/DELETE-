from django.urls import path
from .views import BookListCreateView, FavoriteListCreateView, FavoriteDetailView

urlpatterns = [
    path('books/', BookListCreateView.as_view(), name='book-list-create'),
    path('favorites/', FavoriteListCreateView.as_view(),
         name='favorite-list-create'),
    path('favorites/<int:pk>/', FavoriteDetailView.as_view(), name='favorite-detail'),

]
