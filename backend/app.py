from flask import Flask, jsonify, request
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

with open('products.json') as f:
    products = json.load(f)

@app.route('/')
def home():
    return "E-Commerce API Running"

# Get all products
@app.route('/products')
def get_products():
    return jsonify(products)

# Get single product
@app.route('/products/<int:id>')
def get_product(id):
    product = next((p for p in products if p["id"] == id), None)
    return jsonify(product)

# Get by category
@app.route('/products/category/<category>')
def get_category(category):
    filtered = [p for p in products if p["category"].lower() == category.lower()]
    return jsonify(filtered)

# Search
@app.route('/search')
def search():
    q = request.args.get("q", "")
    result = [p for p in products if q.lower() in p["name"].lower()]
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)