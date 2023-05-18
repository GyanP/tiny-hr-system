from django.contrib import admin
from rangefilter.filters import DateRangeFilter

from .models import Candidate


@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "full_name",
        "date_of_birth",
        "experience",
        "created_at",
        "modified_at",
    )
    list_filter = [
        ("created_at", DateRangeFilter),
    ]
    search_fields = ["full_name", "experience"]
