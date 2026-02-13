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
    wallet_credits: Mapped[int] = mapped_column(Integer, default=20, nullable=False) # 20 créditos por defecto
    is_active: Mapped[bool] = mapped_column(Boolean(), default=True)

    skills: Mapped[list["Skill"]] = relationship("Skill", back_populates="owner", cascade="all, delete-orphan")
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
    credits_per_hour: Mapped[int] = mapped_column(Integer, nullable=False)
    
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)
    owner: Mapped["User"] = relationship("User", back_populates="skills")

    def __repr__(self):
        return f'<Skill {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "credits_per_hour": self.credits_per_hour,
            "user_id": self.user_id
        }

class Exchange(db.Model):
    __tablename__ = 'exchange'
    
    id: Mapped[int] = mapped_column(primary_key=True)
    provider_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)
    receiver_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)
    skill_id: Mapped[int] = mapped_column(ForeignKey('skill.id'), nullable=False)
    
    credits_transferred: Mapped[int] = mapped_column(Integer, nullable=False)
    status: Mapped[str] = mapped_column(String(20), default="pending") 
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))

    # Relaciones
    provider: Mapped["User"] = relationship("User", foreign_keys=[provider_id], back_populates="provided_exchanges")
    receiver: Mapped["User"] = relationship("User", foreign_keys=[receiver_id], back_populates="received_exchanges")
    skill: Mapped["Skill"] = relationship("Skill") # AÑADIDO: Ahora acepta el argumento 'skill'

    def serialize(self):
        return {
            "id": self.id,
            "provider_name": self.provider.name,
            "receiver_name": self.receiver.name,
            "skill_title": self.skill.title,
            "credits_transferred": self.credits_transferred,
            "status": self.status,
            "created_at": self.created_at.isoformat()
        }