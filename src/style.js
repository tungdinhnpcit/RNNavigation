import React, { Component } from "react";
import { StyleSheet } from "react-native";

export default AppStyle = {
  containerView: {
    width: "100%",
    height: "100%",
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: "center",
  },
  loginFormView: {
    flex: 1,
    // width:'100%',
  },
  loginFormTextInput: {
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  textLoginButton: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: "transparent",
  },
  regFormView: {
    flex: 1,
    // width:'100%',
  },
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
    paddingHorizontal: 10,
  },
  regFormTextInput: {
    fontSize: 12,
    width: "70%",
    backgroundColor: "#fafafa",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  regButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    width: 150,
    marginTop: 10,
    marginLeft: 10,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  regText: {
    color: 'white',
    fontSize: 10,
  },
  mapContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  map: {
    position: "absolute",
    top: "25%",
    left: 0,
    right: 0,
    bottom: 0,
  },
  homeView: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
  },
  searchView: {
    flexDirection: "row",
  },
  buttonSearch: {
    marginBottom: 10,
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#f7fffd",
    paddingTop: 10,
    paddingBottom: 10,
    width: "75%",
    backgroundColor: "white",
    justifyContent: "center",
  },
  viewCity: {
    flexDirection: "row",
  },
  buttonCity: {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#f7fffd",
    width: "25%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  viewImageCity: {
    paddingTop: 10,
    paddingLeft: 5,
  },
  imageCity: {
    height: 10,
    width: 10,
  },
  location: {},
  locationView: {
    flexDirection: "row",
  },

  buttonLocation: {},
  locationText: {
    paddingLeft: 10,
    paddingBottom: 10,
    fontSize: 8,
    width: "90%",
  },
  imageLocationView: {
    width: "5%",
  },
  imageLocation: {
    width: 20,
    height: 20,
    marginTop: 5,
  },
  imageLocationViewNext: {
    width: "5%",
  },
  imageLocationNext: {
    width: 10,
    height: 10,
    marginTop: 4,
  },
  productView: {
    height: 150,
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 50,
    paddingBottom: 5,
    flexDirection: 'row',

  },
  product: {
    flexDirection: 'column'
  },
  productTitle: {
    paddingLeft: 10,
    fontSize: 14,
  },
  productAdd: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    alignItems: 'center',
  },
  productIconAdd: {
    width: 30,
    height: 30
  },
  productNumber: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 16
  },
  viewDelivery: {
    borderWidth: 1,
    borderColor: '#ebebeb',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonDelivery: {
    borderWidth: 1,
    borderColor: '#fddfdf',
    borderRadius: 15,
    backgroundColor: '#f70000',
    justifyContent: 'center',

  },
  textDelivery: {
    textAlign: 'center',
    color: 'white'
  },
  viewButtonDelivery: {
    width: "40%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewButtonCart: {
    width: "60%",
    paddingLeft: 10,
    //justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  textViewButtonCart: {
    marginLeft: 10
  }
};
