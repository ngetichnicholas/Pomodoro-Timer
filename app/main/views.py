from flask import render_template, redirect, url_for,abort,request
from . import main
from flask_login import login_required,current_user
from ..models import User,Task
from .forms import UpdateProfile,TaskForm
from .. import db,photos
# Views
@main.route('/', methods=["GET","POST"])
def index():
    '''
    View root page function that returns the index page and its data
    '''
    return render_template('index.html')

@main.route('/user/<name>')
def profile(name):
    user = User.query.filter_by(username = name).first()
    user_id = current_user._get_current_object().id
    tasks = Task.query.filter_by(user_id = user_id).all()
    if user is None:
        abort(404)

    return render_template("profile/profile.html", user = user,tasks=tasks)

@main.route('/user/<name>/updateprofile', methods = ['POST','GET'])
@login_required
def updateprofile(name):
    form = UpdateProfile()
    user = User.query.filter_by(username = name).first()
    if user == None:
        abort(404)
    if form.validate_on_submit():
        user.bio = form.bio.data
        user.save_u()
        return redirect(url_for('.profile',name = name))
    return render_template('profile/update.html',form =form)

@main.route('/user/<name>/update/pic',methods= ['POST'])
@login_required
def update_pic(name):
    user = User.query.filter_by(username = name).first()
    if 'photo' in request.files:
        filename = photos.save(request.files['photo'])
        path = f'photos/{filename}'
        user.profile_pic_path = path
        db.session.commit()
    return redirect(url_for('main.profile',name=name))

@main.route('/timer')
def timer():

    '''
    View for timer page that returns the index page and its data
    '''

    return render_template('timer.html')

@main.route('/create_task', methods = ['POST','GET'])
@login_required
def create_task():
    form = TaskForm()
    if form.validate_on_submit():
        title = form.title.data
        task = form.task.data
        user_id = current_user
        new_task_object = Task(task=task,user_id=current_user._get_current_object().id,title=title)
        new_task_object.save_p()
        return redirect(url_for('main.index'))
        
    return render_template('save_task.html', form = form)
