# How the screenshots and the demo GIF are made

The README media come from a real release build running on an Android emulator, captured by GitHub Actions. Nothing is mocked or drawn.

## Regenerate

```sh
gh workflow run capture.yml -R nhucsau1995/tendo-react-native --ref main
gh run list -R nhucsau1995/tendo-react-native --workflow capture.yml -L 1
gh run download <run-id> -R nhucsau1995/tendo-react-native -n capture -D capture-tmp/artifact
```

Then replace `screenshots/` with the artifact contents and commit.

## How it works

1. `.github/workflows/capture.yml` (manual dispatch) runs on `ubuntu-latest` with KVM: `npm ci`, `expo prebuild`, then a Gradle release build for x86_64 (production JS, no Metro, no dev menu).
2. It boots an API 34 Pixel 6 emulator (`reactivecircus/android-emulator-runner`) and runs `.github/scripts/capture-emulator.sh expo` as one command.
3. The script installs the APK and runs two Maestro flows that tap real `testID`s:
   - `.maestro/screenshots.yaml`: one still per key screen (`01-welcome` to `10-provider-mode`).
   - `.maestro/demo.yaml`: the paced walkthrough (sign in, cleaning, Maria, book, checkout, confirm, two simulated pro updates, chat, quick reply). Maestro records it with `startRecording` / `stopRecording`.
4. ffmpeg turns the recording into `screenshots/demo.gif` (palette pass, 12 fps, 300 px wide, at most 60 s). The run fails if there are fewer than 3 PNGs or no GIF.
5. The `capture` artifact holds the PNGs and the GIF; `maestro-debug` holds Maestro logs for a failed run.

## Local emulator

With an Android SDK and KVM:

```sh
npx expo prebuild --platform android --no-install
(cd android && ./gradlew assembleRelease -PreactNativeArchitectures=x86_64)
emulator -avd <avd> -no-window -gpu swiftshader_indirect &
bash .github/scripts/capture-emulator.sh expo
```
