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
        var uid = firebase.auth().currentUser.uid;

        firebase.database().ref("/user/" + uid + "/record/plate1/expense/" + "/detail/").on('value', (snapshot) => {
            this.setState({expense: snapshot.val()})
        });
    }

    getFuelRecord() {
        var uid = firebase.auth().currentUser.uid;

        firebase.database().ref("/user/" + uid + "/record/plate1/fuel/" + "/detail/").on('value', (snapshot) => {
            this.setState({fuel: snapshot.val()})
        });
    }

    renderRowFuel(item) {
        var date = item.when;
        var today = new Date(date);
        return (
            <View>
                <Card>
                    <CardItem>
                        <View style={{flexDirection: 'column'}}>
                            <Text>Tarih: {today.toLocaleDateString()}</Text>
                            <Text>Alinan istasyon: {item.where}</Text>
                            <Text>Alinan Tutar: {item.fuelPrice}</Text>
                            <Text>Litre fiyati: {item.priceOfLiter}</Text>
                            <Text>Alinan litre: {item.amountOfLiter}</Text>
                            <Text>Gidilebilecek yol: {item.distance}</Text>
                        </View>
                    </CardItem>
                </Card>
            </View>
        )
    }

    renderRowExpense(item) {
        var date = item.when;
        var today = new Date(date);
        return (
            <View>
                <Card>
                    <CardItem>
                        <View style={{flexDirection: 'column'}}>
                            <Text>Tarih: {today.toLocaleDateString()}</Text>
                            <Text>Aciklama {item.description}</Text>
                            <Text>Masraf turu: {item.expenseType}</Text>
                            <Text>Tutar: {item.expensePrice}</Text>
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
                                  renderRow={(item) => this.renderRowFuel(item)}/>
                        </Content>
                    </Tab>
                    <Tab heading="Expense">
                        <Content>
                            <Text>Onceki kayitlariniz:</Text>
                            <List dataArray={this.state.expense} removeClippedSubviews={false}
                                  renderRow={(item) => this.renderRowExpense(item)}/>
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
