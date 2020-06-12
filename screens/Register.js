import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const pressed = () => {
    fetch("https://hohoho-backend.herokuapp.com/register", {
      method: "POST",
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
        /* do something with responseJson and go back to the Login view but
         * make sure to check for responseJson.success! */
        if (responseJson.success) {
          alert("User successfully created!");
          props.navigation.goBack();
        } else {
          alert("This user already exists!");
        }
      })
      .catch(err => {
        /* do something if there was an error with fetching */
        alert("Error registering user: " + err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textBig}>Register</Text>
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
        style={[styles.button, styles.buttonBlue]}
        onPress={pressed}
      >
        <Text style={{ color: "white" }}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

Register.navigationOptions = {
  title: "Register"
};

export default Register;

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
  inputBox: {
    width: 300,
    borderWidth: 1,
    margin: 2,
    height: 40,
    padding: 3
  },
  button: {
    width: 300,
    alignSelf: "stretch",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonBlue: {
    backgroundColor: "#0074D9"
  }
});
