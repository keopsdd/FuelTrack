import React, {Component} from "react";
import {TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Icon,
    Left,
    Right,
    Body
} from "native-base";

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
            case "SETTINGS":
                return <View>
                    <Text>settings tatlisko</Text>
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
