from transformers import Wav2Vec2Processor, Wav2Vec2ForCTC
import torch
from torchaudio.backend.sox_io_backend import load


def wav2Vector(wav: str) -> tuple[torch.Tensor, int]:
    data, sampleRate = load(wav)
    tensor = data[0]
    return tensor, sampleRate


def loadPretrainedModel(modelName: str):
    processor = Wav2Vec2Processor.from_pretrained(modelName)
    model = Wav2Vec2ForCTC.from_pretrained(modelName)
    return processor, model


def inferAudio2Text(tensor, sampleRate, model, processor):
    inputs = processor(
        tensor, sampling_rate=sampleRate, return_tensors="pt", padding=True
    ).input_values

    with torch.no_grad():
        logits = model(inputs).logits

    predicted_ids = torch.argmax(logits, dim=-1)
    transcription = processor.batch_decode(predicted_ids)

    return transcription


def speech2Text(wav: str):
    tensor, sampleRate = wav2Vector(wav)

    processor, model = loadPretrainedModel(
        # "jonatasgrosman/wav2vec2-large-xlsr-53-finnish"
        "aapot/wav2vec2-xlsr-1b-finnish-v2"
    )

    transcription = inferAudio2Text(tensor, sampleRate, model, processor)
    print(transcription)


speech2Text("test.wav")
