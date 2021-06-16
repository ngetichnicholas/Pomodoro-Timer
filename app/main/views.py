from flask import Flask,render_template,request,session,redirect, url_for
from . import main
from flask_login import login_required,current_user
from ..models import User,Task
from .forms import UpdateProfile,TaskForm
from .. import db,photos
# Views
@main.route('/', methods=["GET","POST"])
def index():

    if request.method == 'POST':
        work = int(request.form["work"])
        short_break = int(request.form["short_break"])

        session["work"] = work
        session["short_break"] = short_break
        session["work_counter"] = 0

        return redirect(url_for("work"))

    '''
    View root page function that returns the index page and its data
    '''
    return render_template('index.html')

@main.route('/work')
def work():

    '''
    View root page function that returns the index page and its data
    '''
    return render_template('work.html')

@main.route('/short_break')
def short_break():

    '''
    View root page function that returns the index page and its data
    '''
    return render_template('index.html')

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
