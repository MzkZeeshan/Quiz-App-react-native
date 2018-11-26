import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import FaceDetect from "./components/FaceDetect"
import StartQuiz from "./components/StartQuiz"

class App extends React.Component {
  render() {
    return (
   
   
     <Navigation/>
     
  
       
    );
  }
}

const AppNavigators = createStackNavigator({
  
  StartQuiz :
  {
    screen :StartQuiz
  },
  FaceDetect: {
    screen: FaceDetect
  }
});
const Navigation = createAppContainer(AppNavigators);

export default App;


