from flask import Flask, request
app = Flask(__name__)
import pandas as pd

@app.route("/api/upload_file", methods=["POST"])
def index():
  
    url = request.form['file_url']

    df = pd.read_csv(url, storage_options = {'User-Agent': 'Mozilla/5.0'})
    head = df.head()
    return head.to_json()