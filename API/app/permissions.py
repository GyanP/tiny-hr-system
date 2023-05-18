from rest_framework.permissions import BasePermission


class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        # Check X-Admin-Permission
        if request.META["HTTP_X_ADMIN"] == "1":
            return True
        return False
