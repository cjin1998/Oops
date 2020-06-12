import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  LoginScreen,
  RegisterScreen,
  UserScreen,
  MessagesScreen
} from "./screens";
import { SCREENS } from "./constants";

const Navigator = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    Users: UserScreen,
    Messages: MessagesScreen
  },
  { initialRouteName: SCREENS.LOGIN }
);

export default createAppContainer(Navigator);
