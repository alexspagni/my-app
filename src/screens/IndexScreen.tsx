////////ALL IMPORT///////////////
import React ,{useEffect, useState}from 'react';
import Checkbox from 'expo-checkbox';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {getImageMars} from '../api/getImage'; 
import PhotoComponent from '../components/PhotoComponent';
import { addElementsToLibrariesMars,addElementsToLibrariesHide } from '../reducers/getImagesReducers';
import { Feather } from '@expo/vector-icons';
////////////COMPONENT////////////
let pageNumber=1;
const IndexScreen = ({ navigation }: any)=>{
    //////HOOKS//////////////
    const images=useSelector((store: any)=>store?.images);
    const dispatch = useDispatch();
    const hide=useSelector((store: any)=>store?.imagesHide);
    
    const [isChecked, setChecked] = useState(false);
    
    const getImageFromMars = async (pageNumber=0) => {
        pageNumber++;
        const results= await getImageMars("opportunity","3","6","2016",pageNumber);
        dispatch(addElementsToLibrariesMars(results))
    }

    useEffect( () => {
        getImageFromMars();
       
    },[])

    const createTwoButtonAlert = () =>
    Alert.alert(
      "Hiding",
      "this image is now hided",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
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
            
            <TouchableOpacity onPress={()=> {
                dispatch({
                    type:'images_hide_one',
                    payload:item
                })
                //console.log(item);
                createTwoButtonAlert();
                
            }}>
            <Feather name="trash" style={styles.icon} />
            </TouchableOpacity>
           </View>
           }
           onEndReached={()=>{
            console.log("end");
           // getImageFromMars(pageNumber);
           }
           }
           onEndReachedThreshold={0.5}
           />
          
        </View>
    );
    
};

const styles=StyleSheet.create({
    container :{
        marginBottom:10,
        alignItems:'center',
        flexDirection:'row',
        paddingLeft:15
        
    },
    containerPrincipal:{
      backgroundColor:'#353839',
        flex:1
    },
    TextStyle:{
        color:'white'

    },
    checkbox: {
        margin: 8,
      },
    icon:{
        fontSize: 24,
        color:'red',
        paddingLeft:10
    }
});
IndexScreen.navigationOptions=({navigation}:any)=>{
    return{
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Feather name="search" size={30} />
            </TouchableOpacity>
          ),
        headerLeft:()=>(
            <TouchableOpacity onPress={() => navigation.navigate('ImagesH')}>
              <Feather name="search" size={30} />
            </TouchableOpacity>
          )
    
    };
};


export default IndexScreen;
