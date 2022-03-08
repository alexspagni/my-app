////////ALL IMPORT///////////////
import React ,{useEffect, useState}from 'react';
import Checkbox from 'expo-checkbox';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {getImageMars} from '../api/getImage'; 
import PhotoComponent from '../components/PhotoComponent';
import { addElementsToLibrariesMars,addElementsToLibrariesHide } from '../reducers/getImagesReducers';
import { Feather } from '@expo/vector-icons';
import {hideImage} from '../alertMessages/alertMessage'
import { useNavigation } from '@react-navigation/native';
////////////COMPONENT////////////
let pageNumber=1;
const IndexScreen = ()=>{
    //////HOOKS//////////////
    const images=useSelector((store: any)=>store?.images);
    const navigation=useNavigation<any>();
    const dispatch = useDispatch();
    const [isChecked, setChecked] = useState(false);
    
    const getImageFromMars = async (pageNumber=0) => {
        pageNumber++;
        const results= await getImageMars("opportunity","3","6","2016",pageNumber);
        dispatch(addElementsToLibrariesMars(results))
    }

    useEffect( () => {
        getImageFromMars();
    },[])

    
    return (
       <View style={styles.containerPrincipal}>
         

        {images.length?<Text style={styles.TextStyle}>Here you can find some photos about mars rover</Text>:<Text style={styles.TextStyle}>no photo found</Text>}
       
        <FlatList
           data={images}
           keyExtractor={(item)=>item.id}
           renderItem ={({item})=>
           <View style={styles.container}>
            <TouchableOpacity onPress={()=>navigation.navigate('ShowScreen',{image:item})}>  
                <PhotoComponent object={item}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=> {
                dispatch({
                    type:'images_hide_one',
                    payload:item
                })
                //console.log(item);
                hideImage();
                
            }}>
            <Feather name="trash" style={styles.icon} />
            </TouchableOpacity>
           </View>
           }
           onEndReached={()=>{
            //console.log("end");
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
    },
    imageHeader:{
        width: 200,
        height : 200,
        borderRadius:4
    }
});


export default IndexScreen;
