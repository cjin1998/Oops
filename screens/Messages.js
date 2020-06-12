import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableOpacity
} from "react-native";
//import console = require('console');

Messages.navigationOptions = {
  title: "Messages"
};

function Messages(props) {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });

  const [dataSource, setDataSource] = useState(
    ds.cloneWithRows([["LOADING.."]])
  );

  fetch("https://hohoho-backend.herokuapp.com/messages", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log(response.Json);
      if (responseJson.success)
        setDataSource(ds.cloneWithRows(responseJson.users));
      else {
        alert("Error fetching users");
      }
    })
    .catch(err => {
      alert(err);
    });

  return (
    <View style={styles.container}>
      <Text style={styles.textBig}>Users</Text>

      {/* <ListView
                dataSource={dataSource}
                renderRow={rowData =>
                <View style={styles.user}>                    
                    <Text>To: {rowData.to.username}</Text>
                    <Text>From: {rowData.from.username}</Text>
                    <Text>Body: {rowData.body}</Text>
                </View>
                }
    /> */}
    </View>
  );
}

export default Messages;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  textBig: {
    fontSize: 36,
    textAlign: "center",
    margin: 10
  },
  user: {
    borderWidth: 1,
    fontSize: 16,
    padding: 20
  }
});
