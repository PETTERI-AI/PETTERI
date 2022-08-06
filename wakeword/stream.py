import pyaudio
import wave

RATE: int = 16000
CHUNK: int = 1024


class MicStream:
    """A simple audio stream from default input device."""

    def __init__(self):
        p = pyaudio.PyAudio()

        stream = p.open(
            format=pyaudio.paInt16,
            channels=1,
            rate=RATE,
            input=True,
            frames_per_buffer=CHUNK,
        )

        stream.stop_stream()

        self.p = p
        self.open = stream.start_stream
        self.close = stream.stop_stream
        self.frame = lambda: stream.read(CHUNK)

    def start(self):
        """Start capturing from stream."""
        self.open()

    def stop(self):
        """Stop capturing from stream."""
        self.close()

    def getFrame(self):
        """Get a one second frame of audio from the stream."""
        frames: list[bytes] = []

        for i in range(RATE // CHUNK):
            frame = self.frame()
            frames.append(frame)

        return frames

    def save2Wav(self, frames: list[bytes], filename: str):
        """Save a given list of frames to a WAV file."""
        wf = wave.open(filename, "wb")
        wf.setnchannels(1)
        wf.setsampwidth(self.p.get_sample_size(pyaudio.paInt16))
        wf.setframerate(RATE)
        wf.writeframes(b"".join(frames))
        wf.close()
