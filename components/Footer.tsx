import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import styled from 'styled-components/native';

const StyledFooter = styled.View`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    flex-direction: row;
    justify-content: space-around;
    background-color: white;
    `;

export default function Footer() {
    const navigation = useNavigation<any>();

    return (
    <StyledFooter>
        <Button onPress={() => navigation.navigate('HomeTabs')}>Home</Button>
        <Button onPress={() => navigation.navigate('SecondScreen')}>Second</Button>
        <Button onPress={() => navigation.navigate('ThirdScreen')}>Third</Button>
    </StyledFooter>
    );
}
    