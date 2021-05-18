import SoundPlayer from 'react-native-sound';
import React from 'react';

interface ISoundFile {
    path: string;
    mainBundle: string;
}

export type AudioStatusType = 'loading' | 'success' | 'error' | 'play' | 'pause' | 'next' | 'previous' | 'stop';

interface IUseAudioHelper {
    listSounds: ISoundFile[];
    timeRate?: number;
}

export function useAudioHelper(request: IUseAudioHelper) {
    const [listSounds, setListSounds] = React.useState(request.listSounds);
    const [timeRate, setTimeRate] = React.useState(request.timeRate || 15);
    const [status, setStatus] = React.useState<AudioStatusType>('loading');
    const [index, setIndex] = React.useState(0);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);

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

    const [speed, setSpeed] = React.useState(1);
    React.useEffect(() => {
        if (player) {
            player.setSpeed(speed);
        }
    }, [speed]);

    const [player, setPlayer] = React.useState<SoundPlayer>(null);
    function initialize() {
        setStatus('loading');
        if (listSounds.length > 0) {
            if (player) {
                player.release();
            }
            const newPlayer = new SoundPlayer(listSounds[index].path, listSounds[index].mainBundle, (error) => {
                if (error) {
                    setStatus('error');
                } else {
                    setStatus('success');
                }
                setDuration(newPlayer.getDuration());
                playWithPlayer(newPlayer);
            });
            setPlayer(newPlayer);
        }
    }
    React.useEffect(() => {
        initialize();
    }, [index]);

    function playComplete(isEnd: boolean) {
        if (isEnd === true) {
            next();
        }
    }

    function playWithPlayer(player: SoundPlayer) {
        if (player) {
            player.play(playComplete);
            setStatus('play');
        }
    }

    function play() {
        if (player) {
            player.play(playComplete);
            setStatus('play');
        }
    }

    function pause() {
        if (player) {
            player.pause();
            setStatus('pause');
        }
    }

    function stop() {
        if (player) {
            player.stop();
            setStatus('stop');
        }
    }

    function next() {
        if (player && index < listSounds.length - 1) {
            player.release();
            setStatus('next');
            setIndex(index + 1);
        }
    }

    function previous() {
        if (player && index > 0) {
            player.release();
            setStatus('previous');
            setIndex(index - 1);
        }
    }

    function increaseTime() {
        if (player) {
            player.getCurrentTime((seconds) => {
                if (seconds + timeRate < duration) {
                    player.setCurrentTime(seconds + timeRate);
                    setCurrentTime(seconds + timeRate);
                } else {
                    player.setCurrentTime(duration);
                    setCurrentTime(duration);
                }
            });
        }
    }

    function decreaseTime() {
        if (player) {
            player.getCurrentTime((seconds) => {
                if (seconds - timeRate > 0) {
                    player.setCurrentTime(seconds - timeRate);
                    setCurrentTime(seconds - timeRate);
                } else {
                    player.setCurrentTime(0);
                    setCurrentTime(0);
                }
            });
        }
    }

    function seekToTime(seconds: number) {
        if (player) {
            player.setCurrentTime(seconds);
            setCurrentTime(seconds);
        }
    }

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
        return listSounds[index].path;
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

    return {
        status,
        duration,
        currentTime,
        play,
        pause,
        stop,
        next,
        previous,
        increaseTime,
        decreaseTime,
        durationString: getDurationString(),
        currentTimeString: getCurrentTimeString(),
        currentAudioName: getCurrentAudioName(),
        isDisabledButtonPlay: isDisabledButtonPlay(),
        isDisabledButtonPause: isDisabledButtonPause(),
        isDisabledButtonStop: isDisabledButtonStop(),
        isDisabledButtonNext: isDisabledButtonNext(),
        isDisabledButtonPrevious: isDisabledButtonPrevious(),
        seekToTime,
        timeRate,
        speed,
        setSpeed,
    }
}