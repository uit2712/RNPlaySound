# React native sound
# Library link
react-native-sound: https://www.npmjs.com/package/react-native-sound
# Installation
First install the npm package from your app directory:
```
npm install react-native-sound --save
```
Then link it automatically using:
```
react-native link react-native-sound
```
# Usage
## Android
### Load sound from the app bundle
-Copy your audio files into folder __/android/app/src/main/res/raw__ (if not exists, create it). Notice that your audio's name in __raw__ should be like this: File-based resource names must contain only lowercase a-z, 0-9, or underscore or you will face this error in the future
### Load sound from the network
### Load sound from other directories
