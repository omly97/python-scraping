from flask import Flask, jsonify
from flask_cors import CORS
from server.blueprint import server_blueprint
from client.blueprint import client_blueprint

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False
cors = CORS(app, resources={r"/*": {"origins": "*",}})

app.register_blueprint(server_blueprint)
app.register_blueprint(client_blueprint)


