# services/users/project/tests/test_user_model.py

import unittest

from project import db
from project.api.models import User
from project.tests.base import BaseTestCase
from project.tests.utils import add_user

# from sqlalchemy.exec import IntegrityError
from sqlalchemy import exc


class TestUserModel(BaseTestCase):

	def test_add_user(self):
		user = add_user('justatest', 'test@test.com')
		self.assertTrue(user.id)
		self.assertEqual(user.username, 'justatest')
		self.assertEqual(user.email, 'test@test.com')
		self.assertTrue(user.active)

	def test_add_user_duplicate_username(self):
		add_user('justatest', 'test@test.com')
		duplicate_user = User(
			username="justatest",
			email='test@test.com2'
		)
		db.session.add(duplicate_user)
		self.assertRaises(exc.IntegrityError, db.session.commit)

	def test_add_user_duplicate_email(self):
		add_user('justatest', 'test@test.com')
		duplicate_user = User(
			username="justatest2",
			email='test@test.com'
		)
		db.session.add(duplicate_user)
		self.assertRaises(exc.IntegrityError, db.session.commit)
		# with self.assertRaises(IntegrityError)
		# 	db.session.commit()

	def test_to_json(self):
		user = add_user('justatest', 'test@test.com')
		self.assertTrue(isinstance(user.to_json(), dict))


if __name__ == '__main__':
	unittest.main()
