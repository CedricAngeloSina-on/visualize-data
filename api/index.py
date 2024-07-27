from flask import Flask
app = Flask(__name__)

@app.route("/api/python")
def hello():
    return {
        "message": "Hello, World!",
        "test": "hello"
    }
    
@app.route("/api/python/<name>")
def test_name(name):
  return f"Hello {name}"