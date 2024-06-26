"""Add country model

Revision ID: 5681fcd40046
Revises: 
Create Date: 2024-03-05 00:00:56.610683

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '5681fcd40046'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('country_model',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('capital', sa.String(length=255), nullable=False),
    sa.Column('region', sa.String(length=255), nullable=False),
    sa.Column('population', sa.Integer(), nullable=False),
    sa.Column('languages', sa.String(length=255), nullable=False),
    sa.Column('flag', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('news_model', schema=None) as batch_op:
        batch_op.alter_column('image_url',
               existing_type=mysql.VARCHAR(length=255),
               type_=sa.Text(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('news_model', schema=None) as batch_op:
        batch_op.alter_column('image_url',
               existing_type=sa.Text(),
               type_=mysql.VARCHAR(length=255),
               existing_nullable=True)

    op.drop_table('country_model')
    # ### end Alembic commands ###
