from flask import Blueprint, render_template

client_blueprint = Blueprint('client_blueprint', __name__, template_folder='layout', static_folder='js', static_url_path='/static/web')


@client_blueprint.route("/")
def index():
    return render_template("app.html", app_env='production')

