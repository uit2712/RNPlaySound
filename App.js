/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import Slider from '@react-native-community/slider';
import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    ToastAndroid,
    View,
} from 'react-native';
import SoundPlayer from 'react-native-sound';

const statuses = {
    loading: 0,
    success: 1,
    error: 2,
    play: 3,
    pause: 4,
    next: 5,
    previous: 6,
    stop: 7,
};

const listSoundFileNames = ['blue_dream_cheel.mp3', 'know_myself_patrick_patrikios.mp3'];

function App() {
    const [currentFileIndex, setCurrentFileIndex] = React.useState(0);
    React.useEffect(() => {
        initSoundPlayer(listSoundFileNames[currentFileIndex]);
    }, [currentFileIndex]);

    const [currentPlayer, setCurrentPlayer] = React.useState(new SoundPlayer(''));
    function initSoundPlayer(audioName = '') {
        if (!audioName) {
            return;
        }

        currentPlayer?.release();
        SoundPlayer.setCategory('Playback');
        let player = new SoundPlayer(listSoundFileNames[currentFileIndex], SoundPlayer.MAIN_BUNDLE, (error) => {
            if (error) {
                setAudioStatus(statuses.error);
            } else {
                setAudioStatus(statuses.success);
            }
            player?.setSpeed(1.5);
            setDuration(player.getDuration());
        });
        setCurrentPlayer(player);
    }

    const [audioStatus, setAudioStatus] = React.useState(statuses.loading);
    React.useEffect(() => {
        switch(audioStatus) {
            default: break;
            case statuses.loading:
                ToastAndroid.show('loading', ToastAndroid.SHORT);
                break;
            case statuses.success:
                setAudioStatus(statuses.play);
                break;
            case statuses.error:
                ToastAndroid.show(`Error when load audio: ${listSoundFileNames[currentFileIndex]}`, ToastAndroid.SHORT);
                break;
            case statuses.pause:
                currentPlayer?.pause(() => ToastAndroid.show('pause', ToastAndroid.SHORT));
                break;
            case statuses.play:
                play();
                break;
            case statuses.stop:
                currentPlayer?.stop(() => ToastAndroid.show('stop', ToastAndroid.SHORT));
                break;
            case statuses.next:
                if (currentFileIndex < listSoundFileNames.length - 1) {
                    currentPlayer?.release();
                    setCurrentFileIndex(currentFileIndex + 1);
                }
                break;
            case statuses.previous:
                if (currentFileIndex > 0) {
                    currentPlayer?.release();
                    setCurrentFileIndex(currentFileIndex - 1);
                }
                break;
        }
    }, [audioStatus]);

    const [currentTime, setCurrentTime] = React.useState(0);
    let tickInterval = null;
    function play() {
        if (tickInterval) {
            clearInterval(tickInterval);
        }

        tickInterval = setInterval(() => {
            currentPlayer?.getCurrentTime((seconds, isPlaying) => {
                if (isPlaying === true) {
                    setCurrentTime(seconds);
                }
            });
        }, 250);
        currentPlayer.play((isEnd) => {
            if (isEnd === true) {
                setAudioStatus(statuses.pause);
                setCurrentTime(duration);
            }
        });
    }

    function getCurrentTime() {
        if (currentPlayer) {
            return new Date(currentTime * 1000).toISOString().substr(11, 8);
        }

        return new Date(0).toISOString().substr(11, 8);
    }

    const [duration, setDuration] = React.useState(0); // seconds
    function getDuration() {
        if (currentPlayer) {
            return new Date(duration * 1000).toISOString().substr(11, 8);
        }

        return '';
    }

    return (
        <View style={styles.container}>
            <Text>Name: {listSoundFileNames[currentFileIndex]}</Text>
            <View style={styles.duration}>
                <Text style={styles.durationText}>{getCurrentTime()}</Text>
                <Slider
                    style={{width: '70%', height: 40}}
                    minimumValue={0}
                    maximumValue={duration}
                    value={currentTime}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    onTouchStart={() => setAudioStatus(statuses.pause)}
                    onTouchEnd={() => setAudioStatus(statuses.play)}
                    onSlidingComplete={(seconds) => currentPlayer?.setCurrentTime(seconds)}
                />
                <Text style={styles.durationText}>{getDuration()}</Text>
            </View>
            <Button title='Play' onPress={() => setAudioStatus(statuses.play)} disabled={audioStatus === statuses.play || audioStatus === statuses.loading}/>
            <Button title='Pause' onPress={() => setAudioStatus(statuses.pause)} disabled={audioStatus === statuses.pause || audioStatus === statuses.stop || audioStatus === statuses.loading}/>
            <Button title='Stop' onPress={() => setAudioStatus(statuses.stop)} disabled={audioStatus === statuses.stop || audioStatus === statuses.loading}/>
            <Button title='Next' onPress={() => setAudioStatus(statuses.next)} disabled={audioStatus === statuses.loading}/>
            <Button title='Previous' onPress={() => setAudioStatus(statuses.previous)} disabled={audioStatus === statuses.loading}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
    },
    duration: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    durationText: {
        color: 'white',
    }
});

export default App;
