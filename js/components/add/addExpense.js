import React, {Component} from "react";
import {TouchableOpacity, View, Dimensions, ListView} from "react-native";
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
    Input,
    List
} from "native-base";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from "firebase";


const {height, width} = Dimensions.get('window');

import styles from "./styles";

class AddExpense extends Component {
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
        this.database = firebase.database();
        this.state = {
            user: '',
            username: [],
            recordPrice: '',
            records: [],
            userId: 4
        };
        this.recordsRef = this.database.ref('records');
        this.sendExpenseRecord = this.sendExpenseRecord.bind(this);
    }

    sendExpenseRecord() {
        var uid = firebase.auth().currentUser.uid;

        firebase.database().ref("/user/" + uid + "/record/plate1/expense/" + "/detail/" + 2).set({
            description: 'bole bole harcadik',
            expenseType: 'kopru',
            when: new Date().getTime(),
            expensePrice: this.state.recordPrice
        });
    }

    /*sendRecord() {
     this.recordsRef.transaction((records) =>{
     if(!records){
     records = [];
     }
     records.push(this.state.records);
     this.setState({record:''});
     return records;
     });
     }
     /*}

     */

    render() {
        console.log(this.state.user)

        return (
            <Container style={styles.container}>
                <Header style={{backgroundColor: '#031499'}}>
                    <Left>
                        {/*
                         <Button
                         transparent
                         onPress={() => {
                         DrawerNav.dispatch(
                         NavigationActions.reset({
                         index: 0,
                         actions: [NavigationActions.navigate({routeName: "Home"})]
                         })
                         );
                         DrawerNav.goBack();
                         }}
                         >
                         <Icon active name="power"/>
                         </Button>
                         */}
                    </Left>
                    <Body>
                    <Title style={{color: 'white'}}>Add Expense</Title>
                    </Body>
                    <Right>
                        {/*
                         <Button
                         transparent
                         onPress={() => this.props.navigation.navigate("Login")}
                         >
                         <Icon active name="menu" />
                         </Button>
                         */}
                    </Right>
                </Header>
                <Content>
                    <Text>Masraf ekle</Text>
                    <View style={{width: 100}}>
                        <Input
                            style={{color: 'black', height: 30, width: 100, fontSize: 14, borderWidth: 1}}
                            onChangeText={(t) => this.setState({recordPrice: t})}
                            keyboardType='numeric'
                            value={this.state.recordPrice}
                        />
                    </View>
                    <Button
                        style={styles.btn}
                        onPress={() => this.sendExpenseRecord()}
                    >
                        <Text>data yolla</Text>
                    </Button>
                </Content>
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
    AddExpense
);
