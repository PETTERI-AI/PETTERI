from petteri.wakeword.stream import MicStream

stream = MicStream()
stream.start()

print("Recording...")

# Record 3 seconds of audio
frames = []
for i in range(3):
    frames += stream.getFrame()

stream.stop()
stream.save2Wav(frames, "test.wav")

print("Done!")
