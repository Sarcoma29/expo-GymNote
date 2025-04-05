import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import useAsyncStorage from '@/hooks/useAsyncStorage';
import { red } from 'react-native-reanimated/lib/typescript/Colors';
import { BottomTabBar } from '@react-navigation/bottom-tabs';

type ItemData = {
    id: string;
    title: string;
}

type WeekListProps = {
    storageKey: string;
}


const DATA: ItemData[] = [];



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



const WeekList = ({ storageKey }: WeekListProps) => {

    const [AppDATA, setAppDATA] = useAsyncStorage(storageKey, DATA)
    const [selectedId, setSelectedId] = useState<string>();
    const navigation = useNavigation<any>();
    
    const pushAndSaveData = () => {
        const newItem = {
            title: "Week " + (AppDATA.length + 1),
            id: `${storageKey}_${Date.now()}`,
            storageKey: storageKey.toString()
            };
        setAppDATA([newItem, ...AppDATA])
    }

    const RemoveLastweekHandler = () => {
        let newData = AppDATA.slice(1)
        setAppDATA(newData)
    }

    const RemoveLastweekButton = () => {
        return (
            <TouchableOpacity style={styles.RemoveWeek} onPress={() =>{RemoveLastweekHandler()}}>
                <View style = {styles.topLine}></View>
                <Image 
                source={require('../assets/images/deleteExercise.png')}
                style={styles.imgBtn}
                />
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 32 }}>Reset last week</Text>
            </TouchableOpacity>
        )
    }

    const AddWeekButton = () => {
        return (
                <TouchableOpacity style={styles.AddWeekButton} onPress={pushAndSaveData}>
                    <Text style={{ fontSize: 32, color: 'white'}}>ADD WEEK</Text>
                    <View style = {styles.bottomLine}></View>
                </TouchableOpacity>
        )
    }

    const renderItem = ({item} : {item: ItemData}) => {
        const backgroundColor = item.id === selectedId ? '#125fdb' : '#125fdb';
        const color = item.id === selectedId ? 'white' : 'white';


        return (
            <Item
                item={item}
                onPress={() => {
                    navigation.navigate('WeekDetails', {
                        weekId: item.id, 
                        weekTitle: item.title,
                        storageKey: storageKey,
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
                style={{paddingTop: 0, marginTop: 0}}
                data={AppDATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}

                ListHeaderComponent = {AddWeekButton}
                ListFooterComponent={RemoveLastweekButton}
            >
            </FlatList>
            
        </SafeAreaView>

    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 0,
        marginTop: 0, 
    },
    item: {
        borderRadius: 30,
        width: 350,
        padding: 40,
        marginVertical: 8,
        marginHorizontal: 16,
        alignItems: 'center',
    },
    title: {
        alignItems: 'center',
        fontSize: 32,

    },
    addButton: {
        alignItems: 'center',
        alignContent: 'center',
        opacity: 1,
        padding: 10,
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
    },
    RemoveWeek: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 30,
        width: 350,
        padding: 40,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#125fdb',
        alignItems: 'center'
    },
    imgBtn: {
        width: 40,
        height: 40,
        tintColor: "white"
    },
    AddWeekButton: {
        borderRadius: 30,
        width: 350,
        padding: 40,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#125fdb',
        alignItems: 'center'
    },
    bottomLine: {
        width: 400,
        height: 4,
        backgroundColor: 'black',
        position: 'absolute',
        left: -15,
        bottom: -10,
    },
    topLine: {
        width: 420,
        height: 4,
        backgroundColor: 'black',
        position: 'absolute',
        left: -15,
        top: -10,
    }

});

export default WeekList;


