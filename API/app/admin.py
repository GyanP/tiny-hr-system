from django.contrib import admin
from .models import Candidate
from rangefilter.filters import DateRangeFilter


@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = (
        "full_name", "date_of_birth", 'experience', 'created_at', 'modified_at')
    list_filter = [("created_at", DateRangeFilter),]
    search_fields = ["full_name", "experience"]
