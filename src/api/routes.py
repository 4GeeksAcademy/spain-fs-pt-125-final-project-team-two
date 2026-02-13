"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Skill
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Andri


@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()

    return jsonify([user.serialize() for user in users]), 200


@api.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify(user.serialize()), 200


@api.route('/skills', methods=['GET'])
def get_skills():
    skills = Skill.query.all()

    return jsonify([skill.serialize() for skill in skills]), 200















































































# BLOQUE: CRYS - SEGURIDAD, ACCIÓN Y APIS EXTERNAS


# 1. Registro: El usuario nace con 20 créditos y clave encriptada
@api.route('/signup', methods=['POST'])
def handle_signup():
    body = request.get_json()

    # Validamos que no falte nada básico
    if not body or "email" not in body or "password" not in body or "name" not in body:
        return jsonify({"msg": "Faltan datos (email, password, name)"}), 400

    # Comprobamos si elusuario ya se registro
    user_exists = User.query.filter_by(email=body["email"]).first()
    if user_exists:
        return jsonify({"msg": "El email ya está registrado"}), 400

    # SEGURIDAD: Encriptamos la clave para que nadie la vea en la DB
    password_hash = generate_password_hash(body["password"])

    new_user = User(
        email=body["email"],
        password=password_hash, # Aca se guarda hash seguro 
        name=body["name"],
        wallet_credits=20, # creditos de registro 
        is_active=True
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado con 20 créditos de regalo"}), 201


# 2. LOGIN: Compara el hash y suelta el Token
@api.route('/login', methods=['POST'])
def handle_login():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")

    user = User.query.filter_by(email=email).first()

    # Verificamos si el usuario existe y si la clave (desencriptada) coincide
    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Usuario o contraseña incorrectos"}), 401

    # Creamos el token con el ID del usuario
    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "token": access_token,
        "user_id": user.id,
        "name": user.name,
        "credits": user.wallet_credits
        # Nota para el Front: USTEDES SACAN EL AVATAR DE  DiceBear usando el user.name
    }), 200


# 3. PUBLICAR SKILL: Con imagen automática de Unsplash
@api.route('/skills', methods=['POST'])
@jwt_required()
def add_skill():
    current_user_id = get_jwt_identity()
    body = request.get_json()

    if not body or "title" not in body:
        return jsonify({"msg": "El título es obligatorio"}), 400

    # API EXTERNA: Generamos una imagen de Unsplash según la categoría
    category = body.get("category", "skills")
    # Esta URL devuelve una imagen aleatoria profesional de esa temática
    unsplash_url = f"https://source.unsplash.com/featured/?{category.replace(' ', ',')}"

    new_skill = Skill(
        title=body["title"],
        description=body.get("description", ""),
        category=category,
        credits_per_hour=1, # Por acuerdo de equipo
        image_url=unsplash_url, # Foto automática para que el Front se vea BIEN
        user_id=current_user_id
    )

    db.session.add(new_skill)
    db.session.commit()

    return jsonify({"msg": "Habilidad publicada", "skill": new_skill.serialize()}), 201


# 4. TRANSACCIÓN: LOGICA DE INTERCAMBIO DE CREDITOS POR TIEMPO EN HBILIDAD
@api.route('/book-session', methods=['POST'])
@jwt_required()
def book_session():
    # El alumno es el que está logueado (sacamos su ID del token)
    student_id = get_jwt_identity()
    student = User.query.get(student_id)

    # El profesor viene en el body enviado por el Front
    body = request.get_json()
    teacher_id = body.get("teacher_id")

    if not teacher_id:
        return jsonify({"msg": "Falta el ID del profesor"}), 400

    teacher = User.query.get(teacher_id)

    # Validaciones de seguridad para no romper la economía
    if not teacher:
        return jsonify({"msg": "El profesor no existe"}), 404
    
    if str(student.id) == str(teacher.id):
        return jsonify({"msg": "No puedes comprarte una clase a ti mismo, crack"}), 400

    if student.wallet_credits < 1:
        return jsonify({"msg": "No tienes créditos. ¡Enseña algo para ganar más!"}), 402

    # LÓGICA DE INTERCAMBIO
    student.wallet_credits -= 1 # Restamos al alumno
    teacher.wallet_credits += 1 # Sumamos al profe

    db.session.commit() # Guardamos los cambios de ambos

    return jsonify({
        "msg": "Intercambio realizado con éxito",
        "new_balance": student.wallet_credits
    }), 200