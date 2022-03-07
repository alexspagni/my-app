////////ALL IMPORT///////////////
import React ,{useEffect, useState}from 'react';
import Checkbox from 'expo-checkbox';
import {View,Text,StyleSheet,FlatList,TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {getImageMars} from '../api/getImage'; 
import PhotoComponent from '../components/PhotoComponent';
import { Feather } from '@expo/vector-icons';
////////////COMPONENT////////////
const IndexScreen = ({ navigation }: any)=>{
    //////HOOKS//////////////
    const images=useSelector((store: any)=>store?.images);
    const dispatch = useDispatch();
    const [isChecked, setChecked] = useState(false);

    const getImageFromMars = async () => {
        const results= await getImageMars("curiosity");
        dispatch({
            type:'images_add_mars',
            payload:results
        })
    }

    useEffect( () => {
        getImageFromMars();
    },[])

    return (
       <View style={styles.containerPrincipal}>
           <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined}
        />

        {images.length?<Text style={styles.TextStyle}>Here you can find some photos about mars rover</Text>:<Text style={styles.TextStyle}>no photo found</Text>}
        
        <FlatList
           data={images}
           keyExtractor={(item)=>item.id}
           renderItem ={({item})=>
           <View style={styles.container}>
            <TouchableOpacity onPress={()=>navigation.navigate('Show',{image:item})}>  
                <PhotoComponent object={item}/>
            </TouchableOpacity>
           </View>
           }
           
           />
          
        </View>
    );
    
};

    
//<SearchBar term={term}  onTermChange={(newterm)=>setTerm(newterm)}/>

const styles=StyleSheet.create({
    container :{
        marginBottom:10,
        alignItems:'center'
        
    },
    containerPrincipal:{
        backgroundColor:'black',
        flex:1
    },
    TextStyle:{
        color:'white'

    },
    checkbox: {
        margin: 8,
      }
});
IndexScreen.navigationOptions=({navigation}:any)=>{
    return{
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Feather name="search" size={30} />
            </TouchableOpacity>
          )
    
    };
};


export default IndexScreen;
/*
    const getImage = async () => {
        const results= await getImageApi();
        console.log(results);
        
        dispatch(addElementsToLibraries(results))
    }
    useEffect( () => {
        getImage();
       // console.log(results);
        
    },[])
    */