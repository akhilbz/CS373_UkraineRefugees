"""Updated NewsModel types

Revision ID: 880f7dfd2422
Revises: d7b29567daa9
Create Date: 2024-03-06 00:38:57.498391

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '880f7dfd2422'
down_revision = 'd7b29567daa9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('news_model', schema=None) as batch_op:
        batch_op.alter_column('title',
               existing_type=mysql.VARCHAR(length=255),
               type_=sa.Text(),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('news_model', schema=None) as batch_op:
        batch_op.alter_column('title',
               existing_type=sa.Text(),
               type_=mysql.VARCHAR(length=255),
               existing_nullable=False)

    # ### end Alembic commands ###
