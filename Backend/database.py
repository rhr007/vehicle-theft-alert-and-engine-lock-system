
from sqlmodel import Field, Session, SQLModel, create_engine, select

DB = f"sqlite:///database.db"

engine = create_engine(DB)