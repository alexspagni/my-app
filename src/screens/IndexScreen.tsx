import React ,{useEffect, useState}from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Modal, Button} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {getImageMars} from '../api/getImage'; 
import PhotoComponent from '../components/PhotoComponent';
import { Feather } from '@expo/vector-icons';
const IndexScreen = ({ navigation }: any)=>{
    const images=useSelector((store: any)=>store?.images);
    const dispatch = useDispatch();
    //const [term,setTerm]=useState<string>('');

    const getImageFromMars = async () => {
        const results= await getImageMars("curiosity");
        dispatch({
            type:'images_add_mars',
            payload:results
        })
      // dispatch({addElementsToLibrariesMars(results)})
    }

    useEffect( () => {
        getImageFromMars();
    },[])
    return (
       <View >
        {images.length?<Text>Here you can find some photos about mars rover</Text>:<Text>no photo found</Text>}
        <FlatList
           data={images}
           keyExtractor={(item)=>item.id}
           renderItem ={({item})=>
           <View style={styles.Container}>
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
    Container :{
        marginBottom:10,
        alignItems:'center'
        
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