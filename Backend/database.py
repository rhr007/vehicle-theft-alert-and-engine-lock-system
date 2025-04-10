
from sqlmodel import Field, Session, SQLModel, create_engine, select

DB = f"sqlite:///database.db"

engine = create_engine(DB)

def get_db():
    with Session(engine) as session:
        yield session