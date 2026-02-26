from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Añadimos información útil al token
        token['username'] = user.get_username()
        token['is_staff'] = user.is_staff
        token['is_superuser'] = user.is_superuser
        token['role'] = 'admin' if (user.is_staff or user.is_superuser) else 'user'
        return token

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    """Devuelve perfil básico del usuario autenticado (según JWT)."""
    user = request.user
    data = {
        "id": user.id,
        "username": user.get_username(),
        "email": getattr(user, 'email', ''),
        "is_staff": user.is_staff,
        "is_superuser": user.is_superuser,
        "role": "admin" if (user.is_staff or user.is_superuser) else "user",
    }
    return Response(data)