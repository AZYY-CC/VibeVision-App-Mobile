import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useMessages } from '../../../hooks/useMessages'
import { NavBar } from '../../../components'
import { sendMessage } from '../../../services/chats'
import ChatMessageItem from './ChatMessageItem'

const ChatSingleScreen = ({ route }) => {
    const { chatId, contactId } = route.params
    const [message, setMessage] = useState('')

    const { messages, chatIdInst } = useMessages(chatId, contactId)
    const handleMessageSend = () => {
        if (message.length == 0) {
            return;
        }
        setMessage('')
        sendMessage(chatIdInst, message)
    }

    const renderItem = ({ item }) => {
        return <ChatMessageItem item={item} />
    }

    return (
        <SafeAreaView style={styles.container}>
            <NavBar title='Chat Details' />
            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <View style={styles.containerInput}>
                <TextInput
                    value={message}
                    onChangeText={setMessage}
                    placeholder='send Message...'
                    style={styles.input}
                />
                <TouchableOpacity onPress={() => handleMessageSend()}>
                    <Ionicons name="arrow-up-circle" size={34} color={'crimson'} />
                </TouchableOpacity>
            </View >
        </SafeAreaView >
    )
}

export default ChatSingleScreen