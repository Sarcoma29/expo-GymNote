import React from "react"
import {Button, GestureResponderEvent, Text} from "react-native"
import styled from "styled-components/native"

const StyledButton = styled.TouchableOpacity`
    padding: 20px;
    margin: 10px;
    width: 120px;
    height: 120px;
    background-color:rgb(255, 123, 0)
`
const StyledText = styled.Text`
    color: #cccccc;
    font-size: 15px;
`

interface myButtonProps {
    count: number;
    onClick: (event: GestureResponderEvent) => void;
}

function MyButton({count, onClick } : myButtonProps ) {
    return (
        <StyledButton onPress={onClick}>
            <StyledText> clicked {count} times</StyledText>
        </StyledButton>
    )
}

export default MyButton;