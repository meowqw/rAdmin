from admin import db, app
from flask import Flask, jsonify, render_template, url_for, request, redirect, flash, request
from admin.models import AccessKeys, Objects, Users, UserAdmin
from flask_login import login_user, login_required, logout_user

################# objects ###################

@app.route('/objects', methods=['POST', 'GET'])
@login_required
def objects_render():
    
    objects = Objects.query.all()
    return render_template('objects.html', objects=objects)

@app.route('/del/objects/<string:id>', methods=['POST', 'GET'])
@login_required
def del_objects(id):
    """del objects"""
    Objects.query.filter_by(id=id).delete()
    db.session.commit()

    return redirect(url_for('objects_render'))

################# users ####################

@app.route('/users', methods=['POST', 'GET'])
@login_required
def users_redner():
    
    users = Users.query.all()
    return render_template('users.html', users=users)



@app.route('/del/users/<string:id>', methods=['POST', 'GET'])
@login_required
def del_users(id):
    """del key"""
    AccessKeys.query.filter_by(user=id).delete()
    
    """del users"""
    Users.query.filter_by(id=id).delete()
    
    db.session.commit()

    return redirect(url_for('users_redner'))

################ keys #################

@app.route('/keys', methods=['POST', 'GET'])
@login_required
def keys_redner():
    
    """add key"""
    if request.method == "POST":
        db.session.add(AccessKeys(key=request.form['key']))

        db.session.commit()

        
        return redirect(url_for('keys_redner'))
    
    keys = AccessKeys.query.all()
    return render_template('keys.html', keys=keys)


@app.route('/del/keys/<string:id>', methods=['POST', 'GET'])
@login_required
def del_key(id):
    """del key"""
    AccessKeys.query.filter_by(id=id).delete()
    db.session.commit()

    return redirect(url_for('keys_redner'))

################# auth ##################

@app.route('/', methods=['POST', 'GET'])
def auth():
    """User authorization"""
    login = request.form.get('login')
    password = request.form.get('password')
    
    if login and password:
        user = UserAdmin.query.filter_by(login=login).first()
        
        if user.password == password:
            login_user(user)
            
            next = request.args.get('next')
            
            if next:
                return redirect(next)
            else:
                return redirect(url_for('objects_render'))
        else:
            flash('Login or password is not correct')
    else:
        flash('Enter login and pass')
    
    return render_template('authorization.html')


@app.route('/logout', methods=['POST', 'GET'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth'))
    


@app.after_request
def redirect_to_signin(response):
    """Redirect user without authorization"""
    if response.status_code == 401:
        return redirect(url_for('auth') + '?next=' + request.url)
    else:
        return response