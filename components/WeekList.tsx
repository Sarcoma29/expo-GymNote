import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import useAsyncStorage from '@/hooks/useAsyncStorage';

type ItemData = {
    id: string;
    title: string;
}



const DATA: ItemData[] = [
    {
        id: Date.now().toString(),
        title: 'Week 1',
    },
    
];



type ItemProps = {
    item: ItemData;
    onPress: () => void;
    backgroundColor: string;
    textColor: string;
}

const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
        <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
    </TouchableOpacity>
);



const WeekList = () => {

    const [AppDATA, setAppDATA] = useAsyncStorage('localStorageDATA', DATA)
    const [selectedId, setSelectedId] = useState<string>();
    const navigation = useNavigation<any>();

    const pushAndSaveData = () => {
        const newItem = {title: "Week " + (AppDATA.length + 1), id: Date.now().toString() };
        setAppDATA([newItem, ...AppDATA])
    }

    const renderItem = ({item} : {item: ItemData}) => {
        const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
        const color = item.id === selectedId ? 'white' : 'black';


        return (
            <Item 
                item={item}
                onPress={() => {
                    navigation.navigate('WeekDetails', { 
                        weekId: item.id, 
                        weekTitle: item.title 
                    });
                    setSelectedId(item.id)
                }}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={AppDATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
            />
            <View>
            <TouchableOpacity style={styles.addButton} onPress={pushAndSaveData}>
                <Text style={{color: 'red'}}>Add</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ConsoleButton} onPress={() =>{console.log(AppDATA)}}>
                <Text style={{color: 'white'}}>Get Data Console</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ResetButton} onPress={() =>{setAppDATA(DATA)}}>
                <Text style={{color: 'white'}}>reset data</Text>
            </TouchableOpacity>
            </View>

            
        </SafeAreaView>

    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        borderRadius: 30,
        width: 350,
        padding: 40,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    addButton: {
        backgroundColor: 'yellow',
        opacity: 1,
        padding: 15,
        marginBottom: 10,
        zIndex: 100,
    },
    ConsoleButton: {
        backgroundColor: 'black',
        opacity: 1,
        padding: 15,
        marginBottom: 10,
        zIndex: 100,
    },
    ResetButton: {
        backgroundColor: 'red',
        opacity: 1,
        padding: 10,
        marginBottom: 100,
        zIndex: 100,
    }
});

export default WeekList;


