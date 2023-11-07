import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';


const CreatingGroupPage = ({setCreatingGroup, user}) => {

    // Variables //

    let [groupName, setGroupName] = useState('');
    let groupNameHolder;

    let [readyResponse, setReadyResponse] = useState(false);
    let [responseText, setResponseText] = useState('')
    let [responseType, setResponseType] = useState(0)

    const groupNameRef = useRef();

    //////////////////////////////////////////////////////////////////

    // Functions //

    const xOutOfWindow = () => {
        if (readyResponse) {
            if (responseType === 200) {
                setCreatingGroup(false)
                setReadyResponse(false)
            } else if (responseType === 400) {
                setReadyResponse(false)
            }

            groupNameRef.current.clear();
        } else {
            setCreatingGroup(false)

            if (groupNameRef.current != null) {
                groupNameRef.current.clear();
            }
        }
    }

    //////////////////////////////////////////////////////////////////

    // User Socket On's //

    user.socket.on('groupCreationCleared', (groupInfo) => {
        setResponseText('Group Has Been Created!')
        setReadyResponse(true)
        setResponseType(200);
    

        user.addGroup(groupInfo)
    })

    //////////////////////////////////////////////////////////////////

    return (
        <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', height: '35%'}}>

            <TouchableOpacity style={{borderBottomWidth: 2, backgroundColor: 'lavender'}}
                onPress={() => xOutOfWindow()}
            >
                <Text style={{fontFamily: 'Copperplate', fontSize: 20, lineHeight: 40, textAlign: 'center'}}>X</Text>
            </TouchableOpacity>

            <View style={{display: readyResponse === false ? 'flex' : 'none'}}>
                <Text style={{textAlign: 'center', fontSize: 29, marginTop: 15, fontFamily: 'Copperplate', marginBottom: 5}}>Group Name</Text>
                <TextInput 
                    value={groupNameHolder}
                    onChangeText={(i) => setGroupName(i)}
                    style={styles.inputStyle}
                    ref={groupNameRef}
                    placeholder='enter here'
                />

                <TouchableOpacity style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lavender', width: '55%', alignSelf: 'center', justifyContent: 'center', alignContent: 'center', marginTop: 10}}
                    onPress={() => user.socket.emit('groupCreated', groupName)}
                >
                    <Text style={{textAlign: 'center', fontFamily: 'Copperplate', fontSize: 20, margin: '2%'}}>Create Group</Text>
                </TouchableOpacity>

            </View>

            <View style={{display: readyResponse === true ? 'flex' : 'none'}}>
                <Text style={{textAlign: 'center', marginTop: 60, fontFamily: 'Copperplate', fontSize: 25}}>{responseText}</Text>
            </View>

        </View>
    )

}

export default CreatingGroupPage

const styles = StyleSheet.create({
    inputStyle: {
        width: '80%',
        height: 40,
        padding: 10,
        marginVertical: 10,
        backgroundColor: 'lavender',
        fontSize: 14,
        borderWidth: 2,
        alignSelf: 'center',
        marginBottom: 20,
        textAlign: 'center',
        borderRadius: 5,
        fontWeight: 'bold'
    }
})