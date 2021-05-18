# React native sound
# Table of content
- [Library and installation](#library-and-installation)
- [Usage](#usage)
  * [Load sound from the app bundle](#load-sound-from-the-app-bundle)
  * [Load sound from the network](#load-sound-from-the-network)
  * [Load sound from other directories](#load-sound-from-other-directories)
- [Steps](#steps)
  * [Step 1: Install all necessary libraries](#step-1-install-all-necessary-libraries)
  * [Step 2: Create audio-helper](#step-2-create-audio-helper)
    + [Step 2.1: Create interfaces and types](#step-21-create-interfaces-and-types)
    + [Step 2.2: Create hook useAudioHelper](#step-22-create-hook-useaudiohelper)
      + [Initialize sound player](#initialize-sound-player)
      + [Current time](#current-time)
      + [Initialize sound player every time we play new sound](#initialize-sound-player-every-time-we-play-new-sound)
      + [Play sound](#play-sound)
      + [Pause sound](#pause-sound)
      + [Stop sound](#stop-sound)
      + [Next sound](#next-sound)
      + [Previous sound](#previous-sound)
      + [Seek to time](#seek-to-time)
      + [Increase time](#increase-time)
      + [Decrease time](#decrease-time)
      + [Other functions](#other-functions)
# Library and installation
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
## Load sound from the app bundle
- Copy your audio files into folder __/android/app/src/main/res/raw__ (if not exists, create it)
- Notice that your audio's name in folder __raw__ should be like this: _File-based resource names must contain only lowercase a-z, 0-9, or underscore_ or you will face this error when run app
## Load sound from the network
- Same as __Load sound from the app bundle__
## Load sound from other directories
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
- Notice that your audio's name in this case should be like this: _File-based resource names must contain only lowercase a-z, 0-9, or underscore_ or you will face this error when run app
# Steps
## Step 1: Install all necessary libraries
## Step 2: Create audio-helper
### Step 2.1: Create interfaces and types 
- Create interface __ISoundFile__: used for create a list of sounds we will play
```javascript
interface ISoundFile {
    path: string | NodeRequire;
    basePath?: string;
    name: string;
    isRequired?: boolean;
}
```
- Create type __AudioStatusType__: when we play sound, there are many states such as: loading, error, play, pause, next, previous,...
```javascript
type AudioStatusType = 'loading' | 'success' | 'error' | 'play' | 'pause' | 'next' | 'previous' | 'stop';
```
- Create interface __IUseAudioHelper__ for next step: parameter of hook __useAudioHelper__
```javascript
interface IUseAudioHelper {
    listSounds: ISoundFile[];
    timeRate?: number;
}
```
### Step 2.2: Create hook useAudioHelper
Hook __useAudioHelper__ has all methods, values we need like: play, pause, currentTime,...
#### Create state variables:
```javascript
const [listSounds, setListSounds] = React.useState(request.listSounds);
const [timeRate, setTimeRate] = React.useState(request.timeRate || 15);
const [status, setStatus] = React.useState<AudioStatusType>('loading');
const [index, setIndex] = React.useState(0);
const [currentTime, setCurrentTime] = React.useState(0);
const [duration, setDuration] = React.useState(0);
```
#### Initialize sound player:
```javascript
const [duration, setDuration] = React.useState(0);
const [player, setPlayer] = React.useState<SoundPlayer>(null);
function playWithPlayer(player: SoundPlayer) {
    if (player) {
        player.play(playComplete);
        setStatus('play');
    }
}

function initialize() {
    setStatus('loading');
    if (listSounds.length > 0) {
        if (player) {
            player.release();
        }

        const callback = (error, player: SoundPlayer) => {
            if (error) {
                setStatus('error');
            } else {
                setStatus('success');
            }
            player.setSpeed(speed);
            setDuration(player.getDuration());
            playWithPlayer(player);
        }

        const currentAudio = listSounds[index];
        // If the audio is a 'require' then the second parameter must be the callback.
        if (currentAudio.isRequired === true) {
            const newPlayer = new SoundPlayer(currentAudio.path, (error) => callback(error, newPlayer));
            setPlayer(newPlayer);
        } else {
            const newPlayer = new SoundPlayer(currentAudio.path, currentAudio.basePath, (error) => callback(error, newPlayer));
            setPlayer(newPlayer);
        }
    }
}
```
#### Current time:
```javascript
const [currentTime, setCurrentTime] = React.useState(0);
React.useEffect(() => {
    const interval = setInterval(() => {
        if (player && status === 'play') {
            player.getCurrentTime((seconds: number) => {
                setCurrentTime(seconds);
            })
        }
    }, 100);

    return () => clearInterval(interval);
});
```
#### Initialize sound player every time we play new sound:
```javascript
const [index, setIndex] = React.useState(0);
React.useEffect(() => {
    initialize();
}, [index]);
```
#### Play sound
```javascript
function playComplete(isEnd: boolean) {
    if (isEnd === true) {
        next();
    }
}

function play() {
    if (player) {
        player.play(playComplete);
        setStatus('play');
    }
}
```
#### Pause sound
```javascript
function pause() {
    if (player) {
        player.pause();
        setStatus('pause');
    }
}
```
#### Stop sound
```javascript
function stop() {
    if (player) {
        player.stop();
        setStatus('stop');
    }
}
```
#### Next sound
```javascript
function next() {
    if (player && index < listSounds.length - 1) {
        player.release();
        setCurrentTime(0);
        setStatus('next');
        setIndex(index + 1);
    }
}
```
#### Previous sound
```javascript
function previous() {
    if (player && index > 0) {
        player.release();
        setCurrentTime(0);
        setStatus('previous');
        setIndex(index - 1);
    }
}
```
#### Seek to time
```javascript
function seekToTime(seconds: number) {
    if (player) {
        player.setCurrentTime(seconds);
        setCurrentTime(seconds);
    }
}
```
#### Increase time
```javascript
function increaseTime() {
    if (player) {
        player.getCurrentTime((seconds) => {
            if (seconds + timeRate < duration) {
                seekToTime(seconds + timeRate)
            } else {
                seekToTime(duration);
            }
        });
    }
}
```
#### Decrease time
```javascript
function decreaseTime() {
    if (player) {
        player.getCurrentTime((seconds) => {
            if (seconds - timeRate > 0) {
                seekToTime(seconds - timeRate);
            } else {
                seekToTime(0);
            }
        });
    }
}
```
#### Other functions:
```javascript
function formatTimeString(value: number) {
    return new Date(value * 1000).toISOString().substr(11, 8)
}

function getDurationString() {
    return formatTimeString(duration);
}

function getCurrentTimeString() {
    return formatTimeString(currentTime);
}

function getCurrentAudioName() {
    return listSounds[index].name;
}

function isDisabledButtonPlay() {
    return status === 'loading' || status === 'play';
}

function isDisabledButtonPause() {
    return status === 'loading' || status === 'pause' || status === 'stop';
}

function isDisabledButtonStop() {
    return status === 'loading' || status === 'stop';
}

function isDisabledButtonNext() {
    return status === 'loading' || index === listSounds.length - 1;
}

function isDisabledButtonPrevious() {
    return status === 'loading' || index === 0;
}
```
# Reference
## React native sound
Link: https://www.npmjs.com/package/react-native-sound
## React native sound demo
Link: https://github.com/zmxv/react-native-sound-demo
## React native sound player preview
Link: https://github.com/benevbright/react-native-sound-playerview
