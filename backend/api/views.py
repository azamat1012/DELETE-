from .models import Book, Favorite
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import BookSerializer, FavoriteSerializer
from rest_framework import generics
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from django.contrib.auth.models import User
from .serializers import UserSerializer


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class BookListCreateView(ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class FavoriteListCreateView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FavoriteSerializer

    def get_queryset(self):
        print("Authenticated user:", self.request.user)
        return Favorite.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        print("Authenticated user:", self.request.user)
        print("Payload received:", self.request.data)
        serializer.save(user=self.request.user)


class FavoriteDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
