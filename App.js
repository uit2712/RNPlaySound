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
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

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
    const [status, setStatus] = React.useState('play');
    const [speed, setSpeed] = React.useState(1);
    const [timeRate, setTimeRate] = React.useState(15); // seconds

    return (
        <View style={styles.container}>
            <Text style={styles.name}>Name:</Text>
            <View style={styles.changeAudio}>
                <TouchableOpacity onPress={() => {}}>
                    <FontAwesomeIcon
                        name='step-backward'
                        size={50}
                        color={'white'}
                    />
                </TouchableOpacity>
                <Image source={require('./images/nezuko.png')} style={styles.avatar}/>
                <TouchableOpacity onPress={() => {}} style={styles.button}>
                    <FontAwesomeIcon
                        name='step-forward'
                        size={50}
                        color={'white'}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.actionButtonsOther}>
                <TouchableOpacity onPress={() => {}} style={styles.button}>
                    <FontAwesomeIcon
                        name='rotate-left'
                        size={50}
                        color='white'
                    />
                    <Text style={{position:'absolute', alignSelf:'center', marginTop:1, color:'white', fontSize:12 }}>{timeRate}</Text>
                </TouchableOpacity>
                {
                    status === 'play' ?
                        <TouchableOpacity onPress={() => {}} style={{marginHorizontal:20}}>
                            <FontAwesomeIcon
                                name='pause'
                                color='white'
                                size={50}
                            />
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => {}} style={{marginHorizontal:20}}>
                            <FontAwesomeIcon
                                name='play'
                                color='white'
                                size={50}
                            />
                        </TouchableOpacity>
                }
                <TouchableOpacity onPress={() => {}} style={styles.button}>
                    <FontAwesomeIcon
                        name='rotate-right'
                        size={50}
                        color='white'
                    />
                    <Text style={{position:'absolute', alignSelf:'center', marginTop:1, color:'white', fontSize:12}}>{timeRate}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.progressBar}>
                <Text style={styles.progressBarText}>00:00:00</Text>
                <Slider
                    style={{width: '70%', height: 40}}
                    minimumValue={0}
                    maximumValue={100}
                    value={0}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="gray"
                    thumbTintColor='#FFFFFF'
                    onTouchStart={() => {}}
                    onTouchEnd={() => {}}
                    onSlidingComplete={(seconds) => {}}
                />
                <Text style={styles.progressBarText}>10:10:10</Text>
            </View>
            <View style={styles.speed}>
                {
                    listSpeedValues.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.speedItem}
                            onPress={() => setSpeed(item.value)}
                        >
                            <Text style={{
                                color: speed === item.value ? '#3399ff' : 'white'
                            }}>{item.text}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        backgroundColor:'black'
    },
    name: {
        color: 'white',
    },
    avatar: {
        width:200,
        height:200,
        alignSelf:'center',
        borderRadius: 100,
        margin: 15,
    },
    progressBar: {
        flexDirection: 'row',
        marginVertical:15,
        marginHorizontal:15,
    },
    progressBarText: {
        color: 'white',
        alignSelf: 'center',
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
    actionButtons: {
        
    },
    actionButtonsOther: {
        flexDirection:'row',
        justifyContent:'center',
        marginVertical:15,
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
    },
    changeAudio: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
    },
    button: {
        justifyContent: 'center',
    }
});

export default App;
