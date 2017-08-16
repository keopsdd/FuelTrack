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
import Settings from '../settings'
import Add from '../add'
import Extras from '../extras'
import Record from '../records'

const {height, width} = Dimensions.get('window');

import styles from "./styles";

class FooterTabs extends Component {
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

    renderTab() {
        let tabType = this.props.type;
        switch (tabType) {
            case "HOME":
                return <View>
                    <Text>ana sayfa tatlisko</Text>
                </View>
                break;
            case "RECORDS":
                return <Record/>
                break;
            case "EXTRAS":
                return <Extras/>
                break;
            case "SETTINGS":
                return <Settings/>
                break;
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content padder>
                    {this.renderTab()}
                </Content>
            </Container>
        );
    }
}

function

bindAction(dispatch) {
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
    FooterTabs
)
;
