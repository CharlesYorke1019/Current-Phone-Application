import { StyleSheet, Text, View, LogBox, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import style from '../Styles/style';

const EditUserGameInfo = ({user, setCurrentView}) => {

    // Variables //
    
    let [readyResponse, setReadyResponse] = useState(false);
    let [responseText, setResponseText] = useState('');
    let [responseType, setResponseType] = useState(0);

    let [initChangeInfo, setInitChangeInfo] = useState(false);

    let [usernameDisplay, setUsernameDisplay] = useState(user.profileOptions.useUsername);
    let [preSetChips, setPreSetChips] = useState(user.profileOptions.usePreSetChips);
    let [preSetChipsAmount, setPreSetChipAmount] = useState(user.profileOptions.preSetChipAmount);

    //////////////////////////////////////////////////////////////////

    // Functions //

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const userSavesNewGameInfo = () => {
        user.socket.emit('newUserGameInfoSaved', usernameDisplay, preSetChips, preSetChipsAmount);
    }

    const xOutOfEditGameInfo = () => {
        if (readyResponse) {
            if (responseType === 200) {
                setReadyResponse(false);
                setCurrentView(false)
                setInitChangeInfo(false)
            } else if (responseType === 400) {
                setReadyResponse(false);
            }

        } else {
            setCurrentView(false);
        }
    }

    //////////////////////////////////////////////////////////////////

    // User Socket On's //

    user.socket.on('newUserGameInfoConfirmed', (uProfileObj) => {
        setResponseText('User Game Info Updated!');
        setResponseType(200);
        setReadyResponse(true);

        user.updateGameInfo(uProfileObj);
    })

    //////////////////////////////////////////////////////////////////

    return (
        <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', height: '75%', marginTop: 30}}>

            <TouchableOpacity style={{borderBottomWidth: 3, borderRadius: 5, backgroundColor: 'lavender', alignSelf: 'center', width: '100%', marginBottom: 10}}
                onPress={() => xOutOfEditGameInfo()}
            >
                <Text style={style.xBttnFont}>X</Text>
            </TouchableOpacity>

            <View style={{display: readyResponse === false && initChangeInfo === false ? 'flex' : 'none'}}>
                <Text style={{textAlign: 'center', fontSize: 20, marginTop: 10, marginBottom: 10, fontFamily: 'Copperplate'}}>Username As Display Name?</Text>
                <View style={{flexDirection: 'row', alignSelf: 'center', marginBottom: 20}}>
                    <TouchableOpacity style={{borderWidth: 2, borderRadius: 5, backgroundColor: usernameDisplay === 'Yes' ? 'lightcoral' : 'lavender', marginRight: 10, justifyContent: 'center', width: '20%'}}
                        onPress={() => setUsernameDisplay('Yes')}
                    >
                        <Text style={{fontFamily: 'Copperplate', margin: 5, textAlign: 'center', fontSize: 20}}>Yes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{borderWidth: 2, borderRadius: 5, backgroundColor: usernameDisplay === 'No' ? 'lightcoral' : 'lavender', justifyContent: 'center', width: '20%'}}
                        onPress={() => setUsernameDisplay('No')}
                    >
                        <Text style={{fontFamily: 'Copperplate', margin: 5, textAlign: 'center', fontSize: 20}}>No</Text>
                    </TouchableOpacity>

                </View>

                <Text style={{textAlign: 'center', fontSize: 20, marginTop: 10, marginBottom: 10, fontFamily: 'Copperplate'}}>Use Pre-Set Chips?</Text>
                <View style={{flexDirection: 'row', alignSelf: 'center', marginBottom: 20}}>
                    
                    <TouchableOpacity style={{borderWidth: 2, borderRadius: 5, backgroundColor: preSetChips === 'Yes' ? 'lightcoral' : 'lavender', marginRight: 10, width: '20%', justifyContent: 'center'}}
                        onPress={() => setPreSetChips('Yes')}
                    >
                        <Text style={{fontFamily: 'Copperplate', margin: 5, textAlign: 'center', fontSize: 20}}>Yes</Text>
                    </TouchableOpacity>

    
                    <TouchableOpacity style={{borderWidth: 2, borderRadius: 5, backgroundColor: preSetChips === 'No' ? 'lightcoral' : 'lavender', justifyContent: 'center', width: '20%'}}
                        onPress={() => setPreSetChips('No')}
                    >
                        <Text style={{fontFamily: 'Copperplate', margin: 5, textAlign: 'center', fontSize: 20}}>No</Text>
                    </TouchableOpacity>

                </View>

                <View style={{display: preSetChips === 'Yes' ? 'flex' : 'none', position: 'absolute', alignSelf: 'center', top: '107%'}}>
                    <Text style={{textAlign: 'center', fontSize: 20, fontFamily: 'Copperplate'}}>Pre-Set Chips Amount</Text>

                    <TextInput 
                        style={styles.inputStyle}
                        placeholder='enter here'
                        value={preSetChipsAmount.toString()}
                        onChangeText={(v) => setPreSetChipAmount(v)}
                    />
                </View>

                <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', alignSelf: 'center', width: '40%', position: 'absolute', alignSelf: 'center', top: '170%'}}
                    onPress={() => setInitChangeInfo(true)}
                >
                    <Text style={{fontFamily: 'Copperplate', margin: 5, textAlign: 'center', fontSize: 20}}>Save</Text>
                </TouchableOpacity>

            </View>

            <View style={{display: initChangeInfo === true && readyResponse === false ? 'flex' : 'none', position: 'absolute', top: '40%', width: '100%'}}>
                <View style={{width: '70%', alignSelf: 'center'}}>
                    <Text style={{textAlign: 'center', fontSize: 23, marginTop: -50, marginBottom: 20, fontFamily: 'Copperplate'}}>Are You Sure You Want To Change Your Account Info?</Text>
                </View>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    
                    <TouchableOpacity style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lavender', marginRight: 15, justifyContent: 'center', width: '20%'}}
                        onPress={() => userSavesNewGameInfo()}
                    >
                        <Text style={{fontFamily: 'Copperplate', margin: 5, textAlign: 'center', fontSize: 20}}>Yes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lavender', justifyContent: 'center', width: '20%'}}
                        onPress={() => setInitChangeInfo(false)}
                    >
                        <Text style={{fontFamily: 'Copperplate', margin: 5, textAlign: 'center', fontSize: 20}}>No</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={{display: readyResponse === true ? 'flex' : 'none'}}>
                <View style={{alignSelf: 'center', width: '75%'}}>
                    <Text style={{textAlign: 'center', top: 100, fontFamily: 'Copperplate', fontSize: 18}}>{responseText}</Text>
                </View>
            </View>

        </View>
    )

}

export default EditUserGameInfo

const styles = StyleSheet.create({
    inputStyle: {
        width: '50%',
        height: 40,
        padding: 10,
        marginVertical: 10,
        backgroundColor: 'lavender',
        borderWidth: 2,
        borderRadius: 5, 
        alignSelf: 'center',
        textAlign: 'center'
    }, 
})