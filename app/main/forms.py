from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextAreaField, SubmitField
from wtforms.validators import Required

class UpdateProfile(FlaskForm):
    bio = TextAreaField('Write a brief bio about you.',validators = [Required()])
    submit = SubmitField('Save')

class TaskForm(FlaskForm):
    title = StringField('Title', validators=[Required()])
    task = TextAreaField('Work Session Description', validators=[Required()])
    submit = SubmitField('Save')


