import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from "react-native";
import { SCREENS } from "../constants";

function Login(props) {
  const { navigation } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    // TODO: Implement login logic here
    fetch("https://hohoho-backend.herokuapp.com/login", {
      method: "POST",
      redirect: "follow",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.success) {
          props.navigation.navigate("Users");
        } else {
          alert("Login failed!");
        }
      })
      .catch(err => {
        /* do something if there was an error with fetching */
        alert(err);
      });
  }

  function register() {
    navigation.navigate(SCREENS.REGISTER);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textBig}>Login to Oops!</Text>
      <TextInput
        style={styles.inputBox}
        placeholder="Enter your username"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.inputBox}
        placeholder="Enter your password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity
        onPress={login}
        style={[styles.button, styles.buttonGreen]}
      >
        <Text style={styles.buttonLabel}>Tap to Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonBlue]}
        onPress={register}
      >
        <Text style={styles.buttonLabel}>Tap to Register</Text>
      </TouchableOpacity>
    </View>
  );
}

Login.navigationOptions = {
  title: "Login"
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  textBig: {
    fontSize: 36,
    textAlign: "center",
    margin: 10
  },
  button: {
    alignSelf: "stretch",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  buttonBlue: {
    backgroundColor: "#0074D9"
  },
  buttonGreen: {
    backgroundColor: "#2ECC40"
  },
  buttonLabel: {
    textAlign: "center",
    fontSize: 16,
    color: "white"
  },
  inputBox: {
    width: 300,
    borderWidth: 1,
    margin: 2,
    height: 40,
    padding: 3
  }
});
