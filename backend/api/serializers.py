from django.contrib.auth.models import User
from rest_framework import serializers
from .models import User, Book, Favorite
from rest_framework.decorators import APIView


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'cover_image']


class FavoriteSerializer(serializers.ModelSerializer):
    book = BookSerializer()

    class Meta:
        model = Favorite
        fields = ['id', 'user', 'book', 'rating', 'description']
        read_only_fields = ['user']
        depth = 1

    def create(self, validated_data):
        book_data = validated_data.pop('book')

        book, created = Book.objects.get_or_create(
            title=book_data['title'],
            author=book_data['author'],
            cover_image=book_data.get('cover_image')
        )
        favorite = Favorite.objects.create(book=book, **validated_data)
        return favorite
