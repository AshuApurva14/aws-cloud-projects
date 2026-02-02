import logging
from flask import Flask

app = Flask(__name__)

# Configure logging to file
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler()]  # Logs to stdout/stderr
)

@app.route("/")
def home():
    return "Hello from Flask App running on EC2 🚀"

@app.route("/health")
def health():
    return {"status": "UP"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
