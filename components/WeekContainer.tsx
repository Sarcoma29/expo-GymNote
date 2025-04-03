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
    background-color:rgba(255, 255, 255, 0.78);
    border-radius: 20px;
    border: 1px solid rgb(0, 0, 0);
`;

const SetRow = styled.View`
    color:rgba(0, 0, 0, 0.99);
    flex-direction: row;
    width: 100%;
    padding: 10px;
    background-color:rgb(18, 95, 219);
    margin-bottom: 5px;
    border-radius: 8px;
    border: 1px solid rgb(0, 0, 0);
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
    width: 55px;
    height: 40px;
    background-color: green;
    border-radius: 0px 12px 12px 0px;

`;

const RemoveSet = styled.TouchableOpacity`
    width: 55px;
    height: 40px;
    background-color: red;
    border-radius: 12px 0px 0px 12px;

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
    left: 10px;
    bottom: 10px;
    border-radius: 10px;
    border: 1px solid rgb(0, 0, 0);
`
const StyledExerciseHeader = styled.View`
margin-left: 20px;
display: flex;
flew-wrap: nowrap;
flex-direction: row;

`

const StyledExerciseHeaderText = styled.Text`
padding: 5px 30px;
font-size: 10px;
`


const StyledButtonsInner = styled.View`
position: absolute;
right: 10px;
bottom: 10px;
`

const StyledButtons = styled.View`
width: 111.9px;
z-index: 10;
display: flex;
flex-direction: row;
border-radius: 12.4px;
border: 1px solid rgb(0, 0, 0);
`
const StyledPlus = styled.Text`
color: black;
font-size: 32px;
position: absolute;
top: -4px;
right: 20px;
`;

const StyledMinus = styled.Text`
color: black;
font-size: 32px;
position: absolute;
top: -4px;
right: 20px;
`;


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

    const ExerciseHeader = () => {
        return (
            <StyledExerciseHeader>
                <StyledExerciseHeaderText>№</StyledExerciseHeaderText>
                <StyledExerciseHeaderText>Вес</StyledExerciseHeaderText>
                <StyledExerciseHeaderText>Повторы</StyledExerciseHeaderText>
            </StyledExerciseHeader>
        )
        
    }
    
    const ExerciseItem = memo(({ item }: { item: ExerciseData }) => {
        const [localTitle, useLocalTitle] = useState(item.title)
        return (
        <ExerciseContainer style = {{paddingBottom: 60}}>
            <ExerciseTitle 
            value = {localTitle}
            onChangeText = {useLocalTitle}
            onBlur = {() => {handleTitleSet(item.id, localTitle)}}
            />
            <ExerciseHeader></ExerciseHeader>
            {item.sets.map((set, index) => (
            <SetItem 
            key={`set-${index}`}
            exerciseId={item.id}
            set={set}
            index={index}
            />
            ))}

            <StyledButtonsInner>
                <StyledButtons>
                    <RemoveSet onPress={() => {handleRemoveSet(item.id)}}><StyledMinus>-</StyledMinus></RemoveSet>
                    <AddSet onPress={() => {handleAddSet(item.id)}}><StyledPlus>+</StyledPlus></AddSet>
                </StyledButtons>
            </StyledButtonsInner>
                

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
