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
    TouchableOpacity,
    View,
} from 'react-native';
import SoundPlayer from 'react-native-sound';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useAudioHelper } from './helpers/audio-helper';

const listSpeedValues = [
    { value: 0.25, text: 'x0.25' },
    { value: 0.5, text: 'x0.5' },
    { value: 0.75, text: 'x0.75' },
    { value: 1.0, text: 'x1.0' },
    { value: 1.25, text: 'x1.25' },
    { value: 1.5, text: 'x1.5' },
    { value: 1.75, text: 'x1.75' },
];

function App() {
    const player = useAudioHelper({
        listSounds: [
            { path: 'blue_dream_cheel.mp3', mainBundle: SoundPlayer.MAIN_BUNDLE },
            { path: 'know_myself_patrick_patrikios.mp3', mainBundle: SoundPlayer.MAIN_BUNDLE },
        ],
        timeRate: 15,
    });

    function ProgressBar() {
        return (
            <View style={styles.progressBar}>
                <Text style={styles.progressBarText}>{player.currentTimeString}</Text>
                <Slider
                    style={{width: '70%', height: 40}}
                    minimumValue={0}
                    maximumValue={player.duration}
                    value={player.currentTime}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="gray"
                    thumbTintColor='#FFFFFF'
                    onTouchStart={() => player.pause()}
                    onTouchEnd={() => player.play()}
                    onValueChange={(seconds) => player.setCurrentTime(seconds)}
                />
                <Text style={styles.progressBarText}>{player.durationString}</Text>
            </View>
        )
    }

    function ListSpeedButtons() {
        return (
            <View style={styles.speed}>
                {
                    listSpeedValues.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.speedItem} onPress={() => player.setSpeed(item.value)}>
                            <Text style={styles.speedItemText}>{item.text}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }

    function ActionPauseOrPlay() {
        if (player.status === 'play') {
            return (
                <TouchableOpacity
                    style={styles.pauseOrPlayButton}
                    onPress={() => player.pause()}
                >
                    <FontAwesomeIcon
                        name='pause'
                        color='white'
                        size={50}
                    />
                </TouchableOpacity>
            )
        }

        return (
            <TouchableOpacity
                style={styles.pauseOrPlayButton}
                onPress={() => player.play()}
            >
                <FontAwesomeIcon
                    name='play'
                    color='white'
                    size={50}
                />
            </TouchableOpacity>
        )
    }

    function ActionButtons() {
        return (
            <View style={styles.actionButtons}>
                <AntDesignIcon
                    name='sound'
                    color='gray'
                    size={150}
                />
                <View style={styles.actionButtonsOther}>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            zIndex: 10,
                        }}
                        onPress={() => player.decreaseTime()}
                    >
                        <FontAwesomeIcon
                            style={{
                                zIndex: 10,
                            }}
                            name='rotate-left'
                            size={50}
                            color='white'
                        />
                        <Text style={{ position: 'absolute', color: 'white', left: 15, zIndex: 10, }}>{player.timeRate}</Text>
                    </TouchableOpacity>
                    <ActionPauseOrPlay/>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            zIndex: 10,
                        }}
                        onPress={() => player.increaseTime()}
                    >
                        <FontAwesomeIcon
                            style={{
                                zIndex: 10,
                            }}
                            name='rotate-right'
                            size={50}
                            color='white'
                        />
                        <Text style={{ position: 'absolute', color: 'white', left: 10, zIndex: 10, }}>{player.timeRate}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.name}>Name: {player.currentAudioName}</Text>
            <ActionButtons/>
            <ProgressBar/>
            <ListSpeedButtons/>
            <Button
                title='Play'
                onPress={() => player.play()}
                disabled={player.isDisabledButtonPlay}
            />
            <Button
                title='Pause'
                onPress={() => player.pause()}
                disabled={player.isDisabledButtonPause}/>
            <Button
                title='Stop'
                onPress={() => player.stop()}
                disabled={player.isDisabledButtonStop}/>
            <Button
                title='Next'
                onPress={() => player.next()}
                disabled={player.isDisabledButtonNext}
            />
            <Button
                title='Previous'
                onPress={() => player.previous()}
                disabled={player.isDisabledButtonPrevious}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
    },
    name: {
        color: 'white',
    },
    progressBar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressBarText: {
        color: 'white',
    },
    speed: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
    speedItem: {
        width: 50,
    },
    speedItemText: {
        color: 'white',
    },
    actionButtons: {
        width: '100%',
        alignItems: 'center',
    },
    actionButtonsOther: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    pauseOrPlayButton: {
        marginRight: 10,
        marginLeft: 10,
        width: 50,
    },
    actionButtonsOtherTimeDown: {
        // left: -35,
    },
    actionButtonsOtherTimeUp: {
        // width: 40,
    }
});

export default App;
