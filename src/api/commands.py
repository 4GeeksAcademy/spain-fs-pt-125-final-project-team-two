import click
from api.models import db, User, Skill, Exchange

def setup_commands(app):
    
    @app.cli.command("setup-skillbank-data")
    def setup_skillbank_data():
        print("Iniciando carga de datos SkillBank...")

        # 1. Limpieza total para evitar duplicados
        try:
            db.session.query(Exchange).delete()
            db.session.query(Skill).delete()
            db.session.query(User).delete()
            db.session.commit()
            print("DB limpia: registros anteriores eliminados.")
        except Exception as e:
            print(f"Error limpiando: {e}")
            db.session.rollback()

        # 2. Creación de los usuarios del equipo (20 créditos cada uno)
        u1 = User(email="benji@test.com", password="password123", name="Benji", wallet_credits=20)
        u2 = User(email="miguel@test.com", password="password123", name="Miguel", wallet_credits=20)
        u3 = User(email="crys@test.com", password="password123", name="Crystian", wallet_credits=20)
        u4 = User(email="andri@test.com", password="password123", name="Andri", wallet_credits=20)
        
        db.session.add_all([u1, u2, u3, u4])
        db.session.commit()
        print("Usuarios del equipo creados (Benji, Miguel, Crystian, Andri).")

        # 3. Skills: 2 por cada usuario (Total 8 skills)
        # Usamos solo campos existentes en models.py: title, description, credits_per_hour, owner
        skills_data = [
            # Skills de Benji
            Skill(title="Clases de Guitarra", description="Aprende acordes básicos y canciones populares.", credits_per_hour=2, owner=u1),
            Skill(title="Introducción a React", description="Fundamentos de componentes y props.", credits_per_hour=3, owner=u1),
            
            # Skills de Miguel
            Skill(title="Entrenamiento Funcional", description="Rutinas personalizadas para casa o gym.", credits_per_hour=2, owner=u2),
            Skill(title="Edición de Video", description="Uso básico de Premiere o DaVinci.", credits_per_hour=4, owner=u2),
            
            # Skills de Crystian
            Skill(title="Arquitectura Flask", description="Estructura senior para APIs robustas.", credits_per_hour=5, owner=u3),
            Skill(title="Diseño UX/UI", description="Principios de diseño para apps modernas.", credits_per_hour=3, owner=u3),
            
            # Skills de Andri
            Skill(title="Asesoría Legal", description="Conceptos básicos de derecho civil.", credits_per_hour=4, owner=u4),
            Skill(title="Cocina Mediterránea", description="Recetas saludables y fáciles.", credits_per_hour=2, owner=u4),
        ]
        
        db.session.add_all(skills_data)
        db.session.commit()
        print("Skills creadas (2 por usuario).")

        # 4. Intercambios de prueba (Opcional, para ver datos en el Feed)
        # e1: Benji le da créditos a Crystian por una asesoría de Flask
        e1 = Exchange(provider=u3, receiver=u1, skill=skills_data[4], credits_transferred=5, status="accepted")
        
        db.session.add_all([e1])
        db.session.commit()
        
        print("¡Carga completada con éxito! Ya podéis iniciar sesión y probar los intercambios.")