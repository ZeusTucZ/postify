from app.db.session import engine
from sqlmodel import SQLModel
from app import models  # noqa: F401


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
