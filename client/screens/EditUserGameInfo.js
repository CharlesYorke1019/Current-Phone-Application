import { Button, StyleSheet, Text, View, LogBox, TextInput } from 'react-native';
import React, { useState } from 'react';

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

            <View style={{borderBottomWidth: 3, borderRadius: 5, backgroundColor: 'lightgrey', alignSelf: 'center', width: '100%', marginBottom: 10}}>
                <Button 
                    title='x'
                    color='black'
                    onPress={() => xOutOfEditGameInfo()}
                />
            </View>

            <View style={{display: readyResponse === false && initChangeInfo === false ? 'flex' : 'none'}}>
                <Text style={{textAlign: 'center', fontSize: 18, marginTop: 10, marginBottom: 10}}>Use Username As Display Name?</Text>
                <View style={{flexDirection: 'row', alignSelf: 'center', marginBottom: 20}}>
                    <View style={{borderWidth: 2, borderRadius: 5, backgroundColor: usernameDisplay === 'Yes' ? 'lightcoral' : 'lightgrey', marginRight: 10}}>
                        <Button 
                            title='Yes'
                            color='black'
                            onPress={() => setUsernameDisplay('Yes')}
                        />
                    </View>
                    <View style={{borderWidth: 2, borderRadius: 5, backgroundColor: usernameDisplay === 'No' ? 'lightcoral' : 'lightgrey'}}>
                        <Button 
                            title='No'
                            color='black'
                            onPress={() => setUsernameDisplay('No')}
                        />
                    </View>
                </View>

                <Text style={{textAlign: 'center', fontSize: 18, marginTop: 10, marginBottom: 10}}>Use Pre-Set Chips?</Text>
                <View style={{flexDirection: 'row', alignSelf: 'center', marginBottom: 20}}>
                    <View style={{borderWidth: 2, borderRadius: 5, backgroundColor: preSetChips === 'Yes' ? 'lightcoral' : 'lightgrey', marginRight: 10}}>
                        <Button 
                            title='Yes'
                            color='black'
                            onPress={() => setPreSetChips('Yes')}
                        />
                    </View>
                    <View style={{borderWidth: 2, borderRadius: 5, backgroundColor: preSetChips === 'No' ? 'lightcoral' : 'lightgrey'}}>
                        <Button 
                            title='No'
                            color='black'
                            onPress={() => setPreSetChips('No')}
                        />
                    </View>
                </View>

                <View style={{display: preSetChips === 'Yes' ? 'flex' : 'none'}}>
                    <Text style={{textAlign: 'center', fontSize: 18, marginTop: 10, marginBottom: 10}}>Pre-Set Chips Amount</Text>

                    <TextInput 
                        style={styles.inputStyle}
                        placeholder='enter here'
                        value={preSetChipsAmount.toString()}
                        onChangeText={(v) => setPreSetChipAmount(v)}

                    />
                </View>

                <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lightgrey', alignSelf: 'center', width: '40%', position: 'absolute', alignSelf: 'center', top: 385}}>
                    <Button 
                        title='save'
                        color='black'
                        onPress={() => setInitChangeInfo(true)}
                    />
                </View>

            </View>

            <View style={{display: initChangeInfo === true && readyResponse === false ? 'flex' : 'none', position: 'absolute', top: '40%', width: '100%'}}>
                <Text style={{textAlign: 'center', fontSize: 23, marginTop: -50, marginBottom: 20}}>Are You Sure You Want To Change Your Account Info?</Text>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <View style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lightgrey', marginRight: 15}}>
                        <Button 
                            title='Yes'
                            color='black'
                            onPress={() => userSavesNewGameInfo()}
                        />
                    </View>

                    <View style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lightgrey'}}>
                        <Button 
                            title='No'
                            color='black'
                            onPress={() => setInitChangeInfo(false)}
                        />
                    </View>
                </View>
            </View>

            <View style={{display: readyResponse === true ? 'flex' : 'none'}}>
                <Text style={{textAlign: 'center', top: 100}}>{responseText}</Text>
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
        backgroundColor: '#DBDBD6',
        borderWidth: 2,
        borderRadius: 5, 
        alignSelf: 'center',
        textAlign: 'center'
    }, 
})