from admin import db, app
from flask import Flask, jsonify, render_template, url_for, request, redirect, flash, request
from admin.models import AccessKeys, Objects, Users, UserAdmin, Chats
from flask_login import login_user, login_required, logout_user
import yandex

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


@app.route('/objects/search', methods=['POST', 'GET'])
@login_required
def objects_search():
    """Search object"""
    search = request.form.get('search')
    objects_res = []
    if search:
        objects = Objects.query.all()
        for i in objects:
            obj_values = f"""{i.id}{i.user}
            {i.region}{i.city}{i.area}
            {i.address}{i.street}{i.rooms}{i.stage}
            {i.description}{i.price}{i.quadrature}
            {i.property_type}{i.ownership_type}{i.phone}"""
            if search in obj_values:
                objects_res.append(i)

    return render_template('objects.html', objects=objects_res)

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

@app.route('/users/search', methods=['POST', 'GET'])
@login_required
def users_search():
    """Search user"""
    search = request.form.get('search')
    users_res = []
    if search:
        users = Users.query.all()
        for i in users:
            users_values = f"""{i.id}{i.login}{i.fullname}{i.phone}{i.experience}
            {i.job}{i.region}{i.city}{i.key}"""
            if search in users_values:
                users_res.append(i)

    return render_template('users.html', users=users_res)


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

@app.route('/keys/search', methods=['POST', 'GET'])
@login_required
def keys_search():
    """Search key"""
    search = request.form.get('search')
    keys_res = []
    if search:
        keys = AccessKeys.query.all()
        for i in keys:
            keys_values = f"""{i.id}{i.key}{i.user}"""
            if search in keys_values:
                keys_res.append(i)

    return render_template('keys.html', keys=keys_res)


################ chats #################


@app.route('/chats', methods=['POST', 'GET'])
@login_required
def chats_redner():
    """add chat"""
    if request.method == "POST":
        
        # get correct region from yandex
        region = yandex.get_data(request.form['region'], 'region_city')['region']

        db.session.add(Chats(region=region, link=request.form['link']))

        db.session.commit()

        return redirect(url_for('chats_redner'))

    chats = Chats.query.all()
    return render_template('chats.html', chats=chats)


@app.route('/del/chats/<string:id>', methods=['POST', 'GET'])
@login_required
def del_chat(id):
    """del chat"""
    Chats.query.filter_by(id=id).delete()
    db.session.commit()

    return redirect(url_for('chats_redner'))

@app.route('/chats/search', methods=['POST', 'GET'])
@login_required
def chats_search():
    """Search chats"""
    search = request.form.get('search')
    chats_res = []
    if search:
        chats = Chats.query.all()
        for i in chats:
            chats_values = f"""{i.id}{i.region}{i.link}"""
            if search in chats_values:
                chats_res.append(i)

    return render_template('chats.html', chats=chats_res)



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
                return redirect('/admin')
            else:
                return redirect('/admin')
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
