from django.http import JsonResponse
from users.utils.token import verify_jwt

def jwt_required(view_func):
    def wrapper(self, request, *args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if auth_header is None or not auth_header.startswith('Bearer '):
            return JsonResponse({'error': 'Authorization header missing or invalid'}, status=401)
        
        token = auth_header.split(' ')[1]
        user = verify_jwt(token)
        if user is None:
            return JsonResponse({'error': 'Invalid or expired token'}, status=401)

        request.user = user
        return view_func(self, request, *args, **kwargs)

    return wrapper
