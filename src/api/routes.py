"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Skill
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


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