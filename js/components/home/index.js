import React, {Component} from "react";
import {TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import BlankPage2 from "../blankPage2";
import FooterTabs from '../footerTabs';
import DrawBar from "../DrawBar";
import {DrawerNavigator, NavigationActions} from "react-navigation";
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Left,
    Body,
    Right,
    Footer,
    FooterTab,
    Fab,
} from "native-base";
import {Grid, Row} from "react-native-easy-grid";

import ActionButton from 'react-native-action-button';

import Icon from 'react-native-vector-icons/FontAwesome';

import {setIndex} from "../../actions/list";
import {openDrawer} from "../../actions/drawer";
import styles from "./styles";

class Home extends Component {

    static navigationOptions = {
        header: null
    };

    static propTypes = {
        name: React.PropTypes.string,
        setIndex: React.PropTypes.func,
        list: React.PropTypes.arrayOf(React.PropTypes.string),
        openDrawer: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0
        };
    }

    newPage(index) {
        this.props.setIndex(index);
        Actions.blankPage();
    }

    switchScreen(tabIndex) {
        this.setState({tabIndex: tabIndex});
        //this.state.tabIndex = tabIndex;
        if (tabIndex == 0) {

        }
    }

    renderSelectedTab() {
        switch (this.state.tabIndex) {
            case 0:
                return (<FooterTabs type="HOME"/>);
                break;
            case 1:
                return (<FooterTabs type="RECORDS"/>);
                break;
            case 2:
                return (<FooterTabs type="ADD"/>);
                break;
            case 3:
                return (<FooterTabs type="EXTRAS"/>);
                break;
            case 4:
                return (<FooterTabs type="SETTINGS"/>);
                break;
        }
    }

    render() {
        console.log(DrawNav, "786785786");
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
                    <Title style={{color: 'white'}}>Benzin Takip</Title>
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
                    {this.renderSelectedTab()}
                </Content>
                <Footer>
                    <FooterTab>
                        <Button vertical active={ this.state.tabIndex == 0 ? true : false }
                                onPress={ this.switchScreen.bind(this, 0) }
                        >
                            <Icon
                                name='home'
                                size={20}
                            />
                            <Text style={styles.footerText}>Home</Text>
                        </Button>
                        <Button vertical active={ this.state.tabIndex == 1 ? true : false }
                                onPress={ this.switchScreen.bind(this, 1) }
                        >
                            <Icon
                                name='bars'
                                size={20}
                            />
                            <Text style={styles.footerText}>Records</Text>
                        </Button>
                        <Button style={{marginBottom: 75}}>
                            <ActionButton buttonColor="rgba(231,76,60,1)" position={'center'} spacing={10}
                                          degrees={135}>
                                <ActionButton.Item buttonColor='#9b59b6' title="ADD FUEL"
                                                   onPress={() => console.log("notes tapped!")} spaceBetween={-120}>
                                    <Icon name="wrench" style={styles.actionButtonIcon}/>
                                </ActionButton.Item>
                                <ActionButton.Item buttonColor='#3498db' title="ADD EXPENSE" onPress={() => {
                                }} spaceBetween={-120}>
                                    <Icon name="wrench" style={styles.actionButtonIcon}/>
                                </ActionButton.Item>
                            </ActionButton>
                        </Button>
                        <Button vertical active={ this.state.tabIndex == 3 ? true : false }
                                onPress={ this.switchScreen.bind(this, 3) }
                        >
                            <Icon
                                name='question-circle'
                                size={20}
                            />
                            <Text style={styles.footerText}>Extras</Text>
                        </Button>
                        <Button vertical active={ this.state.tabIndex == 4 ? true : false }
                                onPress={ this.switchScreen.bind(this, 4) }
                        >
                            <Icon
                                name='cog'
                                size={20}
                            />
                            <Text style={styles.footerText}>Settings</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        setIndex: index => dispatch(setIndex(index)),
        openDrawer: () => dispatch(openDrawer())
    };
}
const mapStateToProps = state => ({
    name: state.user.name,
    list: state.list.list
});

const HomeSwagger = connect(mapStateToProps, bindAction)(Home);
const DrawNav = DrawerNavigator(
    {
        Home: {screen: HomeSwagger},
        BlankPage2: {screen: BlankPage2}
    },
    {
        contentComponent: props => <DrawBar {...props} />
    }
);
const DrawerNav = null;
DrawNav.navigationOptions = ({navigation}) => {
    DrawerNav = navigation;
    return {
        header: null
    };
};
export default DrawNav;
