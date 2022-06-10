from flask_app.config.mysqlconnection import connectToMySQL
from flask import flash

class Show:
    def __init__(self, db_data):
        self.id = db_data['id']
        self.title = db_data['title']
        self.network = db_data['network']
        self.release_date = db_data['release_date']
        self.description = db_data['description']
        self.created_at = db_data['created_at']
        self.updated_at = db_data['updated_at']
        self.user_id = db_data['user_id']

    @staticmethod
    def validate_show(show):
        is_valid = True
        if len(show['title']) < 3:
            flash('Title must be at least 3 characters long')
            is_valid = False
        if len(show['network']) < 3:
            flash('Network must be at least 3 characters long')
            is_valid = False
        if len(show['release_date']) != 10:
            flash('Invalid Release Date')
            is_valid = False
        if len(show['description']) < 3:
            flash('Description must be at least 3 characters long')
            is_valid = False
        return is_valid


    @classmethod
    def save( cls , data ):
        query = "INSERT INTO shows ( title, network, release_date, description, created_at , updated_at, user_id ) VALUES (%(title)s, %(network)s, %(release_date)s, %(description)s, NOW(), NOW(), %(user_id)s);"
        return connectToMySQL('tv_shows_schema').query_db(query, data)

    @classmethod
    def update( cls, data):
        query = "UPDATE shows SET title = %(title)s, network = %(network)s, release_date = %(release_date)s, description = %(description)s, updated_at = NOW()  WHERE id = %(id)s;"
        return connectToMySQL('tv_shows_schema').query_db(query, data)

    @classmethod
    def delete( cls, data):
        query= "DELETE FROM shows WHERE id = %(id)s;"
        return connectToMySQL('tv_shows_schema').query_db(query, data)
    
    @classmethod
    def select_all(cls):
        query = "SELECT * FROM shows;"
        return connectToMySQL('tv_shows_schema').query_db(query)

    @classmethod
    def select_one(cls, data):
        query = "SELECT * FROM shows WHERE id = %(id)s;"
        return connectToMySQL('tv_shows_schema').query_db(query, data)
