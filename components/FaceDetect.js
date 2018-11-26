import React from 'react';
import { Platform, StatusBar, StyleSheet, View,Text ,TouchableOpacity} from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';

import {FaceDetector, Camera, Permissions } from 'expo';

export default class FaceDetect extends React.Component {

  state = {
    isLoadingComplete: false,
    hasCameraPermission :  null,
    type: Camera.Constants.Type.back,
  };
//  this.handleFacesDetected = this.handleFacesDetected.bind(this);

async componentDidMount() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  this.setState({ hasCameraPermission: status === 'granted' });
}
handleFacesDetected = ({ faces }) => {

  if(faces.length>0){

    this.props.navigation.navigate('StartQuiz');
  

  }

};

  render() {
   
 

   const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
    
          <Camera  
          type={'front'}
           onFacesDetected={this.handleFacesDetected}
          faceDetectorSettings={{
            mode: FaceDetector.Constants.Mode.fast,
            detectLandmarks: FaceDetector.Constants.Mode.none,
            runClassifications: FaceDetector.Constants.Mode.none,
          }} style={{ flex: 1 }} >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
          
            </View>
          </Camera>
   
    
      )
              
}
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
