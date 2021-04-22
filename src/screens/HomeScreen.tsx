import React from 'react'
import { View , Text, Image, FlatList, ActivityIndicator} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { usePokemonPaginated } from '../hooks/usePokemonPaginated'
import { styles } from '../theme/appTheme'

export const HomeScreen = () => {

    const {top} = useSafeAreaInsets();
    const {simplePokemonList , loadPokemons} = usePokemonPaginated();
    console.log(simplePokemonList);

    return (
        <>
            <Image
               source={ require('../assets/pokebola.png')}
               style={styles.pokebolaBG}
            />

           <FlatList
               data={simplePokemonList}
               keyExtractor={(pokemon)=>pokemon.id}
               showsVerticalScrollIndicator={false}
               renderItem={ ( {item} ) =>(
                   <Image
                   source={{uri:item.picture}}
                   style={{
                       width:150,
                       height:150
                   }}
                   />
               ) }

           //infinityScroll
              onEndReached={loadPokemons}
              onEndReachedThreshold={0.4}

              ListFooterComponent={(<ActivityIndicator 
                style={{height:100}}  
                size={20}
                color="grey"
                />)}
           />

             {/* <Text style={{ 
                 ...styles.title,
                 ...styles.globalMargin,
                 top:top+20
                  }}>Pokedex</Text> */}
        </>
    )
}
