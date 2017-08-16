import React, {Component} from "react";
import {TouchableOpacity, View, Dimensions, InteractionManager} from "react-native";
import {connect} from "react-redux";
import {
    Container,
    CardItem,
    Card,
    Content,
    Text,
    Button,
    Left,
    List,
    Tab,
    Tabs
} from "native-base";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as firebase from "firebase";

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
            user: '',
            expense: [],
            fuel: [],
            username: [],
            recordPrice: '',
            records: [],
            userId: 4
        };
    }

    componentDidMount() {
        this.getExpenseRecord();
        this.getFuelRecord()
    }

    getExpenseRecord() {
        firebase.database().ref("/expense/").on('value', (snapshot) => {

            this.setState({expense: snapshot.val()})
        });
    }

    getFuelRecord() {
        firebase.database().ref("/fuel/").on('value', (snapshot) => {

            this.setState({fuel: snapshot.val()})
        });
    }

    renderRow(item) {
        var d = new Date(item.when);
        return (
            <View>
                <Card>
                    <CardItem>
                        <View style={{flexDirection: 'column'}}>
                            <Text>Arac Plaka No: {item.username}</Text>
                            <Text>Yapilan Masraf: {item.recordPrice}</Text>
                            <Text>Masraf Tarihi: {d.toLocaleDateString()}</Text>
                        </View>
                    </CardItem>
                </Card>
            </View>
        )
    }

    renderRow1(item) {
        var d = new Date(item.when);
        return (
            <View>
                <Card>
                    <CardItem>
                        <View style={{flexDirection: 'column'}}>
                            <Text>Arac Plaka No: {item.username}</Text>
                            <Text>Alinan Yakit Fiyati: {item.recordPrice}</Text>
                            <Text>Benzinin Litre Fiyati: </Text>
                            <Text>Alinan Tarih: {d.toLocaleDateString()}</Text>
                        </View>
                    </CardItem>
                </Card>
            </View>
        )
    }

    render() {
        console.log('asdasdasd', this.state.fuel, this.state.expense)

        return (
            <Container style={styles.container}>
                <Tabs>
                    <Tab heading="Fuel">
                        <Content>
                            <Text>Onceki kayitlariniz:</Text>
                            <List dataArray={this.state.fuel} removeClippedSubviews={false}
                                  renderRow={(item) => this.renderRow1(item)}/>
                        </Content>
                    </Tab>
                    <Tab heading="Expense">
                        <Content>
                            <Text>Onceki kayitlariniz:</Text>
                            <List dataArray={this.state.expense} removeClippedSubviews={false}
                                  renderRow={(item) => this.renderRow(item)}/>
                        </Content>
                    </Tab>
                </Tabs>
            </Container>
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
