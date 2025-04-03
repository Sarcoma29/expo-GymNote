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
            id: `${storageKey}_${Date.now()}`
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
            </TouchableOpacity>
        )
    }

    const AddWeekButton = () => {
        return (
                <TouchableOpacity style={styles.AddWeekButton} onPress={pushAndSaveData}>
                    <Text style={{ fontSize: 32 }}>ADD WEEK</Text>
                    <View style = {styles.bottomLine}></View>
                </TouchableOpacity>
        )
    }

    // log functions -------------

        const Reset = () => {
            return (
                <TouchableOpacity style={styles.ResetButton} onPress={() =>{setAppDATA(DATA)}}>
                    <Text style={{color: 'white'}}>reset data</Text>
                </TouchableOpacity>
            )
        }

        const LogData = () => {
            return (
                <TouchableOpacity style={styles.ConsoleButton} onPress={() =>{console.log(AppDATA)}}>
                    <Text style={{color: 'white'}}>Get Data Console</Text>
                </TouchableOpacity>
            )
}

    //--------------------------------



    const renderItem = ({item} : {item: ItemData}) => {
        const backgroundColor = item.id === selectedId ? ' #125fdb' : ' #125fdb';
        const color = item.id === selectedId ? 'black' : ' white';


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
        borderRadius: 30,
        width: 350,
        padding: 40,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#125fdb',
    },
    imgBtn: {
        width: 40,
        height: 40,
    },
    AddWeekButton: {
        borderRadius: 30,
        width: 350,
        padding: 40,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#125fdb',
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
        width: 400,
        height: 4,
        backgroundColor: 'black',
        position: 'absolute',
        left: -15,
        top: -10,
    }

});

export default WeekList;


