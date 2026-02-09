import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_admin.theme import Bootstrap4Theme

# importacion BD y models
from .models import db, User, Skill, Exchange

def setup_admin(app):
    # Config para la seguridad del tiket y evitar que cualquiera entre al panel admin 
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    
    # Renombre al panel Admin 
    admin = Admin(
        app, 
        name='SkillBank Admin Panel', 
        theme=Bootstrap4Theme(swatch='cerulean')
    )

    # Las tablas de models una a una 
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Skill, db.session))
    admin.add_view(ModelView(Exchange, db.session))

    