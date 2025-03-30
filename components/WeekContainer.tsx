import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useCallback, memo } from 'react';
import styled from 'styled-components/native'
import { useRoute } from '@react-navigation/native';

import useAsyncStorage from '@/hooks/useAsyncStorage';

type ExerciseData = {
    id: string,
    // название упражение
    title: string,
    // массив всех подходов, подходов может быть n количество
    sets: number[][]
    
}

// тип для параметра маршрута (i use page ID for async storage)
type RouteParams = {
    weekId: number | string; 
}

const DATA: ExerciseData[] = [
    {
        id: '1',
        title: "жим лежа",
        sets: [[1, 50, 20], [2, 60, 15], [3, 70, 12], [4, 80, 8], [5, 100, 5], [6, 120, 78 ]]
    },
    {
        id: '2',
        title: "бабочка",
        sets: [[1,70, 20], [2,70, 15], [3,70, 12], [4,70, 8]]
    },
    {
        id: '3',
        title: "Подъём на бицепс",
        sets: [[1, 50, 20], [2, 50, 15], [3, 50, 12], [4, 50, 8]]
    }
]


// Стилизованные компоненты
const ExerciseContainer = styled.View`
    align-items: center;    
    width: 320px;
    padding: 10px;
    margin: 10px;
    background-color:rgba(0, 0, 0, 0.29);
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0);
`;

const SetRow = styled.View`
    color:rgb(255, 255, 255);
    flex-direction: row;
    width: 100%;
    padding: 10px;
    background-color: rgb(0, 62, 119);
    margin-bottom: 5px;
    border-radius: 8px;
`;

const ExerciseTitle = styled.TextInput`
    flex-wrap: nowrap;
    font-size: 32px;
    color:rgb(255, 255, 255);
    margin-bottom: 10px;

`;

const SetCell = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const AddSet = styled.TouchableOpacity`
    padding: 20px;
    background-color: green;
`;

const RemoveSet = styled.TouchableOpacity`
    padding: 20px;
    background-color: red;
`;


const WeekContainer = () => {
    const route = useRoute();
    const params = route.params as RouteParams;
    const [PageDATA, setPageDATA] = useAsyncStorage(params.weekId.toString(), DATA) 

    const [selectedId, setSelectedId] = useState<string>();

    // обработчик изменения название title
    const handleTitleSet = useCallback((exerciseId: string, newTitle: string ) => {
        setPageDATA(prev => prev.map(item => 
            item.id === exerciseId ? {...item, title: newTitle} : item
        ));
    }, []);

    // обработчик измения веса
    const handleWeightChange = useCallback((exerciseId: string, setIndex: number, newWeight: string) => {
        const weight = Number(newWeight.replace(/[^0-9]/g, '')) || 0;


        setPageDATA(prev => prev.map(item => {
            if (item.id === exerciseId){
                const updatedSets = [...item.sets];
                updatedSets[setIndex] = [updatedSets[setIndex][0], weight, updatedSets[setIndex][2]];
                return {...item, sets: updatedSets};
            };
            return item;
        }))
    }, []);
    // обработчик изменения кол-ва повторов

    const handleRepeatsChange = useCallback((exerciseId: string, setIndex: number, newRepeats: string) => {
        const repeats = Number(newRepeats.replace(/[^0-9]/g, '')) || 0;

        setPageDATA(prev => prev.map(item => {
            if (item.id === exerciseId){
                const updatedSets = [...item.sets];
                updatedSets[setIndex] = [updatedSets[setIndex][0], updatedSets[setIndex][1], repeats];
                return {...item, sets: updatedSets};
            };
            return item;
        }))
    }, []);

    const handleAddSet = (exerciseId: string) => {
        setPageDATA(prevData => 
            prevData.map(item => {
            if (item.id === exerciseId) {
              // Создаем новый массив подходов
              const newSet = [item.sets.length + 1, 0, 0]; // [номер подхода, вес, повторы]
                return {
                ...item,
                sets: [...item.sets, newSet] // Добавляем новый подход
                };
            }
            return item;
            })
        );
    };

    const handleRemoveSet = (exerciseId: string) => {
        setPageDATA(prevData =>
            prevData.map(item => {
            if (item.id === exerciseId && item.sets.length > 1) {
                    return {
                    ...item,
                    sets: item.sets.slice(0, -1) // Удаляем последний подход
                };
            }
                return item;
            })
            );
        };    

    const SetItem = memo(({ exerciseId, set, index }: { exerciseId: string, set: number[], index: number }) => {
        const [localWeight, setLocalWeight] = useState(String(set[1]));
        const [localReps, setLocalReps] = useState(String(set[2]));

        return (
            <SetRow>
            <SetCell>
                <Text>{set[0]}</Text>
            </SetCell>
    
            <SetCell>
                <TextInput 
                    value = {localWeight}
                    style={{ textAlign: 'center' }}
                    onChangeText={setLocalWeight}
                    onBlur={() => handleWeightChange(exerciseId, index, localWeight)}


                />
            </SetCell>

            <SetCell>
                <TextInput 
                    value={localReps}
                    style={{ textAlign: 'center' }}
                    onChangeText={setLocalReps}
                    onBlur={() => handleRepeatsChange(exerciseId, index, localReps)}
                />
            </SetCell>
        </SetRow>
        )
    });
    
    const ExerciseItem = memo(({ item }: { item: ExerciseData }) => {
        const [localTitle, useLocalTitle] = useState(item.title)
        return (
        <ExerciseContainer>
            <ExerciseTitle 
            value = {localTitle}
            onChangeText = {useLocalTitle}
            onBlur = {() => {handleTitleSet(item.id, localTitle)}}
            />
            {item.sets.map((set, index) => (
            <SetItem 
            key={`set-${index}`}
            exerciseId={item.id}
            set={set}
            index={index}
            
            />
            ))}
    
            <AddSet onPress={() => {handleAddSet(item.id)}}><Text>+</Text></AddSet>
            <RemoveSet onPress={() => {handleRemoveSet(item.id)}}><Text>-</Text></RemoveSet>

        </ExerciseContainer>
        )
    });
    
    return (
        <View>
            <FlatList
            data={PageDATA}
            renderItem={({ item }) => <ExerciseItem item={item} />}
            keyExtractor={item => item.id}
            extraData={PageDATA}
            contentContainerStyle={{ padding: 16 }}
        />
        <AddSet onPress={() => {console.log(PageDATA)}}><Text>check data</Text></AddSet>
        </View>
        
        );
};


export default WeekContainer;
