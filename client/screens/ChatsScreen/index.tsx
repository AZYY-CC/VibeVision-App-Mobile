import { Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavBar } from "../../components";
import { useSelector } from "react-redux";
import ChatItem from "./ChatItem";

const ChatsScreen = () => {
  const chats = useSelector((state) => state.chat.list);

  const renderItem = ({ item }) => {
    return <ChatItem chat={item} />;
  };

  return (
    <SafeAreaView>
      <NavBar leftButton={{ display: false }} title="Chats" />
      <FlatList
        data={chats}
        removeClippedSubviews
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Text></Text>
    </SafeAreaView>
  );
};

export default ChatsScreen;
