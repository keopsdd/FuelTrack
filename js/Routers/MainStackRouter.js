import React, { Component } from "react";
import Login from "../components/login/";
import Home from "../components/home/";
import BlankPage from "../components/blankPage";
import HomeDrawerRouter from "./HomeDrawerRouter";
import FooterTabs from "../components/footerTabs";
import { StackNavigator } from "react-navigation";
import { Header, Left, Button, Icon, Body, Title, Right } from "native-base";
HomeDrawerRouter.navigationOptions = ({ navigation }) => ({
  header: null
});
export default (StackNav = StackNavigator({
  Login: { screen: Login },
  Home: { screen: Home },
  BlankPage: { screen: BlankPage },
  FooterTabs: { screen: FooterTabs },
}));