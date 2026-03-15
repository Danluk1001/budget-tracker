from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///budget.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(10), nullable=False)  # income or expense
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    date = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type,
            "amount": self.amount,
            "category": self.category,
            "description": self.description,
            "date": self.date,
            "created_at": self.created_at.isoformat()
        }


@app.route("/")
def home():
    return jsonify({"message": "Budget Tracker backend is running!"})


@app.route("/init-db")
def init_db():
    with app.app_context():
        db.create_all()
    return jsonify({"message": "Database initialized successfully!"})


if __name__ == "__main__":
    app.run(debug=True)