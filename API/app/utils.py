import os

def upload_resume(instance, filename):
    ext = filename.split('.')[-1]  # get the file extension.
    path = f'media/candidates/{instance.full_name}/resume/'
    name = f'{filename}.{ext}'
    return os.path.join(path, name)
