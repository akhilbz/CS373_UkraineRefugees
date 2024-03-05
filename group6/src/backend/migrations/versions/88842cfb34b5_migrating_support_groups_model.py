"""Migrating Support Groups Model

Revision ID: 88842cfb34b5
Revises: 5681fcd40046
Create Date: 2024-03-05 07:53:34.068090

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '88842cfb34b5'
down_revision = '5681fcd40046'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('asylum_country_model',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('capital', sa.String(length=255), nullable=False),
    sa.Column('region', sa.String(length=255), nullable=False),
    sa.Column('population', sa.Integer(), nullable=False),
    sa.Column('languages', sa.String(length=255), nullable=False),
    sa.Column('flag', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('support_groups_model',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('location', sa.String(length=255), nullable=False),
    sa.Column('phn_no', sa.String(length=16), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('region', sa.String(length=255), nullable=False),
    sa.Column('website_url', sa.Text(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('country_model')
    with op.batch_alter_table('news_model', schema=None) as batch_op:
        batch_op.alter_column('published_at',
               existing_type=mysql.DATETIME(),
               type_=sa.String(length=255),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('news_model', schema=None) as batch_op:
        batch_op.alter_column('published_at',
               existing_type=sa.String(length=255),
               type_=mysql.DATETIME(),
               existing_nullable=False)

    op.create_table('country_model',
    sa.Column('id', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('capital', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('region', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('population', mysql.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('languages', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('flag', mysql.TEXT(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.drop_table('support_groups_model')
    op.drop_table('asylum_country_model')
    # ### end Alembic commands ###
