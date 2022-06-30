from flaskr import app

@app.route("/")
def greeting():
    return {"Name": ["Feiyang Ma", "V", "Google"]}
