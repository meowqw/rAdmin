from admin.views import AuthUser
from admin.models import *

new_Admin.add_view(AuthUser(Users, db.session, name='Пользователи'))
new_Admin.add_view(AuthUser(Objects, db.session, name='Объекты'))
new_Admin.add_view(AuthUser(Chats, db.session, name='Чаты'))
new_Admin.add_view(AuthUser(UserAdmin, db.session, name='Админ аккаунты'))
new_Admin.add_view(AuthUser(AccessKeys, db.session, name='Ключи'))