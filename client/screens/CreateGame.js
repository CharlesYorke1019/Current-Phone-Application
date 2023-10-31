import { StyleSheet, Text, View, LogBox, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import GoHomeButton from '../Components/GoHomeButton';
import ProfileButton from '../Components/ProfileButton';

const CreateGame = ({route}) => {

    // Variables //

    const navigation = useNavigation();
    let user = route.params.paramKey

    let [activeButton, setActiveButton] = useState(0);
    let [chipUnits, setChipUnits] = useState(2);
    let [useATimer, setUseATimer] = useState(false)
    let [progressiveBlinds, setProgressiveBlinds] = useState(false)
    let [gameStyle, setGameStyle] = useState('Cash')
    let [infoSection, setInfoSection] = useState(false);
    let [ante, setAnte] = useState(0);
    let anteInputHolder;
    let [svScrollable, setSVScrollable] = useState(true);
    let [bbMinRangeInput, setBBMinRangeInput] = useState(10);
    let [bbMaxRangeInput, setBBMaxRangeInput] = useState(40);

    //////////////////////////////////////////////////////////////////

    // Functions //

    user.changeCurrentPage('CreateGame');

    const setBBRange = (v1, v2) => {
        setBBMinRangeInput(v1);
        setBBMaxRangeInput(v2)

        setSVScrollable(false)
    }

    const relativeChipUnits = () => {
        if (ante != 0) {
            let anteStr = ante.toString();
            if (anteStr.includes('.')) {
                setChipUnits(.01);
            } else {
                setChipUnits(1);
            }
        }
    }

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const setRoomSize = (n) => {
        setActiveButton(n);
    }

    const setAnteInput = (v) => {
        setAnte(v)
    }

    const setChipUnitsInput = (v) => {
        setChipUnits(v)
    }

    const setScrollable = (v) => {
        setSVScrollable(v)
    }

    const setGameStyleInput = (v) => {
        setGameStyle(v)
    }   

    const setTimerInput = (v) => {
        setUseATimer(v)
    }

    const setProgressiveBlindInput = (v) => {
        setProgressiveBlinds(v);
    }

    //////////////////////////////////////////////////////////////////

    // User Socket On's //

    user.socket.on('gameStateCreated', () => {
        navigation.navigate('PlayerInGameDisplays', {
            paramKey: user,
        })
    })

    //////////////////////////////////////////////////////////////////

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 8, borderRadius: 10, borderColor: 'lightgrey', backgroundColor: 'mistyrose', height: '100%', width: '100%'}}>
            <ProfileButton sentU={user} />
            <GoHomeButton user={user} />

            <TouchableOpacity style={{borderWidth: 2, borderColor: 'black', position: 'absolute', top: 65, backgroundColor: 'lavender', borderRadius: '50%', height: 30, width: 30, left: 35, alignSelf: 'center'}}
                onPress={() => setInfoSection(true)}
            >
                <Text style={{textAlign: 'center', fontFamily: 'Copperplate', lineHeight: 28, fontSize: 18}}>?</Text>
            </TouchableOpacity>

            <View style={{display: infoSection === true ? 'flex' : 'none', width: '90%', height: '90%', borderWidth: 3, backgroundColor: 'papayawhip', zIndex: 1, borderRadius: 5}}>
                <TouchableOpacity style={{borderBottomWidth: 3, backgroundColor: 'lavender', marginBottom: 20}}
                    onPress={() => setInfoSection(false)}
                >
                    <Text style={{fontFamily: 'Copperplate', textAlign: 'center', lineHeight: 40, fontSize: 20}}>X</Text>
                </TouchableOpacity>

                <ScrollView>
                <View>
                    <Text style={{alignSelf: 'center', fontSize: 26, marginBottom: 5, fontFamily: 'Copperplate'}}>Table Size</Text>
                    <Text style={{textAlign: 'center', marginBottom: 15, fontFamily: 'Copperplate', fontSize: 16}}>Choose the number of players playing at the table</Text>
                    <Text style={{alignSelf: 'center', fontSize: 26, marginBottom: 5, fontFamily: 'Copperplate'}}>Ante</Text>
                    <Text style={{textAlign: 'center', marginBottom: 15, fontFamily: 'Copperplate', fontSize: 16}}>Choose the ante the table will be playing with. The small blind ante will be half of the ante entered</Text>
                    <Text style={{alignSelf: 'center', fontSize: 26, marginBottom: 5, fontFamily: 'Copperplate'}}>Chip Units</Text>
                    <Text style={{textAlign: 'center', marginBottom: 15, fontFamily: 'Copperplate', fontSize: 16}}>Helps us with the chip increments for players</Text>
                    <Text style={{alignSelf: 'center', fontSize: 26, marginBottom: 5, fontFamily: 'Copperplate'}}>Buy-in Range</Text>
                    <Text style={{textAlign: 'center', marginBottom: 15, fontFamily: 'Copperplate', fontSize: 16}}>Sets a range in which players can buy in (ante * blind ranges)</Text>
                    <Text style={{alignSelf: 'center', fontSize: 26, marginBottom: 5, fontFamily: 'Copperplate'}}>Game Style</Text>
                    <Text style={{textAlign: 'center', marginBottom: 15, fontFamily: 'Copperplate', fontSize: 16}}>Choose between cash game and tournament style play. Cash play will allow for player to re-buy, where a tournament style game will not allow re-buys and will end when there is one winner (or if the table chooses differently)</Text>
                    <Text style={{alignSelf: 'center', fontSize: 26, marginBottom: 5, fontFamily: 'Copperplate'}}>Timer</Text>
                    <Text style={{textAlign: 'center', marginBottom: 15, fontFamily: 'Copperplate', fontSize: 16}}>Choose whether players have a time limit on their actions (pre set timer is 30 seconds per turn)</Text>
                    <Text style={{alignSelf: 'center', fontSize: 26, marginBottom: 5, fontFamily: 'Copperplate'}}>Progressive Blinds</Text>
                    <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 16}}>Choose whether blinds will progressively increase over time. If enabled, blinds will double each time the the progressive blinds timer hits.</Text>
                </View>

                <View style={{marginBottom: 80}}></View>
                </ScrollView>

            </View>

            <TouchableOpacity style={{alignContent: 'center', alignSelf: 'center', borderWidth: 2, borderRadius: 5, borderColor: 'black', backgroundColor: 'lavender', position: 'absolute', top: 750}}
                onPress={() => user.socket.emit('newGame', activeButton, ante, useATimer, gameStyle, progressiveBlinds, bbMinRangeInput, bbMaxRangeInput, chipUnits, user.creatingGameMethod, user.groupMembersGameArr)}
            >
                <Text style={{fontFamily: 'Copperplate', fontSize: 28, marginRight: 5, marginLeft: 5}}>Next</Text>
            </TouchableOpacity>

            <ScrollView style={{alignSelf: 'center', width: '90%', height: '75%', borderWidth: 3, borderRadius: 5, borderColor: 'black', position: 'absolute', top: '13%'}}  contentContainerStyle={{justifyContent: 'center', alignItems: 'center', padding: 10}} scrollEnabled={svScrollable} scrollsToTop={false} showsVerticalScrollIndicator={false}>

            
            <View style={{borderWidth: 4, borderRadius: 5, width: '100%', position: 'absolute', top: 0, backgroundColor: 'papayawhip', marginTop: '3%'}}>
                <Text style={{fontSize: 30, alignSelf: 'center', marginBottom: 10, fontFamily: 'Copperplate'}}>Choose Table Size</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 5}}>
        
                    <TouchableOpacity style={{borderWidth: 2, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 2 ? 'lightcoral' : 'lavender', borderRadius: 5, marginRight: 5}} 
                        onPress={() => setRoomSize(2)}
                    >
                        <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28}}>2</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{borderWidth: 2, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 3 ? 'lightcoral' : 'lavender', borderRadius: 5, marginRight: 5}}
                        onPress={() => setRoomSize(3)}
                    >
                        <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28}}>3</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{borderWidth: 2, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 4 ? 'lightcoral' : 'lavender', borderRadius: 5, marginRight: 5}}
                        onPress={() => setRoomSize(4)}
                    >
                        <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28}}>4</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{borderWidth: 2, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 5 ? 'lightcoral' : 'lavender', borderRadius: 5, marginRight: 5}}
                        onPress={() => setRoomSize(5)}
                    >
                        <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28}}>5</Text>
                    </TouchableOpacity>

                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: '6%'}}>
                    <TouchableOpacity style={{borderWidth: 2, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 6 ? 'lightcoral' : 'lavender', borderRadius: 5, marginRight: 5}}
                        onPress={() => setRoomSize(6)}
                    >
                        <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28}}>6</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{borderWidth: 2, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 7 ? 'lightcoral' : 'lavender', borderRadius: 5, marginRight: 5}}
                        onPress={() => setRoomSize(7)}
                    >
                        <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28}}>7</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{borderWidth: 2, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 8 ? 'lightcoral' : 'lavender', borderRadius: 5, marginRight: 5}}
                        onPress={() => setRoomSize(8)}
                    >
                        <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28}}>8</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{borderWidth: 2, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 9 ? 'lightcoral' : 'lavender', borderRadius: 5, marginRight: 5}}
                        onPress={() => setRoomSize(9)}
                    >
                        <Text style={{fontFamily: 'Copperplate', textAlign: 'center', fontSize: 28}}>9</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{alignContent: 'center', position: 'absolute', top: '18%', borderWidth: 4, borderRadius: 5, width: '100%', backgroundColor: 'papayawhip'}}>
                <Text style={{fontSize: 30, marginBottom: 15, alignSelf: 'center', fontFamily: 'Copperplate'}}>Choose The Ante</Text>
                <View style={{width: 100, alignSelf: 'center', marginBottom: 10}}>
                    <TextInput 
                        value={anteInputHolder}
                        onChangeText={(anteInput) => setAnteInput(Number(anteInput))}
                        onEndEditing={() => relativeChipUnits()}
                        style={{backgroundColor: 'lavender', borderWidth: 2, borderRadius: 5, borderColor: 'black', textAlign: 'center', height: 25}}
                        keyboardType='numeric'
                        placeholder='enter here'
                    />
                </View>

            </View>

            <View style={{alignContent: 'center', alignItems: 'center', position: 'absolute', top: '29.5%', borderWidth: 4, borderRadius: 5, width: '100%', backgroundColor: 'papayawhip'}}>
                <Text style={{fontSize: 30, marginBottom: 10, alignSelf: 'center', fontFamily: 'Copperplate'}}>Chip Units</Text>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <TouchableOpacity style={{borderWidth: 2, marginBottom: 10, borderRadius: 5, backgroundColor: chipUnits === 1 ? 'lightcoral' : 'lavender', width: 60, height: 40, alignItems: 'center', justifyContent: 'center', marginRight: 15}}
                        onPress={() => setChipUnitsInput(1)}
                    >
                        <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 20}}>1</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{borderWidth: 2, borderRadius: 5, backgroundColor: chipUnits === .01 ? 'lightcoral' : 'lavender', width:60, height: 40, alignItems: 'center', justifyContent: 'center'}}
                        onPress={() => setChipUnitsInput(.01)}
                    >
                        <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 20}}>.01</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={{alignContent: 'center', alignItems: 'center', position: 'absolute', top: '42.5%', borderWidth: 4, borderRadius: 5, width: '100%', backgroundColor: 'papayawhip'}}>
                <Text style={{fontSize: 30, marginBottom: 7, alignSelf: 'center', fontFamily: 'Copperplate', marginTop: 5}}>Buy In Range</Text>
                <Text style={{fontSize: 16, marginBottom: 10, alignSelf: 'center', fontFamily: 'Copperplate'}}>{bbMinRangeInput} BB - {bbMaxRangeInput} BB ({bbMinRangeInput * ante} - {bbMaxRangeInput * ante})</Text>
                <MultiSlider 
                    values={[bbMinRangeInput, bbMaxRangeInput]}
                    enabledOne={true}
                    enabledTwo={true}
                    step={10}
                    min={10}
                    max={100}
                    sliderLength={250}
                    selectedStyle={{borderWidth: 2, borderColor: 'lightcoral'}}
                    unselectedStyle={{borderColor: 'lavender', borderWidth: 1}}
                    markerStyle={{backgroundColor: 'lavender'}}
                    onValuesChange={(nArr) =>  setBBRange(nArr[0], nArr[1])}
                    onValuesChangeFinish={() => setScrollable(true)}
                    snapped={true}
                    allowOverlap={false}
                    minMarkerOverlapDistance={0}
                    showSteps={true}
                />
            </View>

            <View style={{alignContent: 'center', position: 'absolute', top: '58.5%', borderWidth: 4, borderRadius: 5, width: '100%', backgroundColor: 'papayawhip'}}>
                <Text style={{fontSize: 30, alignSelf: 'center', marginBottom: 10, fontFamily: 'Copperplate', marginTop: 2}}>Game Style</Text>
                <View style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity style={{borderWidth: 2, marginBottom: 10, borderRadius: 5, backgroundColor: gameStyle === 'Cash' ? 'lightcoral' : 'lavender', width:120, height: 40, marginRight: 15}}
                        onPress={() => setGameStyleInput('Cash')}
                    >
                        <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 20, lineHeight: 32}}>Cash Game</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{borderWidth: 2, borderRadius: 5, backgroundColor: gameStyle === 'tourney' ? 'lightcoral' : 'lavender', width:135, height: 40}}
                        onPress={() => setGameStyleInput('tourney')}
                    >
                        <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 20, lineHeight: 32}}>Tournament</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{alignContent: 'center', position: 'absolute', top: '71%', borderWidth: 4, borderRadius: 5, width: '100%', backgroundColor: 'papayawhip'}}>
                <Text style={{fontSize: 30, marginBottom: 10, alignSelf: 'center', fontFamily: 'Copperplate', marginTop: 5}}>Use A Timer?</Text>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <TouchableOpacity style={{borderWidth: 2, marginBottom: 10, borderRadius: 5, backgroundColor: useATimer === true ? 'lightcoral' : 'lavender', width:75, height: 40, alignItems: 'center', justifyContent: 'center', marginRight: 15}}
                        onPress={() => setTimerInput(true)}
                    >
                        <Text style={{fontFamily: 'Copperplate', fontSize: 20}}>Yes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{borderWidth: 2, borderRadius: 5, backgroundColor: useATimer === false ? 'lightcoral' : 'lightgrey', width:75, height: 40, alignItems: 'center', justifyContent: 'center'}}
                        onPress={() => setTimerInput(false)}
                    >
                        <Text style={{fontFamily: 'Copperplate', fontSize: 20}}>No</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={{alignContent: 'center', position: 'absolute', top: '84%', borderWidth: 4, borderRadius: 5, width: '100%', backgroundColor: 'papayawhip', marginBottom: '290%'}}>
                <Text style={{fontSize: 26, marginBottom: 10, alignSelf: 'center', fontFamily: 'Copperplate', marginTop: 5, textAlign: 'center'}}>Progressive Blinds?</Text>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <TouchableOpacity style={{borderWidth: 2, marginBottom: 10, borderRadius: 5, backgroundColor: progressiveBlinds === true ? 'lightcoral' : 'lavender', width:75, height: 40, alignItems: 'center', justifyContent: 'center', marginRight: 15}}
                        onPress={() => setProgressiveBlindInput(true)}
                    >
                        <Text style={{fontFamily: 'Copperplate', fontSize: 20}}>Yes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{borderWidth: 2, borderRadius: 5, backgroundColor: progressiveBlinds === false ? 'lightcoral' : 'lavender', width:75, height: 40, alignItems: 'center', justifyContent: 'center'}}
                        onPress={() => setProgressiveBlindInput(false)}
                    >
                        <Text style={{fontFamily: 'Copperplate', fontSize: 20}}>No</Text>    
                    </TouchableOpacity>

                </View>

            </View>


            <View style={{marginBottom: '280%'}}>
            </View>

            </ScrollView>

        </View>
    )
}

export default CreateGame

const styles = StyleSheet.create({
    inputStyle: {
        width: '80%',
        height: 40,
        padding: 10,
        marginVertical: 10,
        backgroundColor: 'lavender'
        
    }, 

    selectedButton: {
        backgroundColor: 'pink'
    },

    unselectedButton: {
        backgroundColor: 'none'
    }
})