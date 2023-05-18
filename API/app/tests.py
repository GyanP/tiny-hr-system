import os

from django.urls import reverse
from rest_framework.test import APIClient, APITestCase

from .models import Candidate


class RegisterCandidateTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.client = APIClient()

        cls.full_name = "test1"
        cls.date_of_birth = "2023-01-11"
        cls.department_type = "IT"
        cls.experience = "1"
        cls.resume = (open(os.getcwd() + "/requirements.txt", "rb"), "image/png")

    def tearDown(self, *args, **kwargs):
        Candidate.objects.all().delete()

    def test_register_candidate(self):
        payload = {
            "full_name": self.full_name,
            "date_of_birth": self.date_of_birth,
            "department_type": self.department_type,
            "experience": self.experience,
            "resume": self.resume,
        }
        response = self.client.post(path=reverse("register_candidate"), data=payload)

        data = response.json()
        self.assertEqual(data["full_name"], self.full_name)
        self.assertEqual(data["date_of_birth"], self.date_of_birth)
        self.assertEqual(data["department_type"], self.department_type)


class RegisterCandidateTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.client = APIClient()

        cls.full_name = "test1"
        cls.date_of_birth = "2023-01-11"
        cls.department_type = "IT"
        cls.experience = "1"
        cls.resume = (open(os.getcwd() + "/requirements.txt", "rb"), "image/png")

    def tearDown(self, *args, **kwargs):
        Candidate.objects.all().delete()

    def test_register_candidate(self):
        payload = {
            "full_name": self.full_name,
            "date_of_birth": self.date_of_birth,
            "department_type": self.department_type,
            "experience": self.experience,
            "resume": self.resume,
        }
        response = self.client.post(path=reverse("register_candidate"), data=payload)

        data = response.json()
        self.assertEqual(data["full_name"], self.full_name)
        self.assertEqual(data["date_of_birth"], self.date_of_birth)
        self.assertEqual(data["department_type"], self.department_type)


class CandidatesTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.client = APIClient()
        cls.client.credentials(HTTP_X_ADMIN="1")

    def test_list_of_candidate(self):
        self.client.credentials(HTTP_X_ADMIN="1")
        response = self.client.get(path=reverse("candidates_list"))
        data = response.json()
        self.assertEqual(data, [])
