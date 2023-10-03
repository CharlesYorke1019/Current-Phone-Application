import { Button, StyleSheet, Text, View, LogBox, TextInput, ScrollView } from 'react-native';
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
        if (ante != undefined) {
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

            <View style={{borderWidth: 1, borderColor: 'black', position: 'absolute', top: 57, backgroundColor: 'lightgrey', borderRadius: '50%', height: 30, width: 30, left: 30, alignSelf: 'center'}}>
                <Button 
                    title='i'
                    color='black'
                    onPress={() => setInfoSection(true)}
                />
            </View>

            <View style={{display: infoSection === true ? 'flex' : 'none', width: '85%', height: '90%', borderWidth: 2, backgroundColor: 'papayawhip', zIndex: 1}}>
                <View style={{borderWidth: 1, backgroundColor: 'lightgrey', marginBottom: 20}}>
                    <Button 
                        title='x'
                        color='black'
                        onPress={() => setInfoSection(false)}
                    />
                </View>

                <View>
                    <Text style={{alignSelf: 'center', fontSize: 24, marginBottom: 5}}>Table Size</Text>
                    <Text style={{textAlign: 'center', marginBottom: 15}}>Choose the number of players playing at the table</Text>
                    <Text style={{alignSelf: 'center', fontSize: 24, marginBottom: 5}}>Ante</Text>
                    <Text style={{textAlign: 'center', marginBottom: 15}}>Choose the ante the table will be playing with. The small blind ante will be half of the ante entered</Text>
                    <Text style={{alignSelf: 'center', fontSize: 24, marginBottom: 5}}>Chip Units</Text>
                    <Text style={{textAlign: 'center', marginBottom: 15}}>Helps us with the chip increments for players</Text>
                    <Text style={{alignSelf: 'center', fontSize: 24, marginBottom: 5}}>Buy-in Range</Text>
                    <Text style={{textAlign: 'center', marginBottom: 15}}>Sets a range in which players can buy in (ante * blind ranges)</Text>
                    <Text style={{alignSelf: 'center', fontSize: 24, marginBottom: 5}}>Game Style</Text>
                    <Text style={{textAlign: 'center', marginBottom: 15}}>Choose between cash game and tournament style play. Cash play will allow for player to re-buy, where a tournament style game will not allow re-buys and will end when there is one winner (or if the table chooses differently)</Text>
                    <Text style={{alignSelf: 'center', fontSize: 24, marginBottom: 5}}>Timer</Text>
                    <Text style={{textAlign: 'center', marginBottom: 15}}>Choose whether players have a time limit on their actions (pre set timer is 30 seconds per turn)</Text>
                    <Text style={{alignSelf: 'center', fontSize: 24, marginBottom: 5}}>Progressive Blinds</Text>
                    <Text style={{textAlign: 'center'}}>Choose whether blinds will progressively increase over time. If enabled, blinds will double each time the the progressive blinds timer hits.</Text>
                </View>

            </View>

            <View style={{alignContent: 'center', alignSelf: 'center', borderWidth: 2, borderRadius: 5, borderColor: 'black', backgroundColor: 'lightgrey', position: 'absolute', top: 750}}>
                <Button 
                    title='Next'
                    color='black'
                    onPress={() => user.socket.emit('newGame', activeButton, ante, useATimer, gameStyle, progressiveBlinds, bbMinRangeInput, bbMaxRangeInput, chipUnits)}
                />
            </View>

            <ScrollView style={{alignSelf: 'center', width: '90%', height: '75%', borderWidth: 3, borderRadius: 5, borderColor: 'black', position: 'absolute', top: 110}}  contentContainerStyle={{justifyContent: 'center', alignItems: 'center', padding: 10}} scrollEnabled={svScrollable} scrollsToTop={false} showsVerticalScrollIndicator={false}>

            
            <View style={{borderWidth: 4, borderRadius: 5, width: '100%', position: 'absolute', top: 0, backgroundColor: 'papayawhip', marginTop: 10}}>
                <Text style={{fontSize: 30, alignSelf: 'center', marginBottom: 5}}>Choose Table Size</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <View style={{borderWidth: 2, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 2 ? 'lightcoral' : 'lightgrey', borderRadius: 5}}>
                        <Button 
                            title='2'
                            onPress={() => setActiveButton(2)}
                            color='black'
                        />
                    </View>
                    <View style={{borderWidth: 2, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 3 ? 'lightcoral' : 'lightgrey', borderRadius: 5}}>
                        <Button 
                            title='3'
                            onPress={() => setActiveButton(3)}
                            color='black'
                        />
                    </View>
                    <View style={{borderWidth: 2, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 4 ? 'lightcoral' : 'lightgrey', borderRadius: 5}}>
                        <Button 
                            title='4'
                            onPress={() => setActiveButton(4)}
                            color='black'
                        />
                    </View>
                    <View style={{borderWidth: 2, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 5 ? 'lightcoral' : 'lightgrey', borderRadius: 5}}>
                        <Button 
                            title='5'
                            onPress={() => setActiveButton(5)}
                            color='black'
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 10}}>
                    <View style={{borderWidth: 2, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 6 ? 'lightcoral' : 'lightgrey', borderRadius: 5}}>
                        <Button 
                            title='6'
                            onPress={() => setActiveButton(6)}
                            color='black'
                        />
                    </View>
                    <View style={{borderWidth: 2, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 7 ? 'lightcoral' : 'lightgrey', borderRadius: 5}}>
                        <Button 
                            title='7'
                            onPress={() => setActiveButton(7)}
                            color='black'
                        />
                    </View>
                    <View style={{borderWidth: 2, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 8 ? 'lightcoral' : 'lightgrey', borderRadius: 5}}>
                        <Button 
                            title='8'
                            onPress={() => setActiveButton(8)}
                            color='black'
                        />
                    </View>
                    <View style={{borderWidth: 2, width: '15%', alignSelf: 'center', backgroundColor: activeButton === 9 ? 'lightcoral' : 'lightgrey', borderRadius: 5}}>
                        <Button 
                            title='9'
                            onPress={() => setActiveButton(9)}
                            color='black'
                        />
                    </View>
                </View>
            </View>

            <View style={{alignContent: 'center', position: 'absolute', top: 160, borderWidth: 4, borderRadius: 5, width: '100%', backgroundColor: 'papayawhip'}}>
                <Text style={{fontSize: 30, marginBottom: 10, alignSelf: 'center'}}>Choose The Ante</Text>
                <View style={{width: 100, alignSelf: 'center', marginBottom: 10}}>
                    <TextInput 
                        value={anteInputHolder}
                        onChangeText={(anteInput) => setAnte(Number(anteInput))}
                        onEndEditing={() => relativeChipUnits()}
                        style={{backgroundColor: 'lightgrey', borderWidth: 2, borderRadius: 5, borderColor: 'black', textAlign: 'center', height: 25}}
                    />
                </View>

            </View>

            <View style={{alignContent: 'center', alignItems: 'center', position: 'absolute', top: 260, borderWidth: 4, borderRadius: 5, width: '100%', backgroundColor: 'papayawhip'}}>
                <Text style={{fontSize: 30, marginBottom: 10, alignSelf: 'center'}}>Chip Units</Text>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>

                    <View style={{borderWidth: 2, marginBottom: 10, borderRadius: 5, backgroundColor: chipUnits === 1 ? 'lightcoral' : 'lightgrey', width: 60, height: 40, alignItems: 'center', justifyContent: 'center', marginRight: 15}}>
                        <Button 
                            title='1'
                            color='black'
                            onPress={() => setChipUnits(1)}
                        />
                    </View>
    
                    <View style={{borderWidth: 2, borderRadius: 5, backgroundColor: chipUnits === .01 ? 'lightcoral' : 'lightgrey', width:60, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                    <Button 
                            title='.01'
                            color='black'
                            onPress={() => setChipUnits(.01)}
                        />
                    </View>

                </View>
            </View>

            <View style={{alignContent: 'center', alignItems: 'center', position: 'absolute', top: 370, borderWidth: 4, borderRadius: 5, width: '100%', backgroundColor: 'papayawhip'}}>
                <Text style={{fontSize: 30, marginBottom: 7, alignSelf: 'center'}}>Buy In Range</Text>
                <Text style={{fontSize: 14, marginBottom: 10, alignSelf: 'center'}}>{bbMinRangeInput} BB - {bbMaxRangeInput} BB ({bbMinRangeInput * ante} - {bbMaxRangeInput * ante})</Text>
                <MultiSlider 
                    values={[bbMinRangeInput, bbMaxRangeInput]}
                    enabledOne={true}
                    enabledTwo={true}
                    step={10}
                    min={10}
                    max={100}
                    sliderLength={250}
                    selectedStyle={{borderWidth: 2, borderColor: 'lightcoral'}}
                    markerStyle={{backgroundColor: 'lightgrey'}}
                    onValuesChange={(nArr) =>  setBBRange(nArr[0], nArr[1])}
                    onValuesChangeFinish={() => setSVScrollable(true)}
                    snapped={true}
                    allowOverlap={false}
                    minMarkerOverlapDistance={0}
                    showSteps={true}
                />
            </View>

            <View style={{alignContent: 'center', position: 'absolute', top: 507, borderWidth: 4, borderRadius: 5, width: '100%', backgroundColor: 'papayawhip'}}>
                <Text style={{fontSize: 30, alignSelf: 'center', marginBottom: 7}}>Game Style</Text>
                <View style={{flexDirection: 'row', alignSelf: 'center', justifyContent: 'center'}}>
                    <View style={{borderWidth: 2, marginBottom: 10, borderRadius: 5, backgroundColor: gameStyle === 'Cash' ? 'lightcoral' : 'lightgrey', width:120, height: 40, marginRight: 15}}>
                        <Button 
                            title='Cash Game'
                            color='black'
                            onPress={() => setGameStyle('Cash')}
                        />
                    </View>

                    <View style={{borderWidth: 2, borderRadius: 5, backgroundColor: gameStyle === 'tourney' ? 'lightcoral' : 'lightgrey', width:120, height: 40}}>
                        <Button 
                            title='Tournament'
                            color='black'
                            onPress={() => setGameStyle('tourney')}
                        />
                    </View>
                </View>
            </View>

            <View style={{alignContent: 'center', position: 'absolute', top: 615, borderWidth: 4, borderRadius: 5, width: '100%', backgroundColor: 'papayawhip'}}>
                <Text style={{fontSize: 30, marginBottom: 10, alignSelf: 'center'}}>Use A Timer?</Text>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <View style={{borderWidth: 2, marginBottom: 10, borderRadius: 5, backgroundColor: useATimer === true ? 'lightcoral' : 'lightgrey', width:75, height: 40, alignItems: 'center', justifyContent: 'center', marginRight: 15}}>
                        <Button 
                            title='Yes'
                            color='black'
                            onPress={() => setUseATimer(true)}
                        />
                    </View>

                    <View style={{borderWidth: 2, borderRadius: 5, backgroundColor: useATimer === false ? 'lightcoral' : 'lightgrey', width:75, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                        <Button 
                            title='No'
                            color='black'
                            onPress={() => setUseATimer(false)}
                        />
                    </View>
                </View>

            </View>
            <View style={{alignContent: 'center', position: 'absolute', top: 725, borderWidth: 4, borderRadius: 5, width: '100%', backgroundColor: 'papayawhip'}}>
                <Text style={{fontSize: 30, marginBottom: 10, alignSelf: 'center'}}>Progressive Blinds?</Text>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <View style={{borderWidth: 2, marginBottom: 10, borderRadius: 5, backgroundColor: progressiveBlinds === true ? 'lightcoral' : 'lightgrey', width:75, height: 40, alignItems: 'center', justifyContent: 'center', marginRight: 15}}>
                        <Button 
                            title='Yes'
                            color='black'
                            onPress={() => setProgressiveBlinds(true)}
                        />
                    </View>

                    <View style={{borderWidth: 2, borderRadius: 5, backgroundColor: progressiveBlinds === false ? 'lightcoral' : 'lightgrey', width:75, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                        <Button 
                            title='No'
                            color='black'
                            onPress={() => setProgressiveBlinds(false)}
                        />
                    </View>
                </View>

            </View>


            <View style={{marginBottom: 825}}>
                {/* exists so that I can actually scroll in my scroll view without it snapping back to the top */}
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
        backgroundColor: '#DBDBD6'
    }, 

    selectedButton: {
        backgroundColor: 'pink'
    },

    unselectedButton: {
        backgroundColor: 'none'
    }
})