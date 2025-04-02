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

const DATA: ExerciseData[] = []


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

const AddExercise = styled.TouchableOpacity`
padding: 10px;
    width: 50px;
    background-color: green;
`

const RemoveExercise = styled.TouchableOpacity`
    padding: 10px;
    width: 70px;
    background-color: red;
    position: absolute;
    left: 10;
    bottom: 10;
    border-radius: 10px;
`


const WeekContainer = () => {
    const route = useRoute();
    const params = route.params as RouteParams;
    const [PageDATA, setPageDATA] = useAsyncStorage(params.weekId.toString(), DATA) 

    const [selectedId, setSelectedId] = useState<string>();

    console.log(route.params)

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

    // добавление/удаление подходов внутри упражения
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

        // добавление/удаление блоков с упражнением

        const handleAddExercise = () => {
            const newExercise = {
                id: Date.now().toString(),
                title: "Exercise 1",
                sets: [[1, 20, 10], [2, 50, 10], [3, 60, 10]]
            }
            console.log(...PageDATA)
            setPageDATA([...PageDATA, newExercise])

        };

        const handleRemoveExercise = (exerciseId: string) => {
            setPageDATA(prevData =>
                prevData.filter(item => item.id !== exerciseId )
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

            <RemoveExercise onPress={() => {handleRemoveExercise(item.id)}}><Text>Delete</Text></RemoveExercise>
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
        <AddExercise onPress={(handleAddExercise)}><Text>Add new exercise</Text></AddExercise>
        </View>
        
        );
};


export default WeekContainer;
