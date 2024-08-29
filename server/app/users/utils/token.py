import jwt
import datetime
from django.conf import settings
from users.models import Users
from django.core.exceptions import ObjectDoesNotExist

def generate_jwt(user):
    payload = {
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + settings.JWT_EXPIRATION_DELTA,
        'iat': datetime.datetime.utcnow()
    }
    token = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm='HS256')
    return token

def verify_jwt(token):
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=['HS256'])
        user = Users.objects.get(id=payload['user_id'])
        return user
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, ObjectDoesNotExist):
        return None
