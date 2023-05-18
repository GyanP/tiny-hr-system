from django.urls import path

from .views import (CandidateListAPIView, CandidateResumeDownloadAPIView,
                    CandidateView)

urlpatterns = [
    path("register/", CandidateView.as_view({"post": "create"}), name="register_candidate"),
    path("candidates/", CandidateListAPIView.as_view(), name="candidates_list"),
    path("candidates/<int:pk>", CandidateResumeDownloadAPIView.as_view()),
]
