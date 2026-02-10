import click
from api.models import db, User, Skill, Exchange


def setup_commands(app):
    
    @app.cli.command("setup-skillbank-data")
    def setup_skillbank_data():
        print("Iniciando carga de datos SkillBank")

        # 1. Limpieza total
        try:
            db.session.query(Exchange).delete()
            db.session.query(Skill).delete()
            db.session.query(User).delete()
            db.session.commit()
            print("DB limpia.")
        except Exception as e:
            print(f"Error limpiando: {e}")
            db.session.rollback()

        # 2. Usuarios (20 créditos cada uno)
        u1 = User(email="benji@test.com", password="password123", name="Benji", wallet_credits=20)
        u2 = User(email="miguel@test.com", password="password123", name="Miguel", wallet_credits=20)
        u3 = User(email="crys@test.com", password="password123", name="Crystian", wallet_credits=20)
        u4 = User(email="andri@test.com", password="password123", name="Andri", wallet_credits=20)
        
        db.session.add_all([u1, u2, u3, u4])
        db.session.commit()
        print("Usuarios creados con 20 créditos.")

        # 3. Skills (1 crédito por hora)
        s1 = Skill(title="React Avanzado", description="Hooks y Context", category="Programación", credits_per_hour=1, owner=u1)
        s2 = Skill(title="Arquitectura Flask", description="Backend Senior", category="Programación", credits_per_hour=1, owner=u3)
        
        db.session.add_all([s1, s2])
        db.session.commit()
        print("Skills creadas.")

        # 4. Intercambios (1 crédito transferido)
        e1 = Exchange(provider=u3, receiver=u1, skill=s2, credits_transferred=1, status="accepted")
        e2 = Exchange(provider=u1, receiver=u3, skill=s1, credits_transferred=1, status="pending")
        
        db.session.add_all([e1, e2])
        db.session.commit()
        
        print("¡Intercambios creados y carga completada con éxito!")