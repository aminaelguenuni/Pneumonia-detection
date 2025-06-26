from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
from download_model import download_and_load_model


app = Flask(__name__)
CORS(app)


model = download_and_load_model()



def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    image = image.resize((224, 224))  
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    image_bytes = file.read()
    processed_image = preprocess_image(image_bytes)
    
    prediction = model.predict(processed_image)
    result = "Pneumonia" if prediction[0][0] > 0.5 else "Normal"

    return jsonify({'prediction': result})

if __name__ == '__main__':
    app.run(debug=True)
