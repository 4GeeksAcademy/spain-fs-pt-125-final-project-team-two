from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Integer, ForeignKey, Text, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime, timezone

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    name: Mapped[str] = mapped_column(String(80), nullable=False)
    bio: Mapped[str] = mapped_column(Text, nullable=True)
    avatar_url: Mapped[str] = mapped_column(String(255), nullable=True)
    # Iniciamos con 10 créditos como incentivo (Estrategia de crecimiento)
    wallet_credits: Mapped[int] = mapped_column(Integer, default=10, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), default=True)

    # RELACIONES: Un usuario tiene muchas habilidades y muchos intercambios
    skills: Mapped[list["Skill"]] = relationship("Skill", back_populates="owner", cascade="all, delete-orphan")
    
    # Relaciones para el historial de transacciones (como proveedor y como receptor)
    provided_exchanges: Mapped[list["Exchange"]] = relationship("Exchange", foreign_keys="[Exchange.provider_id]", back_populates="provider")
    received_exchanges: Mapped[list["Exchange"]] = relationship("Exchange", foreign_keys="[Exchange.receiver_id]", back_populates="receiver")

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "bio": self.bio,
            "avatar_url": self.avatar_url,
            "wallet_credits": self.wallet_credits,
            "is_active": self.is_active,
            "skills": [skill.serialize() for skill in self.skills]
        }

class Skill(db.Model):
    __tablename__ = 'skill'
    
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    category: Mapped[str] = mapped_column(String(50), nullable=False) # Ej: 'Idiomas', 'Programación'
    credits_per_hour: Mapped[int] = mapped_column(Integer, nullable=False)
    
    # FK: Relación con el usuario que ofrece la habilidad
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)
    owner: Mapped["User"] = relationship("User", back_populates="skills")

    def __repr__(self):
        return f'<Skill {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "category": self.category,
            "credits_per_hour": self.credits_per_hour,
            "user_id": self.user_id
        }

class Exchange(db.Model):
    __tablename__ = 'exchange'
    
    id: Mapped[int] = mapped_column(primary_key=True)
    
    # Quién da el servicio
    provider_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)
    # Quién recibe el servicio
    receiver_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)
    # Qué habilidad se intercambió
    skill_id: Mapped[int] = mapped_column(ForeignKey('skill.id'), nullable=False)
    
    credits_transferred: Mapped[int] = mapped_column(Integer, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relaciones para facilitar consultas desde el objeto Exchange
    provider: Mapped["User"] = relationship("User", foreign_keys=[provider_id], back_populates="provided_exchanges")
    receiver: Mapped["User"] = relationship("User", foreign_keys=[receiver_id], back_populates="received_exchanges")

    def __repr__(self):
        return f'<Exchange {self.id}: {self.provider_id} -> {self.receiver_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "provider_name": self.provider.name,
            "receiver_name": self.receiver.name,
            "skill_title": self.skill.title if hasattr(self, 'skill') else "Skill deleted",
            "credits_transferred": self.credits_transferred,
            "created_at": self.created_at.isoformat()
        }