from wsgiref.util import FileWrapper

from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Candidate
from .permissions import IsAdminUser
from .serializers import CandidateSerializer


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
    permission_classes = (IsAdminUser,)

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
