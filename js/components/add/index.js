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
        this.database = firebase.database();
        this.state = {
            user: '',
            username: [],
            price: '',
            record: '',
            records: [],
            userId: 4
        };
        this.recordsRef = this.database.ref('records');
        this.sendRecord = this.sendRecord.bind(this);
    }

    componentWillMount() {
        this.getRecord();
    }

    getRecord() {
        firebase.database().ref("/user/").on('value', (snapshot) => {

            this.setState({user: snapshot.val()})
        });
    }

    sendRecord() {
        var id = this.state.userId;
        var idid = id +1;
        console.log(idid)
        firebase.database().ref("/user/"+idid).set({
            username: 'mehmet',
            email: 'deneme1@hotmail.com',
            when: new Date().getTime(),
            record: this.state.record
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

    renderRow(item) {
        return(
            <View>
                <Text>{item.username}</Text>
            </View>
        )
    }
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
                    <Title style={{color: 'white'}}>Add Fuel</Title>
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
                    <Text>Benzin ekle</Text>
                    <View style={{width: 100}}>
                        <Input
                            style={{color: 'black', height: 30, width: 100, fontSize: 14, borderWidth: 1}}
                            onChangeText={(t) => this.setState({record: t})}
                            keyboardType='numeric'
                            value={this.state.record}
                        />
                    </View>
                    <Button
                        style={styles.btn}
                        onPress={() => this.sendRecord()}
                    >
                        <Text>data yolla</Text>
                    </Button>
                    <View>
                        <List dataArray={this.state.user} removeClippedSubviews={false}
                              renderRow={(item) => this.renderRow(item)}/>
                    </View>
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
    Add
);
