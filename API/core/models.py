from django.db import models
from .enum import DepartmentType

# All abstract models here

class TimestampModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class DepartmentModel(models.Model):
    department_type = models.CharField(
        max_length=128,
        choices=DepartmentType.choices(),
        default=DepartmentType.default(),
        blank=True,
        null=True
    )
    
    class Meta:
        abstract = True
