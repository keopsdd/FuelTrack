import React, {Component} from "react";
import {Image} from "react-native";
import {
    Container,
    Content,
    Item,
    Input,
    Button,
    Icon,
    View,
    Text
} from "native-base";
import {Field, reduxForm} from "redux-form";
import {setUser} from "../../actions/user";
import {connect} from 'react-redux';
import styles from "./styles";
import * as firebase from "firebase";

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyA29FldepWaIgYA-0CvJmiGWWStz6CSc5M",
        authDomain: "benzintakip-5f005.firebaseapp.com",
        databaseURL: "https://benzintakip-5f005.firebaseio.com",
        projectId: "benzintakip-5f005",
        storageBucket: "benzintakip-5f005.appspot.com",
    });
}

const validate = values => {
    const error = {};
    error.email = "";
    error.password = "";
    var ema = values.email;
    var pw = values.password;
    if (values.email === undefined) {
        ema = "";
    }
    if (values.password === undefined) {
        pw = "";
    }
    if (ema.length < 8 && ema !== "") {
        error.email = "too short";
    }
    if (!ema.includes("@") && ema !== "") {
        error.email = "@ not included";
    }
    if (pw.length > 12) {
        error.password = "max 11 characters";
    }
    if (pw.length < 5 && pw.length > 0) {
        error.password = "Weak";
    }
    return error;
};

class Login extends Component {
    static propTypes = {
        setUser: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
        this.renderInput = this.renderInput.bind(this);
    }

    setUser(user) {
        this.props.setUser(user);
    }

    async login(email, password) {
        console.log(
            this.props
        );
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log("user:", user);
                // User is signed in.
            } else {
                // No user is signed in.
            }
        });

        try {
            let user = await firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("hata var");
            });
            if (user) {
                let userInfo = {
                    displayName: user.displayName,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    photoURL: user.photoURL,
                    isAnonymous: user.isAnonymous,
                    uid: user.uid,
                    providerData: user.providerData,
                }
                this.setUser(user);
            }
            console.log("result:", result);
            console.log("Logged In!");
            console.log(firebase.auth().currentUser);
            //this.props.navigation.navigate("Home")

            // Navigate to the Home page


        } catch (error) {
            console.log("catch hata:", error.toString())
        }

    }

    renderInput({
        input,
        label,
        type,
        meta: {touched, error, warning},
        inputProps
    }) {
        var hasError = false;
        if (error !== undefined) {
            hasError = true;
        }
        return (
            <Item error={hasError}>
                <Icon active name={input.name === "email" ? "person" : "unlock"}/>
                <Input
                    placeholder={input.name === "email" ? "EMAIL" : "PASSWORD"}
                    {...input}
                />
                {hasError
                    ? <Item style={{borderColor: "transparent"}}>
                    <Icon active style={{color: "red", marginTop: 5}} name="bug"/>
                    <Text style={{fontSize: 15, color: "red"}}>{error}</Text>
                </Item>
                    : <Text/>}
            </Item>
        );
    }

    render() {
        console.log(this.props);
        return (
            <Container>
                <View style={styles.container}>
                    <Content>
                        <View style={styles.bg}>
                            <Field name="email" component={this.renderInput}/>
                            <Field name="password" component={this.renderInput}/>
                            <Button
                                style={styles.btn}
                                //onPress={() => this.signup('abcd@hotmail.com','123456')}
                                onPress={() => this.login('abcd@hotmail.com', '123456')}
                                //onPress={() => this.props.navigation.navigate("Home")}
                            >
                                <Text>Login</Text>
                            </Button>
                            <Button
                                style={styles.btn}
                                //onPress={() => this.signup('abcd@hotmail.com','123456')}
                                onPress={() => this.props.navigation.navigate("SignUp")}
                                //onPress={() => this.props.navigation.navigate("Home")}
                            >
                                <Text>SignUp</Text>
                            </Button>
                        </View>
                    </Content>
                </View>
            </Container>
        );
    }
}


const LoginSwag = reduxForm(
    {
        form: "test",
        validate
    },
    function bindActions(dispatch) {
        return {
            setUser: name => dispatch(setUser(name))
        };
    }
)(Login);
LoginSwag.navigationOptions = {
    header: null
};
export default LoginSwag;
