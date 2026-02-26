import click
from api.models import db, User, Skill, Exchange
# Importamos la función para encriptar
from werkzeug.security import generate_password_hash

def setup_commands(app):
    
    @app.cli.command("setup-skillbank-data")
    def setup_skillbank_data():
        print("Iniciando carga de datos SkillBank con encriptación...")

        try:
            db.session.query(Exchange).delete()
            db.session.query(Skill).delete()
            db.session.query(User).delete()
            db.session.commit()
            print("DB limpia.")
        except Exception as e:
            print(f"Error limpiando: {e}")
            db.session.rollback()

        # Encriptamos la contraseña para que el Login la reconozca
        hashed_password = generate_password_hash("password123")

        # 2. Usuarios con contraseña encriptada
        u1 = User(email="benji@test.com", password=hashed_password, name="Benji", wallet_credits=20)
        u2 = User(email="miguel@test.com", password=hashed_password, name="Miguel", wallet_credits=20)
        u3 = User(email="crys@test.com", password=hashed_password, name="Crystian", wallet_credits=20)
        u4 = User(email="andri@test.com", password=hashed_password, name="Andri", wallet_credits=20)
        
        db.session.add_all([u1, u2, u3, u4])
        db.session.commit()
        print("Usuarios creados con éxito (contraseñas seguras).")

        # 3. Skills (Asignamos 2 a cada uno)
        skills_list = [
            Skill(title="Clases de Guitarra", description="Acordes básicos.", credits_per_hour=2, owner=u1),
            Skill(title="React Básico", description="Componentes y Props.", credits_per_hour=3, owner=u1),
            Skill(title="Entrenamiento", description="Fitness en casa.", credits_per_hour=2, owner=u2),
            Skill(title="Edición Video", description="Adobe Premiere.", credits_per_hour=4, owner=u2),
            Skill(title="Arquitectura Flask", description="Backend Senior.", credits_per_hour=5, owner=u3),
            Skill(title="Diseño UX", description="Figma avanzado.", credits_per_hour=3, owner=u3),
            Skill(title="Derecho Civil", description="Asesoría legal.", credits_per_hour=4, owner=u4),
            Skill(title="Cocina Italiana", description="Pasta desde cero.", credits_per_hour=2, owner=u4),
        ]
        
        db.session.add_all(skills_list)
        db.session.commit()
        print("Skills creadas correctamente.")

        # 4. Un intercambio de ejemplo para ver si carga el historial
        e1 = Exchange(provider=u3, receiver=u1, skill=skills_list[4], credits_transferred=5, status="accepted")
        db.session.add(e1)
        db.session.commit()
        
        print("¡Todo listo! Carga exitosa!.")