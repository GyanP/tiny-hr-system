from django.db import models
from core.models import DepartmentModel, TimestampModel
from .utils import upload_resume


class Candidate(DepartmentModel, TimestampModel):
    full_name = models.CharField(verbose_name="Full Name", max_length=256, blank=True, null=True)
    date_of_birth = models.DateField(verbose_name="Date Of Birth")
    experience = models.CharField(max_length=255, blank=True, null=True, verbose_name="Year of Experience")
    resume = models.FileField(upload_to=upload_resume, verbose_name="Resume")

    class Meta:
        verbose_name = "Candidate"
