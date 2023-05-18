from rest_framework.permissions import BasePermission


class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        """
        Check X-Admin-Permission
        """
        X_ADMIN = request.META.get("HTTP_X_ADMIN", None)
        if X_ADMIN == "1":
            return True
        elif request.user and request.user.is_active and request.user.is_superuser:
            return True
        return False
