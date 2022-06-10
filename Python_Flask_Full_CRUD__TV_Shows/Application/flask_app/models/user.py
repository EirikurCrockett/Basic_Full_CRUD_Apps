from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash
import re


EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')

class User:
    def __init__(self, db_data):
        self.id = db_data['id']
        self.first_name = db_data['first_name']
        self.last_name = db_data['last_name']
        self.email = db_data['email']
        self.password = db_data['password']
        self.created_at = db_data['created_at']
        self.updated_at = db_data['updated_at']

    @staticmethod
    def validate_user(user):
        is_valid = True
        if len(user['first_name']) < 2:
            flash('First Name must be at least 2 characters long')
            is_valid = False

        if len(user['last_name']) < 2:
            flash('Last Name must be at least 2 characters long')
            is_valid = False

        if not EMAIL_REGEX.match(user['email']):
            flash('Please enter a valid email')
            is_valid = False

        if(User.get_by_email({'email': user['email']}) != False):
            flash('Email already in use, Please use a different Email')
            is_valid = False

        if len(user['password']) < 8:
            flash('Password must be at least 2 characters long')
            is_valid = False

        if len(user['password']) == user['confirm_password']:
            flash('Passwords need to match')
            is_valid = False

        return is_valid

    @classmethod
    def save( cls , data ):
        query = "INSERT INTO users ( first_name, last_name, email, password, created_at , updated_at ) VALUES (%(first_name)s, %(last_name)s, %(email)s, %(password)s, NOW(), NOW());"
        return connectToMySQL('tv_shows_schema').query_db(query, data)

    @classmethod
    def get_by_email(cls,data):
        query = "SELECT * FROM users WHERE email = %(email)s;"
        result = connectToMySQL('tv_shows_schema').query_db(query,data)

        if len(result) < 1:
            return False
        return cls(result[0])

    @classmethod
    def select_name_by_id(cls, data):
        query = "SELECT first_name, last_name FROM users WHERE id = %(id)s;"
        return connectToMySQL('tv_shows_schema').query_db(query, data)


