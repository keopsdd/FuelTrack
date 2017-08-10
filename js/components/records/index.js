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

class Records extends Component {
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
                <Text>record tatlisko</Text>
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
    Records
);
