import React, {Component} from "react";
import {TouchableOpacity, View, Dimensions} from "react-native";
import {connect} from "react-redux";
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Left,
    Right,
    Body,
    Input
} from "native-base";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';

const {height, width} = Dimensions.get('window');

import styles from "./styles";

class Add extends Component {
    static navigationOptions = {
        header: null
    };
    static propTypes = {
        name: React.PropTypes.string,
        index: React.PropTypes.number,
        list: React.PropTypes.arrayOf(React.PropTypes.string),
        openDrawer: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            distance: '',
            literPrice: '',
            expense: '',
            result: 0,
            button: false
        };
    }

    experimentFuelPrice() {
        let literPrice = this.state.literPrice;
        let distance = this.state.distance;
        let spentFuel = 5;
        if (this.state.button) {
            let result = (distance / 100) * spentFuel * literPrice;
            //result = 1000;
            return result;
        }

        if (this.state.button)
            this.setState({
                button: false
            })
    }

    render() {
        return (
            <View style={{flex: 1, height: height - 110}}>
                <Text>add tatlisko</Text>
                <View style={{height: height - 130}}>
                    <ActionButton buttonColor="rgba(231,76,60,1)" position={'center'}>
                        <ActionButton.Item buttonColor='#9b59b6' title="ADD FUEL"
                                           onPress={() => console.log("notes tapped!")}>
                            <Icon name="wrench" style={styles.actionButtonIcon}/>
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor='#3498db' title="ADD EXPENSE" onPress={() => {
                        }}>
                            <Icon name="wrench" style={styles.actionButtonIcon}/>
                        </ActionButton.Item>
                    </ActionButton>
                </View>
            </View>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer())
    };
}

const
    mapStateToProps = state => ({
        name: state.user.name,
        index: state.list.selectedIndex,
        list: state.list.list
    });

export default connect(mapStateToProps, bindAction)

(
    Add
);
