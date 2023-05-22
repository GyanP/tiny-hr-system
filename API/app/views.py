from wsgiref.util import FileWrapper

from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework import status, viewsets
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Candidate
from .permissions import IsAdminUser
from .serializers import CandidateSerializer


class UserLoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username", None)
        password = request.data.get("password", None)

        try:
            if username and password:
                user = User.objects.get(username=username)
                if user.check_password(password):
                    return Response(
                        {"message": "Login Successfully"}, status=status.HTTP_200_OK
                    )
            return Response(
                {"message": "Please pass username and password!"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as ex:
            return Response(
                {"message": "Login Failed"}, status=status.HTTP_400_BAD_REQUEST
            )


class CandidateView(viewsets.ModelViewSet):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer


class CandidateListAPIView(ListAPIView):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer
    permission_classes = (IsAdminUser,)


class CandidateResumeDownloadAPIView(ListAPIView, RetrieveAPIView):
    queryset = Candidate.objects.all()
    serializer_class = CandidateSerializer
    # permission_classes = (IsAdminUser,)

    def get(self, request, pk, format=None):
        queryset = Candidate.objects.get(id=pk)
        file_handle = queryset.resume.path
        document = open(file_handle, "rb")
        response = HttpResponse(
            FileWrapper(document), content_type="application/msword"
        )
        response["Content-Disposition"] = (
            'attachment; filename="%s"' % queryset.resume.name
        )
        return response
