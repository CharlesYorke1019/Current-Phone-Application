import { Button, TextInput, Text, View, LogBox, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const EditAccountInfoPage = ({user, setCurrentView}) => {

    // Variables //

    let [usernameHolder, setUsernameHolder] = useState(user.accountInfo.username);
    let [passwordHolder, setPasswordHolder] = useState(user.accountInfo.password);
    let [emailHolder, setEmailHolder] = useState(user.accountInfo.email);

    let [initChangeInfo, setInitChangeInfo] = useState(false);

    let [readyResponse, setReadyResponse] = useState(false);
    let [responseText, setResponseText] = useState('');
    let [responseType, setResponseType] = useState(0);

    //////////////////////////////////////////////////////////////////

    // Functions //

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    const userSavesNewAccountInfo = () => {
        user.socket.emit('newUserInfoSaved', usernameHolder, passwordHolder, emailHolder);
    }

    const xOutOfEditAccountInfo = () => {
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

    user.socket.on('newUserInfoConfirmed', (changeType, infoChanged) => {
        setResponseText('Account Info Updated!');
        setResponseType(200);
        setReadyResponse(true);

        user.updateAccountInfo(changeType, infoChanged)
    })

    user.socket.on('newInfoUserCannotBeSaved', (reason) => {
        setResponseText('Account Info Could Not Be Saved. Please Try Again');
        setResponseType(400);
        setReadyResponse(true);

        if (reason === 'username_exists') {
            setUsernameHolder(user.accountInfo.username)
        }
    })

    //////////////////////////////////////////////////////////////////

    return (
        <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', height: '75%', marginTop: 30}}>
            <View style={{borderBottomWidth: 3, borderRadius: 5, backgroundColor: 'lightgrey', alignSelf: 'center', width: '100%', marginBottom: 10}}>
                <Button 
                    title='x'
                    color='black'
                    onPress={() => xOutOfEditAccountInfo()}
                />
            </View>

            <View style={{display: readyResponse === false && initChangeInfo === false ? 'flex' : 'none'}}>
                <Text style={{textAlign: 'center', fontSize: 25}}>User Account Info</Text>

                <Text style={{textAlign: 'center', marginTop: 20, fontSize: 18}}>Username: </Text>
                <TextInput 
                    style={styles.inputStyle}
                    value={usernameHolder}
                    onChangeText={(v) => setUsernameHolder(v)}
                />

                <Text style={{textAlign: 'center', marginTop: 20, fontSize: 18}}>Password: </Text>
                <TextInput 
                    style={styles.inputStyle}
                    value={passwordHolder}
                    onChangeText={(v) => setPasswordHolder(v)}
                />

                <Text style={{textAlign: 'center', marginTop: 20, fontSize: 18}}>Email: </Text>
                <TextInput 
                    style={styles.inputStyle}
                    value={emailHolder}
                    onChangeText={(v) => setEmailHolder(v)}
                />

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
                            onPress={() => userSavesNewAccountInfo()}
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

export default EditAccountInfoPage

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