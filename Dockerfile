FROM python:3.10-slim

RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && apt-get clean
WORKDIR /app/app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV DJANGO_SETTINGS_MODULE=app.settings

CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]