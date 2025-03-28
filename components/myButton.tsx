import React from "react"
import {Button, GestureResponderEvent, Text} from "react-native"
import styled from "styled-components/native"

const StyledButton = styled.TouchableOpacity`
    padding: 20px;
    width: 35%;
    height: 120px;
    background-color:rgb(204, 0, 255);
`
const StyledText = styled.Text`
    color:rgb(0, 0, 0);
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