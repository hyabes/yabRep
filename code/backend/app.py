# HECTOR YABES
# yab3.dev
# app.py

from flask import Flask                  # web framework
from flask_sqlalchemy import SQLAlchemy  # database ORM
from flask_cors import CORS              # security
from sqlalchemy import text              # raw SQL queries
import os                                # environment vars
from dotenv import load_dotenv           # reads .env

load_dotenv()

app = Flask(__name__)
CORS(app, origins=['https://yab3.dev'])

# Database
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

@app.route('/')
def home():
    return 'Flask: Success'

@app.route('/api/health')
def health():
    try:
        db.session.execute(text('SELECT 1'))
        postgres_ok = True
    except:
        postgres_ok = False

    return {'flask': True, 'postgres': postgres_ok}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
