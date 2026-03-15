from flask import Flask, jsonify, request
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


@app.route("/transactions", methods=["GET"])
def get_transactions():
    transactions = Transaction.query.order_by(Transaction.created_at.desc()).all()
    return jsonify([transaction.to_dict() for transaction in transactions])


@app.route("/transactions", methods=["POST"])
def add_transaction():
    data = request.get_json()

    transaction_type = data.get("type")
    amount = data.get("amount")
    category = data.get("category")
    description = data.get("description", "")
    date = data.get("date")

    if not transaction_type or transaction_type not in ["income", "expense"]:
        return jsonify({"error": "Type must be 'income' or 'expense'"}), 400

    if amount is None:
        return jsonify({"error": "Amount is required"}), 400

    try:
        amount = float(amount)
    except ValueError:
        return jsonify({"error": "Amount must be a number"}), 400

    if amount <= 0:
        return jsonify({"error": "Amount must be greater than 0"}), 400

    if not category:
        return jsonify({"error": "Category is required"}), 400

    if not date:
        return jsonify({"error": "Date is required"}), 400

    new_transaction = Transaction(
        type=transaction_type,
        amount=amount,
        category=category,
        description=description,
        date=date
    )

    db.session.add(new_transaction)
    db.session.commit()

    return jsonify(new_transaction.to_dict()), 201


@app.route("/summary", methods=["GET"])
def get_summary():
    transactions = Transaction.query.all()

    income = sum(t.amount for t in transactions if t.type == "income")
    expenses = sum(t.amount for t in transactions if t.type == "expense")
    balance = income - expenses

    return jsonify({
        "income": income,
        "expenses": expenses,
        "balance": balance
    })


if __name__ == "__main__":
    app.run(debug=True)