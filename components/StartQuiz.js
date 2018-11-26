import React from "react";
import { View, Text ,Button,StyleSheet,ScrollView,Alert} from "react-native";
import RadioForm from 'react-native-simple-radio-button';

class StartQuiz extends React.Component {
  constructor()
  {
    super()
    this.state ={
      title:"Start Quiz",
      start:false,
      index:0,
      correct : 0,
      Quiz: {
        results:[
          {
        
            incorrect_answers : []
          }
        ],
       },
    
    }
  }
async componentDidMount()
{
  const {Quiz,correct} =this.state;
  let data = await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
  let data1 =await data.json();
   this.setState({Quiz : data1 }); 
}

 final()
 {
   return(
    Alert.alert(
      'Your Score is '+this.state.correct,
      'You Want to Play Again',
      [
        {text: 'Yes', onPress: () => {this.setState({start:false}) 
        this.props.navigation.navigate('FaceDetect')}},
      
        {text: 'No', onPress: () =>this.setState({start:false})},
      ],
      { cancelable: false }
    )
   )
     
 }   
    render() {
      let {Quiz,start,correct}=this.state;
      this.state.Quiz.results.length && console.log("Quiz Data ***",Quiz.results)
    
      if(!start)
    {
      return (
       <View style={{flex : 1, flexDirection :"column",justifyContent: 'center',}}> 
        <Button
        onPress={()=> this.setState({start:true})}
        title={this.state.title}
        color="black"
        />
      
    </View>
    );
  }
  else
    { 
      return (
      <View style={styles.container}>
      
       
          <ScrollView>
         
            
            {  Quiz.results.map((v, i) => {
                var radio_props = [
                  { label: v.correct_answer, value: v.correct_answer },
                  { label: v.incorrect_answers[0], value: v.incorrect_answers[0] },
                  { label: v.incorrect_answers[1], value: v.incorrect_answers[1] },
                  { label: v.incorrect_answers[2], value: v.incorrect_answers[2] }
                ];
                 return (   <View key={`${v.category}_${i}`}>
                      <Text style={{ marginBottom: 5 }}>Q NO {i+1}. {v.question}</Text>

                      <RadioForm radio_props={radio_props}
                        formHorizontal={false}
                        labelHorizontal={true}
                        buttonColor={'blue'}
                        animation={false}
                        initial={-1}
                        onPress={(value) => { this.setState({ value, correct: (value === v.correct_answer) ? ++correct : correct }) }}
                      />

    
                    </View>
                 )


                })
                
              }
                                   <Button
        onPress={()=> this.final()}
        title="Submit"
        color="black"
        />

                
                </ScrollView>
                </View>
                )



    }
    
    }
  }

  export default StartQuiz;
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    valueText: {
        fontSize: 18, 
        marginBottom: 50,
    },
});