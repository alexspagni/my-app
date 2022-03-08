////////ALL IMPORT///////////////
import React ,{useEffect, useState}from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,AccessibilityInfo, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {getImageMars} from '../api/getImage'; 
import PhotoComponent from '../components/PhotoComponent';
import { addElementsToLibrariesMars,addElementsToLibrariesHide } from '../reducers/getImagesReducers';
import { Feather } from '@expo/vector-icons';
import {hideImageAlert,imageNotFoundAlert} from '../alertMessages/alertMessage'
import { useNavigation } from '@react-navigation/native';
import { not } from 'react-native-reanimated';
////////////COMPONENT////////////
let pageNumber=0;

const IndexScreen= ()=>{
    //////HOOKS//////////////
    const [pageNumber,setPageNumber]=useState(1);
    const [loading,setLoading]=useState(true);
    const images=useSelector((store: any)=>store?.images);
    const navigation=useNavigation<any>();
    const dispatch = useDispatch();
  
    //funzione per fare la richiesta HTTP
    
    const getImageFromMars = async (page:number) => {
       setPageNumber(page);
       try{
        const results= await getImageMars("opportunity","3","6","2016",page);
        dispatch(addElementsToLibrariesMars(results))
       }
       catch{

       }
       setLoading(false);
    }

    useEffect( () => {
        getImageFromMars(pageNumber);
    },[])

    
    return (
       <View style={styles.containerPrincipal}>
           
        {images.length ?<Text style={styles.TextStyle}>Here you can find some photos about mars rover</Text>:null}
        {!images.length && !loading ?imageNotFoundAlert():null}
        {loading ?<ActivityIndicator size={'large'} color={'red'}/>:null}
       
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
                hideImageAlert();
                
            }}>
            <Feather name="trash" style={styles.icon} />
            </TouchableOpacity>
           </View>
           }
           onEndReached={()=>{
           const newPage=pageNumber+1;
            getImageFromMars(newPage);
           } }
           onEndReachedThreshold={0.5}
           />
          
        </View>
    );
    
};
//Style del componente
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
