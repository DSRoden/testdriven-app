"""${message}

Revision ID: ${up_revision}
Revises: ${down_revision | comma,n}
Create Date: ${create_date}

"""
from alembic import op
import sqlalchemy as sa
${imports if imports else ""}

# revision identifiers, used by Alembic.
revision = ${repr(up_revision)}
down_revision = ${repr(down_revision)}
branch_labels = ${repr(branch_labels)}
depends_on = ${repr(depends_on)}


def upgrade():
    # ${upgrades if upgrades else "pass"}
    op.add_column('users', sa.Column('password', sa.String(length=255)))
    op.execute('UPDATE users SET passowrd=email')
    op.alter_column('users', 'password', nullable=False)

def downgrade():
    ${downgrades if downgrades else "pass"}
