"""add categories and product images

Revision ID: 20260715193946
Revises: eb87120cb2ff
Create Date: 2026-07-15 16:39:46.302097544

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID, ENUM

# revision identifiers, used by Alembic.
revision: str = '20260715193946'
down_revision: Union[str, None] = 'eb87120cb2ff'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    # Create enum type for product status
    op.execute("CREATE TYPE productstatus AS ENUM ('active', 'inactive', 'draft')")
    
    # Create categories table
    op.create_table('categories',
        sa.Column('id', UUID(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('slug', sa.String(), nullable=False),
        sa.Column('description', sa.String(), nullable=True),
        sa.Column('parent_id', UUID(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['parent_id'], ['categories.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_categories_id'), 'categories', ['id'], unique=False)
    op.create_index(op.f('ix_categories_name'), 'categories', ['name'], unique=False)
    op.create_index(op.f('ix_categories_slug'), 'categories', ['slug'], unique=True)
    
    # Create product_images table
    op.create_table('product_images',
        sa.Column('id', UUID(), nullable=False),
        sa.Column('product_id', UUID(), nullable=False),
        sa.Column('image_url', sa.String(), nullable=False),
        sa.Column('is_cover', sa.Boolean(), nullable=True, server_default='false'),
        sa.Column('order', sa.Integer(), nullable=True, server_default='0'),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_product_images_id'), 'product_images', ['id'], unique=False)
    
    # Add status and category_id to products
    op.add_column('products', sa.Column('status', ENUM('active', 'inactive', 'draft', name='productstatus'), nullable=True, server_default='draft'))
    op.add_column('products', sa.Column('category_id', UUID(), nullable=True))
    op.create_foreign_key('fk_products_category_id', 'products', 'categories', ['category_id'], ['id'])
    
    # Make name and price non-nullable (if not already)
    op.alter_column('products', 'name', nullable=False)
    op.alter_column('products', 'price', nullable=False)
    op.alter_column('products', 'created_by', nullable=False)

def downgrade() -> None:
    # Remove columns and tables in reverse order
    op.drop_constraint('fk_products_category_id', 'products', type_='foreignkey')
    op.drop_column('products', 'category_id')
    op.drop_column('products', 'status')
    op.drop_table('product_images')
    op.drop_table('categories')
    op.execute("DROP TYPE productstatus")
