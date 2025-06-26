import { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPrediction('');
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('Please upload an image');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error:', error);
      setPrediction('Error occurred. Try again.');
    }

    setLoading(false);
  };

  return (
  <div className="app-container">
  <div className="glass-card">
    <h1>Pneumonia Detection App</h1>
    
    <div className="upload-section">
      <label htmlFor="file-upload" className="file-upload-label">
        Choose X-ray Image
      </label>
      <input id="file-upload" type="file" onChange={handleFileChange} accept="image/*" />
    </div>

    <button onClick={handleSubmit} disabled={loading}>
      {loading ? 'Predicting...' : 'Predict'}
    </button>

    {prediction && (
      <div className="prediction-text">
        Prediction: <strong>{prediction}</strong>
      </div>
    )}
  </div>
</div>
);


}

export default App;  