import os


def upload_resume(instance, filename):
    path = f"candidates/{instance.full_name}/resume/"
    name = f"{filename}"
    return os.path.join(path, name)
