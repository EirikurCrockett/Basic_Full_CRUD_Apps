from flask_app import app
from flask import render_template, redirect, request, session
from flask_app.models.show import Show
from flask_app.models.user import User

# ===========================================||===========================================
#                                   Page: User Dashboard
# ===========================================||===========================================
@app.route('/dashboard')
def dashboard():
    if(session.get('first_name') == None):
        return redirect('/')

    all_shows = Show.select_all()

    return render_template('dashboard.html', user_first_name = session['first_name'],  shows = all_shows)


# ===========================================||===========================================
#                                     Page: New Show
# ===========================================||===========================================
@app.route('/show/new')
def new_show():
    return render_template('new_show.html')

# ===========================================||===========================================
#                                     Page: Edit Show
# ===========================================||===========================================
@app.route('/show/edit/<int:id>')
def edit_show(id):
    data = {
        'id': id
    }
    show_info = Show.select_one(data)
    return render_template('edit_show.html', show = show_info[0])

# ===========================================||===========================================
#                                     Action: New Show
# ===========================================||===========================================
@app.route('/show/new/send', methods=['POST'])
def commit_new_show():
    data = {
        'title': request.form['title'],
        'network': request.form['network'],
        'release_date': request.form['release_date'],
        'description': request.form['description'],
        'user_id': session['user_id']
    }

    if not Show.validate_show(data):

        return redirect('/show/new')

    Show.save(data)
    return redirect('/dashboard')



# ===========================================||===========================================
#                                     Action: Edit Show
# ===========================================||===========================================
@app.route('/show/edit/send/<int:id>', methods=['POST'])
def commit_edit_show(id):
    data = {
        'id': id,
        'title': request.form['title'],
        'network': request.form['network'],
        'release_date': request.form['release_date'],
        'description': request.form['description'],
        'user_id': session['user_id']
    }

    if not Show.validate_show(data):

        return redirect('/dashboard')

    Show.update(data)
    return redirect('/dashboard')



# ===========================================||===========================================
#                                     Action: Edit Show
# ===========================================||===========================================
@app.route('/show/delete/<int:id>')
def delete_show(id):
    data = {
        'id' : id
    }

    Show.delete(data)
    return redirect('/dashboard')

# ===========================================||===========================================
#                                  Page: Display One Show
# ===========================================||===========================================
@app.route('/show/<int:id>')
def display_show(id):
    data = {
        'id': id
    }
    show_info = Show.select_one(data)[0]
    print(show_info)
    user_name = User.select_name_by_id({'id' :show_info['user_id']})[0]
    print(user_name)
    return render_template('one_show.html', show = show_info, user = user_name)

