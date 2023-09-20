import { SafeAreaView, Button, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'


const CreatingGroupPage = ({creatingGroupInit, setCreatingGroup, user}) => {

    let [groupName, setGroupName] = useState('');
    let groupNameHolder;

    let [readyResponse, setReadyResponse] = useState(false);
    let [responseText, setResponseText] = useState('')
    let [responseType, setResponseType] = useState(0)

    user.socket.on('groupCreationCleared', (groupInfo) => {
        setResponseText('Group Has Been Created!')
        setReadyResponse(true)
        setResponseType(200);
        user.addGroup(groupInfo)
    })

    const xOutOfResponse = () => {
        if (responseType === 200) {
            setCreatingGroup(false)
            setReadyResponse(false)
        } else if (responseType === 400) {
            setReadyResponse(false)
        }
    }

    return (
        <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'papayawhip', height: '35%'}}>

            <View style={{display: readyResponse === false ? 'flex' : 'none'}}>
                <View style={{borderBottomWidth: 2, backgroundColor: 'lightgrey'}}>
                    <Button 
                        title='x'
                        color='black'
                        onPress={() => setCreatingGroup(false)}
                    />
                </View>

                <Text style={{textAlign: 'center', fontSize: 25, marginTop: 10}}>Group Name</Text>
                <TextInput 
                    value={groupNameHolder}
                    onChangeText={(i) => setGroupName(i)}
                    style={styles.inputStyle}
                />


                <View style={{borderWidth: 3, borderRadius: 5, backgroundColor: 'lightgrey', width: '50%', alignSelf: 'center'}}>
                    <Button 
                        title='Create Group'
                        color='black'
                        onPress={() => user.socket.emit('groupCreated', groupName)}
                    />
                </View>
            </View>

            <View style={{display: readyResponse === true ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center'}}>
                <View style={{borderBottomWidth: 3, backgroundColor: 'lightgrey', alignSelf: 'center', width: '100%'}}>
                    <Button 
                        title='X'
                        onPress={() => xOutOfResponse()}
                        color='black'
                    />
                </View>
                <Text style={{textAlign: 'center', marginTop: 80}}>{responseText}</Text>
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
        backgroundColor: '#DBDBD6',
        fontSize: 12,
        borderWidth: 2,
        alignSelf: 'center',
        marginBottom: 20
    }
})