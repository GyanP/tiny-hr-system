from django.urls import path

from .views import CandidateListAPIView, CandidateResumeDownloadAPIView, CandidateView

urlpatterns = [
    path("register/", CandidateView.as_view({"post": "create", "get": "list"})),
    path("candidates/", CandidateListAPIView.as_view()),
    path("candidates/<int:pk>", CandidateResumeDownloadAPIView.as_view()),
]
