from flask import Blueprint, jsonify, request
from server.France24 import France24

server_blueprint = Blueprint('server_blueprint', __name__, url_prefix='/api')

@server_blueprint.route('/france24')
def index():
    try:
        query = request.args.get('q', None)
        welcome_page = France24()
        if (query == None):
            return jsonify({
                "response_status": 3200,
                "response_data": welcome_page.welcome_page()
            })
        else:
            return jsonify({
                "response_status": 3200,
                "response_data": query
            })
    except Exception as e:
        return jsonify({ "response_status": 3200, "response_text": str(e) })

