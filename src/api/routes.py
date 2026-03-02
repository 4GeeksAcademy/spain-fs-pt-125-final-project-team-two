"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Skill
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import os
import re

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

@api.route('/signup', methods=['POST'])
def handle_signup():
    body = request.get_json()

    if not body or "email" not in body or "password" not in body or "name" not in body:
        return jsonify({"msg": "Faltan datos obligatorios (email, password, name)"}), 400

    email = body["email"]
    if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$', email):
        return jsonify({"msg": "El formato del correo electrónico no es válido"}), 400

    password = body["password"]
    if not re.match(r'^(?=.*[A-Za-z])(?=.*\d).{8,}$', password):
        return jsonify({"msg": "La contraseña debe tener al menos 8 caracteres, incluir letras y números"}), 400

    confirm_password = body.get("confirm_password")
    if confirm_password and password != confirm_password:
        return jsonify({"msg": "Las contraseñas no coinciden"}), 400

    user_exists = User.query.filter_by(email=email).first()
    if user_exists:
        return jsonify({"msg": "El email ya está registrado"}), 400

    password_hash = generate_password_hash(password)

    new_user = User(
        email=email,
        password=password_hash,
        name=body["name"],
        bio=body.get("bio", ""),
        avatar_url=body.get("avatar_url", ""),
        wallet_credits=20,
        is_active=True
    )

    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=str(new_user.id))

    return jsonify({
        "msg": "Usuario creado con 20 créditos de regalo",
        "token": access_token,
        "user_id": new_user.id,
        "name": new_user.name,
        "email": new_user.email,
        "avatar_url": new_user.avatar_url,
        "credits": new_user.wallet_credits
    }), 201


@api.route('/login', methods=['POST'])
def handle_login():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Usuario o contraseña incorrectos"}), 401

    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "token": access_token,
        "user_id": user.id,
        "name": user.name,
        "email": user.email,
        "avatar_url": user.avatar_url,
        "credits": user.wallet_credits
    }), 200


@api.route('/skills', methods=['POST'])
@jwt_required()
def add_skill():
    current_user_id = get_jwt_identity()
    body = request.get_json()

    if not body or "title" not in body:
        return jsonify({"msg": "El título es obligatorio"}), 400

    category = body.get("category", "skills")
    unsplash_url = f"https://source.unsplash.com/featured/?{category.replace(' ', ',')}"

    new_skill = Skill(
        title=body["title"],
        description=body.get("description", ""),
        credits_per_hour=body.get("credits_per_hour", 1),
        image_url=unsplash_url,
        user_id=current_user_id
    )

    db.session.add(new_skill)
    db.session.commit()

    return jsonify({"msg": "Habilidad publicada correctamente", "skill": new_skill.serialize()}), 201


# Andri Gestion de Datos
@api.route('/users/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify(user.serialize()), 200


@api.route('/users/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    body = request.get_json() or {}

    new_name = body.get('name')
    new_email = body.get('email')
    new_bio = body.get('description') or body.get('bio')
    new_avatar = body.get('avatar_url')
    new_password = body.get('password')

    if new_email and new_email != user.email:
        exists = User.query.filter_by(email=new_email).first()
        if exists:
            return jsonify({'message': 'El email ya está en uso'}), 400
        user.email = new_email

    if new_name:
        user.name = new_name

    if new_bio is not None:
        user.bio = new_bio

    if new_avatar is not None:
        user.avatar_url = new_avatar

    if new_password:
        user.password = generate_password_hash(new_password)

    db.session.commit()

    return jsonify(user.serialize()), 200


@api.route('/users/profile', methods=['DELETE'])
@jwt_required()
def delete_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"msg": "Perfil eliminado correctamente"}), 200


# BLOQUE CORREGIDO: EDICIÓN DE SKILL
@api.route('/skills/<int:skill_id>', methods=['PUT'])
@jwt_required()
def update_skill(skill_id):
    user_id = get_jwt_identity()
    skill = Skill.query.get(skill_id)

    if not skill:
        return jsonify({"error": "Skill not found"}), 404

    if skill.user_id != int(user_id):
        return jsonify({"error": "Esta habilidad no pertenece al usuario"}), 403

    # Lectura segura del body para evitar error 500 si no se envían datos correctamente
    body = request.get_json(silent=True) or {}

    new_title = body.get("title")
    new_description = body.get("description")
    new_credits_per_hour = body.get("credits_per_hour")

    if new_title:
        skill.title = new_title

    if new_description:
        skill.description = new_description

    if new_credits_per_hour:
        skill.credits_per_hour = new_credits_per_hour

    db.session.commit()

    # IMPORTANTE: Ahora devuelve la key "skill" para que el frontend no estalle
    return jsonify({
        "msg": "Habilidad actualizada correctamente",
        "skill": skill.serialize()
    }), 200


# BLOQUE CORREGIDO: ELIMINACIÓN DE SKILL
@api.route('/skills/<int:skill_id>', methods=['DELETE'])
@jwt_required()
def delete_skill(skill_id):
    user_id = get_jwt_identity()
    skill = Skill.query.get(skill_id)

    if not skill:
        return jsonify({"error": "Skill not found"}), 404

    if skill.user_id != int(user_id):
        return jsonify({"error": "Esta habilidad no pertenece al usuario"}), 403

    db.session.delete(skill)
    db.session.commit()

    # El frontend espera 200 y mensaje de confirmación
    return jsonify({"msg": "Habilidad eliminada correctamente"}), 200


@api.route('/book-session', methods=['POST'])
@jwt_required()
def book_session():
    student_id = get_jwt_identity()
    student = User.query.get(student_id)

    body = request.get_json()
    teacher_id = body.get("teacher_id")

    if not teacher_id:
        return jsonify({"msg": "Falta el ID del profesor"}), 400

    teacher = User.query.get(teacher_id)

    if not teacher:
        return jsonify({"msg": "El profesor no existe"}), 404

    if str(student.id) == str(teacher.id):
        return jsonify({"msg": "No puedes comprarte una clase a ti mismo, crack"}), 400

    if student.wallet_credits < 1:
        return jsonify({"msg": "No tienes créditos. ¡Enseña algo para ganar más!"}), 402

    student.wallet_credits -= 1
    teacher.wallet_credits += 1

    db.session.commit()

    return jsonify({
        "msg": "Intercambio realizado con éxito",
        "new_balance": student.wallet_credits
    }), 200
