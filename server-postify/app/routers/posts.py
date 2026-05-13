from typing import List

from fastapi import APIRouter, Depends
from app.db.session import get_session
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from app.schemas.post import PostCreate, PostRead
from app.models.post import Post

router = APIRouter(prefix="/posts", tags=["posts"])

@router.get('/', response_model=List[PostRead])
async def get_posts(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Post))
    return result.scalars().all()

@router.post('/', response_model=PostCreate, status_code=201)
async def create_post(data: PostCreate, session: AsyncSession = Depends(get_session)):
    user = Post(**data.model_dump())
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user
