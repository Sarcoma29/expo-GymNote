import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components/native'


type ExerciseData = {
    id: string,
    // название упражение
    title: string,
    // массив всех подходов, подходов может быть n количество
    sets: number[][]
    
}

const DATA: ExerciseData[] = [
    {
        id: '1',
        title: "жим лежа",
        sets: [[1, 20], [2, 15], [3, 12], [4, 8], [5, 6]]
    },
    {
        id: '2',
        title: "бабочка",
        sets: [[1, 20], [2, 15], [3, 12], [4, 8]]
    },
    {
        id: '3',
        title: "Подъём на бицепс",
        sets: [[1, 20], [2, 15], [3, 12], [4, 8]]
    }
]


// Стилизованные компоненты
const ExerciseContainer = styled.View`
    align-items: center;    
    width: 320px;
    padding: 10px;
    margin: 10px;
    background-color: #cccccc;
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0);
`;

const SetRow = styled.View`
    flex-direction: row;
    width: 100%;
    padding: 10px;
    background-color: rgb(134, 134, 134);
    margin-bottom: 5px;
    border-radius: 8px;
`;

const ExerciseTitle = styled.Text`
    flex-wrap: nowrap;
    font-size: 32px;
    color: #000;
    margin-bottom: 10px;
`;

const SetCell = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;


const SetItem = ({ set }: { set: number[] }) => (
    <SetRow>
        <SetCell>
            <Text>{set[0]}</Text>
        </SetCell>
        <SetCell>
        <TextInput 
            value={String(set[1])}
            keyboardType="numeric"
            style={{ textAlign: 'center' }}
        />
        </SetCell>
    </SetRow>
);

const ExerciseItem = ({ item }: { item: ExerciseData }) => (
    <ExerciseContainer>
        <ExerciseTitle>{item.title}</ExerciseTitle>
        {item.sets.map((set, index) => (
        <SetItem key={`set-${index}`} set={set} />
    ))}
    </ExerciseContainer>
);

const WeekContainer = () => {
    const [selectedId, setSelectedId] = useState<string>();

    return (
        <FlatList
            data={DATA}
            renderItem={({ item }) => <ExerciseItem item={item} />}
            keyExtractor={item => item.id}
            extraData={selectedId}
            contentContainerStyle={{ padding: 16 }}
        />
        );
};


export default WeekContainer;