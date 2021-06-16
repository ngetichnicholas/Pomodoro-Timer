from flask import Flask,render_template,request,session,redirect, url_for
from . import main

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
    return render_template('short_break.html', short_break=session["short_break"])
