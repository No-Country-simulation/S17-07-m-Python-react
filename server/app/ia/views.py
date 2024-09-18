import os
import requests
import joblib
import spacy
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from functools import wraps
from django.views.decorators.csrf import csrf_exempt

# Configura las credenciales de la API de Spotify desde variables de entorno
SPOTIPY_CLIENT_ID = os.getenv('SPOTIPY_CLIENT_ID')
SPOTIPY_CLIENT_SECRET = os.getenv('SPOTIPY_CLIENT_SECRET')
SPOTIPY_REDIRECT_URI = os.getenv('SPOTIPY_REDIRECT_URI')

# Carga el modelo entrenado
def cargar_modelo():
    try:
        modelo = joblib.load(r'server\app\ia\trained_models\best_random_forest_modelos.pkl')
        return modelo
    except Exception as e:
        print(f"Error al cargar el modelo: {e}")
        raise

# Carga el vectorizador
def cargar_vectorizador():
    try:
        vectorizer = joblib.load(r'server\app\ia\trained_models\tfidf_vectorizer.pkl')
        return vectorizer
    except Exception as e:
        print(f"Error al cargar el vectorizador: {e}")
        raise

modelo = cargar_modelo()
vectorizer = cargar_vectorizador()

# Carga el modelo de lenguaje natural
nlp = spacy.load("es_core_news_sm")

# Diccionario de características por emoción e intención
caracteristicas_por_emocion = {
    "alegría": [0.8, 0.7, 0.1, 0.9, 120],
    "tristeza": [0.3, 0.2, 0.7, 0.3, 60],
    "miedo": [0.2, 0.3, 0.8, 0.2, 50],
    "enfado": [0.4, 0.6, 0.5, 0.3, 80],
    "sorpresa": [0.7, 0.5, 0.3, 0.7, 100],
    "calma": [0.2, 0.2, 0.6, 0.4, 50],
    "nostalgia": [0.5, 0.3, 0.5, 0.5, 60],
    "euforia": [0.9, 0.8, 0.2, 0.9, 140],
    "esperanza": [0.6, 0.6, 0.4, 0.7, 90],
    "bailar": [0.8, 0.9, 0.3, 0.8, 140],
    "llorar": [0.2, 0.3, 0.7, 0.2, 50],
    "sacar malas vibras": [0.6, 0.6, 0.4, 0.6, 100],
    "sanar": [0.5, 0.4, 0.5, 0.5, 70],
    "motivación": [0.7, 0.8, 0.3, 0.7, 120],
    "concentración": [0.5, 0.5, 0.6, 0.6, 80],
    "celebrar": [0.8, 0.9, 0.3, 0.8, 130],
    "meditar": [0.3, 0.4, 0.5, 0.6, 60],
    "estudiar": [0.5, 0.5, 0.5, 0.6, 75],
}

caracteristicas_por_intencion = {
    "bailar": [0.8, 0.9, 0.3, 0.8, 140],
    "llorar": [0.2, 0.3, 0.7, 0.2, 50],
    "sacar malas vibras": [0.6, 0.6, 0.4, 0.6, 100],
    "sanar": [0.5, 0.4, 0.5, 0.5, 70],
    "motivación": [0.7, 0.8, 0.3, 0.7, 120],
    "concentración": [0.5, 0.5, 0.6, 0.6, 80],
    "celebrar": [0.8, 0.9, 0.3, 0.8, 130],
    "meditar": [0.3, 0.4, 0.5, 0.6, 60],
    "estudiar": [0.5, 0.5, 0.5, 0.6, 75],
}

def extraer_emocion(texto):
    doc = nlp(texto)
    for token in doc:
        for emocion, palabras in emociones_clave.items():
            if token.lemma_ in palabras:
                return emocion
    return "desconocida"

def extraer_intencion(texto):
    doc = nlp(texto)
    for token in doc:
        for intencion, palabras in intenciones_clave.items():
            if token.lemma_ in palabras:
                return intencion
    return "general"

def authenticate_spotify():
    try:
        auth_response = requests.post(
            'https://accounts.spotify.com/api/token',
            data={
                'grant_type': 'client_credentials',
                'client_id': SPOTIPY_CLIENT_ID,
                'client_secret': SPOTIPY_CLIENT_SECRET
            }
        )
        auth_response.raise_for_status()
        auth_response_data = auth_response.json()
        return auth_response_data['access_token']
    except requests.RequestException as e:
        print(f"Error en la autenticación de Spotify: {e}")
        raise

def buscar_canciones_spotify(access_token, danceability, energy, acousticness, valence, tempo):
    try:
        headers = {
            'Authorization': f'Bearer {access_token}'
        }
        query = f"danceability:{danceability} energy:{energy} acousticness:{acousticness} valence:{valence} tempo:{tempo}"
        response = requests.get(f'https://api.spotify.com/v1/search?q={query}&type=track', headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error en la búsqueda de canciones: {e}")
        return {}

def buscar_en_deezer(nombre_cancion, artista):
    try:
        query = f"{nombre_cancion} {artista}"
        response = requests.get(f"https://api.deezer.com/search?q={query}")
        response.raise_for_status()
        resultados = response.json()

        if resultados.get('data'):
            cancion = resultados['data'][0]
            return {
                "deezer_link": cancion.get('link'),
                "preview": cancion.get('preview')
            }
        else:
            return {"error": "No se encontraron canciones en Deezer."}

    except requests.RequestException as e:
        print(f"Error en la búsqueda de Deezer: {e}")
        return {"error": "Error en la búsqueda en Deezer."}

# Decorador para requerir autenticación JWT
def jwt_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Implementar lógica de autenticación JWT
        token = request.headers.get('Authorization')
        if not token:
            return JsonResponse({"error": "Token requerido"}, status=401)
        try:
            # Validar el token (lógica de validación JWT)
            pass
        except Exception as e:
            print(f"Error en la autenticación JWT: {e}")
            return JsonResponse({"error": "Token inválido"}, status=401)
        return f(*args, **kwargs)
    return decorated_function

@csrf_exempt
@jwt_required
def buscar_canciones_deezer(request):
    if request.method == 'POST':
        try:
            data = request.json
            texto_usuario = data.get('texto', '')
            emocion = extraer_emocion(texto_usuario)
            intencion = extraer_intencion(texto_usuario)
            caracteristicas_emocion = modelo.predict([texto_usuario])

            if caracteristicas_emocion is None or len(caracteristicas_emocion) != 5:
                caracteristicas_emocion = caracteristicas_por_emocion.get(emocion) or caracteristicas_por_intencion.get(intencion)

                if caracteristicas_emocion is None:
                    return JsonResponse({"error": "No se encontraron características para la emoción o intención proporcionada."}, status=400)

            access_token = authenticate_spotify()
            resultados = buscar_canciones_spotify(access_token, *caracteristicas_emocion)
            canciones = [{"nombre": track['name'], "artista": track['artists'][0]['name']} for track in resultados.get('tracks', {}).get('items', [])]

            resultados_deezer = []
            for cancion in canciones:
                deezer_info = buscar_en_deezer(cancion['nombre'], cancion['artista'])
                resultados_deezer.append({
                    "nombre": cancion['nombre'],
                    "artista": cancion['artista'],
                    "deezer_link": deezer_info.get('deezer_link'),
                    "preview": deezer_info.get('preview')
                })

            return JsonResponse({"resultados": resultados_deezer}, status=200)

        except Exception as e:
            print(f"Error en la búsqueda de canciones: {e}")
            return JsonResponse({"error": "Error en la búsqueda de canciones."}, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)  