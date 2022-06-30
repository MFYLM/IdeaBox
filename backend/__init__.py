from flask import Flask
"""
we should create virtual environment for backend since it will prevent changes on other apps affect current app

"""

app = Flask(__name__)

from flaskr import view