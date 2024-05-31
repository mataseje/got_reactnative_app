import { Text, StyleSheet, View, Button, Image, ImageBackground} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import img_tyrion from './assets/tyrion.jpg';
import img_jon from './assets/jon_snow.jpg';
import img_daenerys from './assets/daenerys.jpg';
import img_sansa from './assets/sansa.jpg';
import img_jaime from './assets/jaime.jpg';
import img_arya from './assets/arya.jpg';
import img_got from './assets/GOT.jpg';
import './assets/throne.jpg';


export default function App() {

  const [quoteData, setQuoteData] = useState("");
  const [character, setCharacter] = useState("");
  const [selected, setSelected] = useState(false);

  const data =[
    {label:'Jon Snow', value:'jon'},
    {label:'Danaerys Targaryen', value:'daenerys'},
    {label:'Jaime Lannister', value:'jaime'},
    {label:'Arya Stark', value:'arya'},
    {label:'Tyrion Lannister', value:'tyrion'},
    {label:'Sansa Stark', value:'sansa'},
  ];

  switch (character){
    case 'tyrion':
      imageSource = img_tyrion;
      break;
    case 'jon':
      imageSource = img_jon;
      break;
    case 'daenerys':
      imageSource = img_daenerys;
      break;
    case 'sansa':
      imageSource = img_sansa;
      break;
    case 'jaime':
      imageSource = img_jaime;
      break;
    case 'arya':
      imageSource = img_arya;
      break;
    default:
      imageSource= img_got;
  }

  async function getQuoteData(){
    try{
      let response = await fetch(`https://api.gameofthronesquotes.xyz/v1/author/${character}`);
      let jsonData = await response.json();

      setQuoteData(jsonData);
    } catch{
      console.log(error);
    }
  }
  
  const selectCharacter = (item) => {
    quoteData.sentence = '';
    setCharacter(item.value);
    setSelected(true);
  }

  return (
    <ImageBackground source={require('./assets/throne.jpg')} style={styles.container}>
    <View style ={styles.overlay }>
      <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Choose Game of Thrones Character"
              searchPlaceholder="Search..."
              value={character}
              onChange={selectCharacter}
              renderLeftIcon={() => (
                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
              )}
            />
      <Image
        source={imageSource}
        style={{alignSelf: 'center', marginTop: 75, borderRadius: 50}}
      />
      {selected? (
        <View style={{paddingTop: 20, justifyContent: 'center'}}>
          <Button title="New Quote" onPress={getQuoteData}/>
          <Text style={styles.quoteText}>{'\n'}{'\n'}{quoteData.sentence}</Text>
        </View>
        ) : null
      }

    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  quoteText:{
    fontFamily: 'Arial',
    fontSize: 18,
    textAlign: 'center', 
    paddingLeft: 20, 
    paddingRight:20,
  },
    container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
    overlay: {
    paddingTop:100,
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.85)', // This is the overlay color and opacity

  },
});
