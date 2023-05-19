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
        self.assertEqual(response.status_code, 201)
        self.assertEqual(data["full_name"], self.full_name)
        self.assertEqual(data["date_of_birth"], self.date_of_birth)
        self.assertEqual(data["department_type"], self.department_type)

    def test_register_candidate_without_dob(self):
        payload = {
            "full_name": self.full_name,
            "department_type": self.department_type,
            "experience": self.experience,
            "resume": self.resume,
        }
        response = self.client.post(path=reverse("register_candidate"), data=payload)

        data = response.json()
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data["date_of_birth"][0], "This field is required.")
        self.assertEqual(data["resume"][0], "The submitted file is empty.")

    def test_register_candidate_without_resume(self):
        payload = {
            "full_name": self.full_name,
            "date_of_birth": self.date_of_birth,
            "department_type": self.department_type,
            "experience": self.experience,
        }
        response = self.client.post(path=reverse("register_candidate"), data=payload)

        data = response.json()
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data["resume"][0], "No file was submitted.")


class CandidatesTestCase(APITestCase):
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

    def test_list_of_candidate(self):
        payload = {
            "full_name": self.full_name,
            "date_of_birth": self.date_of_birth,
            "department_type": self.department_type,
            "experience": self.experience,
            "resume": self.resume,
        }
        self.client.post(path=reverse("register_candidate"), data=payload)

        self.client.credentials(HTTP_X_ADMIN="1")
        response = self.client.get(path=reverse("candidates_list"))
        data = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(data, [])

    def test_list_of_candidate_without_authentication(self):
        response = self.client.get(path=reverse("candidates_list"))
        data = response.json()
        self.assertEqual(response.status_code, 401)
        self.assertEqual(
            data["detail"], "Authentication credentials were not provided."
        )


class CandidateDownloadResumeTestCase(APITestCase):
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

    def test_download_candidate_resume(self):
        payload = {
            "full_name": self.full_name,
            "date_of_birth": self.date_of_birth,
            "department_type": self.department_type,
            "experience": self.experience,
            "resume": self.resume,
        }
        candidate = self.client.post(
            path=reverse("register_candidate"), data=payload
        ).json()

        self.client.credentials(HTTP_X_ADMIN="1")
        response = self.client.get(
            path=reverse("candidates_resume_download", kwargs={"pk": candidate["id"]})
        )
        self.assertEqual(response.status_code, 200)
