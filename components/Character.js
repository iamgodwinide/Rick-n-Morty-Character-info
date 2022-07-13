import { StyleSheet, Text, View, Image } from 'react-native'

const Character = ({item}) => {
  return (
    <View style={styles.characterItem}>
        <View style={{width: "38%"}}>
            <Image
                source={{uri: item.image}}
                style={styles.characterImage}
            />
        </View>
        <View style={styles.characterItemDetail}>
            <Text style={[styles.normalText, {color: "#fff"}]}>Name: {item.name}</Text>
            <Text style={[styles.normalText, {color: "#fff"}]}>Status: {item.status}</Text>
            <Text style={[styles.normalText, {color: "#fff"}]}>Gender: {item.gender}</Text>
            <Text style={[styles.normalText, {color: "#fff"}]}>Created: {new Date(item.created).toDateString()}</Text>
        </View>
    </View>
  )
}

export default Character

const styles = StyleSheet.create({
    characterItem:{
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 20
      },
      characterImage:{
        borderRadius: 10,
        height: 150,
      },
      characterItemDetail:{
        width: "60%",
        backgroundColor: "#23242e", 
        padding: 10, 
        borderRadius: 10
      }
})