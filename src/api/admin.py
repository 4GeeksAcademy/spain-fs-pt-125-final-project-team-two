import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_admin.theme import Bootstrap4Theme

# Importamos todos los modelos para que el admin los reconozca
from .models import db, User, Skill, Exchange

def setup_admin(app):
    # Config de seguridad básica, evita que cualquiera entre al admin
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    
    # Config visual del panel 
    admin = Admin(
        app, 
        name='SkillBank Admin Panel', 
        theme=Bootstrap4Theme(swatch='cerulean')
    )

    # Añadimos las vistas para poder editar todo desde la web
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Skill, db.session))
    admin.add_view(ModelView(Exchange, db.session))