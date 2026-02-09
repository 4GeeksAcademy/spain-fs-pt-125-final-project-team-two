
import click
from api.models import db, User, Skill

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        pass


    #---------------------------------------------------------------
    @app.cli.command("setup-skillbank-data")
    def setup_skillbank_data():
        print("Creando usuarios iniciales de skillBank...")

        users_data = [
            {"name": "Benji", "email": "benji@skillbank.com"},
            {"name": "Miguelangel", "email": "miguelangel@skillbank.com"},
            {"name": "Crystian", "email": "crystian@skillbank.com"},
            {"name": "Andri", "email": "andri@skillbank.com"}
        ]

        users = []

        for u in users_data:
            user = User(
                name=u["name"],
                email=u["email"],
                wallet_credits=20,
                is_active=True
            )
            user.password = "password123"

            db.session.add(user)
            users.append(user)
        
        db.session.commit()

        print("Usuarios iniciales de skillBank creados exitosamente.")

        skills_examples = [
            ["Clase de React", "Mentoría de JavaScript"],
            ["Asesoría de cocina", "Recetas saludables"],
            ["Clases de inglés", "Conversación avanzada"],
            ["Entrenamiento personal", "Plan de nutrición"]
        ]

        for user, skills in zip(users, skills_examples):
            for skill_name in skills:
                skill = Skill(
                    title=skill_name,
                    description=f"Descripción de {skill_name}",
                    user_id=user.id
                )
                db.session.add(skill)

        db.session.commit()

        print("SkillBank inicializado con 4 usuarios y sus skills.")
