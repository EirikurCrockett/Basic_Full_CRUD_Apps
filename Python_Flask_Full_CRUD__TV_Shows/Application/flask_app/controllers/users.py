from flask_app import app
from flask import render_template, redirect, request, session, flash
from flask_app.models.user import User
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)

# ===========================================||===========================================
#                               Page: Login and Registration
# ===========================================||===========================================
@app.route('/')
def index():
    if(session.get('first_name') != None):
        return redirect('/dashboard')

    return render_template('index.html')

# ===========================================||===========================================
#                                   Action: Register User
# ===========================================||===========================================
@app.route('/register', methods=['POST'])
def register():

    user = {
        'first_name': request.form['first_name'],
        'last_name': request.form['last_name'],
        'email': request.form['email'],
        'password': request.form['password'],
        'confirm_password': request.form['confirm_password']
    }

    if not User.validate_user(user):

        return redirect('/')

    pw_hash = bcrypt.generate_password_hash(request.form['password'])

    data = {
        'first_name': request.form['first_name'],
        'last_name': request.form['last_name'],
        'email': request.form['email'],
        'password': pw_hash
    }
    User.save(data)

    return redirect('/')

# ===========================================||===========================================
#                                    Action: Login User
# ===========================================||===========================================
@app.route('/login', methods=['POST'])
def login():
    data = {'email': request.form['email']}
    user = User.get_by_email(data)
    if not user:
        flash('Invalid Email/Password')
        return redirect('/')

    if not bcrypt.check_password_hash(user.password, request.form['password']):
        flash('Invalid Email/Password')
        return redirect('/')
    
    session['user_id'] = user.id
    session['first_name'] = user.first_name
    session['last_name'] = user.last_name
    session['email'] = user.email
    return redirect('/dashboard')

# ===========================================||===========================================
#                                   Action: Logout User
# ===========================================||===========================================
@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')
