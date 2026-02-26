# ecommerce_skate/backend/backend/urls.py
from django.contrib import admin
from django.urls import path, include
from api.auth import CustomTokenObtainPairView, me
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

urlpatterns = [
    path('admin/', admin.site.urls),

    # Auth JWT
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/auth/me', me, name='auth_me'),

    # API
    path('api/', include('api.urls')),
]