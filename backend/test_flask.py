from crypt import methods
import os
from flask import Flask, redirect, url_for, request
from flask_cors import CORS
import sqlite3



app = Flask(__name__)
CORS(app)                                           # cors error prohibit communication between different domain

def create_app(test_config = True):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY="dev",
        DATABASE=os.path.join(app.instance_path, "flaskr.sqlite"),
    )


@app.route("/")
def main():
    return {"id": "1", "title": "test", "proposer": "FM", "vote": 0, "content": "This is a test plan"}            # return json


@app.route("/addIdea", methods=["POST"])
def addIdea():
    if request.method == "POST":
        pass

@app.route('/success/<name>', methods = ["GET"])
def success(name):
    if request.method == "GET":
        # ideas = request.   request data from database
        return 'welcome %s' % name

@app.route('/login',methods = ['POST', 'GET'])
def login():
   if request.method == 'POST':
      user = request.form['name']
      return redirect(url_for('success', name = user))
   else:
      user = request.args.get('name')
      return redirect(url_for('success', name = user))

@app.route('/idea/vote', methods = ["GET", "POST"])
def trackVote():
    if request.method == "GET":
        # vote =                  get vote for cetain idea
        return "<p>vote: {}</p>"
    else:
        newVote = request.form["votes"]
        #                         change the data in database
        return f"vote: {newVote}"

@app.route("/<name>/ideas", methods = ["DELETE", "POST", "PUT", "GET"])
def getIdeas(name):
    #                 using name to find target user
    if request.method == "POST":
        #           put a new idea
        pass



if __name__ == "__main__":
    app.run(debug=True)
