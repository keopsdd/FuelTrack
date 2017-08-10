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
            return result;
        }
        this.setState({
            button:false
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
                return <View>
                    <Text>record tatlisko</Text>
                </View>
                break;
            case "ADD":
                return <View style={{flex: 1, height: height - 110}}>
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
                break;
            case "SETTINGS":
                return <View>
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
                        <Button onPress={ () => {
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
                        <Button onPress={ () => {
                            this.setState({
                                button: true
                            })
                        }}>
                            <Text>Hesapla</Text>
                        </Button>
                    </View>
                </View>
                break;
            case "ABOUT":
                return <View>
                    <Text>about tatlisko</Text>
                </View>
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

export
default

connect(mapStateToProps, bindAction)

(
    FooterTabs
)
;
