import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import { View, Text, Platform, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Loading } from '../components/Loading';
import { PokemonCard } from '../components/PokemonCard';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import {styles} from '../theme/appTheme';


const screenWidth = Dimensions.get('window').width;

const SearchScreen = () => {

const {top} = useSafeAreaInsets();
const {isFetching,simplePokemonList} = usePokemonSearch();

const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

const [term, setTerm] = useState('');

useEffect(() => {
   if( term.length === 0){
       return setPokemonFiltered([]);
   }


   if(isNaN(Number(term) ) ){
    setPokemonFiltered(
        simplePokemonList .filter( 
            (poke) => poke.name.toLocaleLowerCase()
            .includes(term.toLocaleLowerCase())
            )
      );
   } else {
       const pokemonById = simplePokemonList.find(poke => poke.id === term );
     setPokemonFiltered(
              (pokemonById ) ? [pokemonById] : []
         );
     
   }

   
    
}, [term])


if(isFetching) {
    return<Loading/>
}

    return (
        <View style={{
            flex:1,
            marginHorizontal:20
            }}>


             <SearchInput 
             onDebounce={(value) => setTerm( value )}
             style={{
                 position:'absolute',
                 zIndex:999,
                 width:screenWidth - 40,
                 top:(Platform.OS === 'ios') ? top : top +20
             }}
             /> 

            <FlatList
               data={pokemonFiltered}
               keyExtractor={(pokemon)=>pokemon.id}
               showsVerticalScrollIndicator={false}
               numColumns={ 2 }

               //Header

               ListHeaderComponent={(
                <Text style={{ 
                    ...styles.title,
                    ...styles.globalMargin,
                    paddingBottom:10,
                    marginTop:(Platform.OS === 'ios') ? top +60: top +60
                     }}> {term} </Text>

               )}
               renderItem={ ( {item} ) =>( <PokemonCard pokemon={item}  /> )}
           />
        </View>
    )
}

export default SearchScreen;


