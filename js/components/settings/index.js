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

class Settings extends Component {
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
            <View>
                <Text>Hesaplama</Text>
                <Text>Mesafe Girin</Text>
                <Input style={{color: 'black', height: 30, width: 75, fontSize: 14, borderWidth: 1}}
                       onChangeText={(distance) => this.setState({distance})}
                       keyboardType='numeric'
                       value={this.state.distance}
                />
                <Text>Benzin Litre Fiyati Girin</Text>
                <Input style={{color: 'black', height: 30, width: 75, fontSize: 14, borderWidth: 1}}
                       onChangeText={(literPrice) => this.setState({literPrice})}
                       keyboardType='numeric'
                       value={this.state.literPrice}
                />
                <View style={{marginTop: 10}}>
                    <Button onPress={() => {
                        this.setState({
                            button: true
                        })
                    }}>
                        <Text>Hesapla</Text>
                    </Button>
                </View>
                <View>
                    <Text>
                        Aracinizin yakit masrafi: {this.experimentFuelPrice()} TL
                    </Text>
                </View>
                <View style={{marginTop: 10}}>
                    <Text>Ekstra masraf ekle</Text>
                    <Input style={{color: 'black', height: 30, width: 75, fontSize: 14, borderWidth: 1}}
                           onChangeText={(expense) => this.setState({expense})}
                           keyboardType='numeric'
                           value={this.state.expense}
                    />
                    <Button onPress={() => {
                        this.setState({
                            button: true
                        })
                    }}>
                        <Text>Hesapla</Text>
                    </Button>
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
    Settings
);
