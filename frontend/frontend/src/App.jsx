import { useState } from 'react';

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
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Pneumonia Detection App</h1>

      <input type="file" onChange={handleFileChange} />
      <br /><br />

      <button onClick={handleSubmit}>
        {loading ? 'Predicting...' : 'Predict'}
      </button>

      {prediction && (
        <div style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
          Prediction: <strong>{prediction}</strong>
        </div>
      )}
    </div>
  );
}

export default App;
