from petteri.wakeword.stream import MicStream

stream = MicStream()
stream.start()

frames: list[bytes] = []
try:
    print("Recording...")
    while True:
        frames += stream.getFrame()
except KeyboardInterrupt:
    stream.stop()
    stream.save2Wav(frames, "test.wav")

print("Saved recording to test.wav!")
