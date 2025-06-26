import gdown
from keras.models import load_model

def download_and_load_model():
    url = "https://drive.google.com/uc?export=download&id=1GEqdGiinY4xmP1uC70ULR0_O2NhtK0cY"
    output = "model.h5"
    gdown.download(url, output, quiet=False)
    model = load_model(output)
    return model

if __name__ == "__main__":
    model = download_and_load_model()
    print("Model downloaded and loaded successfully.")
