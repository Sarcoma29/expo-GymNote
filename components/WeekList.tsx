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

    const RemoveLastweek = () => {
        return (
            <TouchableOpacity style={styles.RemoveWeek} onPress={() =>{RemoveLastweekHandler()}}>
                <Image 
                source={require('../assets/images/deleteExercise.png')}
                style={styles.imgBtn}
                />
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
        const backgroundColor = item.id === selectedId ? '#125fdb' : '#125fdb';
        const color = item.id === selectedId ? 'black' : 'white';


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
            <RemoveLastweek></RemoveLastweek>
            <View style = {styles.item}>

            <TouchableOpacity style={styles.addButton} onPress={pushAndSaveData}>
                <Text style={{color: 'red'}}>Add</Text>
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
    },
    RemoveWeek: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 10,
        backgroundColor: 'red',
    },
    imgBtn: {
        width: 40,
        height: 40,
    }

});

export default WeekList;


