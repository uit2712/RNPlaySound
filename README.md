# React native sound
# Library and install
- React native sound: https://www.npmjs.com/package/react-native-sound
```
npm install react-native-sound --save
react-native link react-native-sound
```
- React native slider: https://www.npmjs.com/package/@react-native-community/slider
```
npm install @react-native-community/slider --save
```
- React native vector icons: https://github.com/oblador/react-native-vector-icons
```
npm install --save react-native-vector-icons
react-native link react-native-vector-icons
```
- React native vector icons directory (search icon name you want to use): https://oblador.github.io/react-native-vector-icons/
# Usage
## Android
### Load sound from the app bundle
- Copy your audio files into folder __/android/app/src/main/res/raw__ (if not exists, create it)
- Notice that your audio's name in __raw__ should be like this: _File-based resource names must contain only lowercase a-z, 0-9, or underscore_ or you will face this error in the future
### Load sound from the network
- Same as __Load sound from the app bundle__
### Load sound from other directories
- Instead of use __path__ like previous 2 types before, we use like this:
```javascript
path: require('./sounds/Play-Doh-meets-Dora_Carmen-Maria-and-Edu-Espinal.mp3')
```
- And when we create new sound, the second parameter is the __callback__, not the __basePath__
```javascript
if (currentAudio.isRequired === true) {
    const newPlayer = new SoundPlayer(require('./sounds/Play-Doh-meets-Dora_Carmen-Maria-and-Edu-Espinal.mp3'), (error) => callback(error, newPlayer));
    ...
}
...
```
# Reference
- React native sound: https://www.npmjs.com/package/react-native-sound
- React native sound demo: https://github.com/zmxv/react-native-sound-demo
- React native sound player preview: https://github.com/benevbright/react-native-sound-playerview
