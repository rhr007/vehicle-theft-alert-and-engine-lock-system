from sqlmodel import SQLModel, Field

class User(SQLModel, table=True):
    __tablename__ = 'users'
    id: int = Field(default=None, primary_key=True)
    first_name: str = Field(default=None)
    last_name: str = Field(default=None)
    email: str = Field(index=True, unique=True)
    password: int
    is_active: bool = Field(default=False)
