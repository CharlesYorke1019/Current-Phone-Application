import { TextInput, Text, View, LogBox, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import style from '../Styles/style';

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

    const userInitChangeInfo = () => {
        if (usernameHolder != user.accountInfo.username || passwordHolder != user.accountInfo.password || emailHolder != user.accountInfo.email) {
            setInitChangeInfo(true);
        }
    }

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

            setUsernameHolder(user.accountInfo.username);
            setPasswordHolder(user.accountInfo.password);
        }

        setInitChangeInfo(false)
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
            
            <TouchableOpacity style={{borderBottomWidth: 3, borderRadius: 5, backgroundColor: 'lavender', alignSelf: 'center', width: '100%', marginBottom: 10}}
                onPress={() => xOutOfEditAccountInfo()}
            >
                <Text style={style.xBttnFont}>X</Text>
            </TouchableOpacity>


            <View style={{display: readyResponse === false && initChangeInfo === false ? 'flex' : 'none'}}>
                <Text style={{textAlign: 'center', fontSize: 27, fontFamily: 'Copperplate', marginTop: 5, marginBottom: 5}}>User Account Info</Text>

                <Text style={{textAlign: 'center', marginTop: 20, fontSize: 20, fontFamily: 'Copperplate'}}>Username: </Text>
                <TextInput 
                    style={styles.inputStyle}
                    value={usernameHolder}
                    onChangeText={(v) => setUsernameHolder(v)}
                    placeholder='enter here'
                />

                <Text style={{textAlign: 'center', marginTop: 20, fontSize: 20, fontFamily: 'Copperplate'}}>Password: </Text>
                <TextInput 
                    style={styles.inputStyle}
                    value={passwordHolder}
                    onChangeText={(v) => setPasswordHolder(v)}
                    placeholder='enter here'
                />

                <Text style={{textAlign: 'center', marginTop: 20, fontSize: 20, fontFamily: 'Copperplate'}}>Email: </Text>
                <TextInput 
                    style={styles.inputStyle}
                    value={emailHolder}
                    onChangeText={(v) => setEmailHolder(v)}
                    placeholder='enter here'
                />

                <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', alignSelf: 'center', width: '30%', position: 'absolute', alignSelf: 'center', top: 370}}
                    onPress={() => userInitChangeInfo()}
                >
                    <Text style={{fontFamily: 'Copperplate', margin: 5, textAlign: 'center', fontSize: 20}}>Save</Text>
                </TouchableOpacity>


            </View>

            <View style={{display: initChangeInfo === true && readyResponse === false ? 'flex' : 'none', position: 'absolute', top: '40%', width: '100%'}}>
                <View style={{width: '75%', alignSelf: 'center'}}>
                    <Text style={{textAlign: 'center', fontSize: 23, marginTop: -50, marginBottom: 20, fontFamily: 'Copperplate'}}>Are You Sure You Want To Change Your Account Info?</Text>
                </View>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <TouchableOpacity style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lavender', marginRight: 15, justifyContent: 'center'}}
                        onPress={() => userSavesNewAccountInfo()}
                    >
                        <Text style={{fontFamily: 'Copperplate', fontSize: 26, margin: 3}}>Yes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{borderWidth: 2, borderRadius: 5, backgroundColor: 'lavender', justifyContent: 'center'}}
                        onPress={() => setInitChangeInfo(false)}
                    >
                        <Text style={{fontFamily: 'Copperplate', fontSize: 26, margin: 3}}>No</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{display: readyResponse === true ? 'flex' : 'none'}}>
                <Text style={{textAlign: 'center', top: 100, fontFamily: 'Copperplate', fontSize: 26}}>{responseText}</Text>
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
        backgroundColor: 'lavender',
        borderWidth: 2,
        borderRadius: 5, 
        alignSelf: 'center',
        textAlign: 'center'
    }, 
})