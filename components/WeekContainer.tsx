import { View, Text, TextInput } from 'react-native';
import React from 'react';
import styled from 'styled-components/native'

const StyledExerciseInner = styled.View`
    align-items: center;    
    width: 75%;
    padding: 10px;
    margin: 10px;
    background-color: #cccccc;
    border-radius: 20px;
    border: 1px solid rgba(0, 0, 0, 0);
`

const TextExerciseInner = styled.View`
    width: 65%;
    padding: 10px;
    margin: 10px;
    background-color:rgba(204, 204, 204, 0.73);
    border-radius: 20px;
    border: 1px solid rgb(0, 0, 0);
`


const WeekContainer = () => {
    return (
        <StyledExerciseInner>

            <Text>Exercise 1</Text>

            <TextExerciseInner>
                <TextInput>Жим лежа</TextInput>
            </TextExerciseInner>
                
            <TextExerciseInner>
                <TextInput>50кг</TextInput>
            </TextExerciseInner>

            <TextExerciseInner>
                <TextInput>20 раз</TextInput>
            </TextExerciseInner>
            
        </StyledExerciseInner>
    )
}

export default WeekContainer;