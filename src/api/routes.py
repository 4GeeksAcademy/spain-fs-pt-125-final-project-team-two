"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Skill
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

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











# CRYS (Lógica de Acción y Seguridad)


# 1. Registro: Todo usuario nuevo empieza con 20 créditos
@api.route('/signup', methods=['POST'])
def handle_signup():
    body = request.get_json()
    
    if not body or "email" not in body or "password" not in body or "name" not in body:
        return jsonify({"msg": "Faltan datos (email, password, name)"}), 400

    # Comprobar si el usuario ya existe
    user_exists = User.query.filter_by(email=body["email"]).first()
    if user_exists:
        return jsonify({"msg": "El email ya está registrado"}), 400

    new_user = User(
        email=body["email"],
        password=body["password"],
        name=body["name"],
        wallet_credits=20, 
        is_active=True
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado con 20 créditos de regalo"}), 201

# LOGIN Genera el token para que el usuario pueda publicar skills
@api.route('/login', methods=['POST'])
def handle_login():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")

    user = User.query.filter_by(email=email, password=password).first()

    if not user:
        return jsonify({"msg": "Usuario o contraseña incorrectos"}), 401

    # Creamos el token usando el ID del usuario como identidad
    access_token = create_access_token(identity=str(user.id))
    
    return jsonify({
        "token": access_token,
        "user_id": user.id,
        "name": user.name,
        "credits": user.wallet_credits
    }), 200

# PUBLICAr SKILL o HABILIDAD
@api.route('/skills', methods=['POST'])
@jwt_required()
def add_skill():
    current_user_id = get_jwt_identity()
    body = request.get_json()

    if not body or "title" not in body:
        return jsonify({"msg": "El título de la habilidad es obligatorio"}), 400

    new_skill = Skill(
        title=body["title"],
        description=body.get("description", ""),
        category=body.get("category", "Otros"),
        credits_per_hour=1, # Por defecto 1 crédito SIEMPRE por desicion del equipo
        user_id=current_user_id # Vinculacion al usuario logueado
    )

    db.session.add(new_skill)
    db.session.commit()

    return jsonify({"msg": "Habilidad publicada correctamente", "skill": new_skill.serialize()}), 201