import { StyleSheet, Text, View, ScrollView, TextInput, StatusBar, Pressable, Image, SectionList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import AnimatedLottieView from 'lottie-react-native';
import Character from '../components/Character';
import { useGetCharacters } from '../hooks/useGetCharacters';


export default function Home() {
    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("");
    const [search, setSearch] = useState("");
    const [char_list, set_char_list] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);

    // get characters using hook
    const {data, error} = useGetCharacters(gender, status, search);

    // the dates from each item in the data are the same
    // so i created this function to mutate the date
    const mutateDate = data => {
        const mutated = data.map((item, index) => {
            const date = new Date(item.created);
            return {
                ...item,
                created: new Date(date.setDate(date.getDate() + (index % 2 === 0 ? index+1 : index))).toLocaleDateString()
            }
        });
        return mutated;
    }

    // this function groups all data into sections using the data property
    const groupData = data => {
        let grouped_data  = {};
        data.forEach(item => {
            if(grouped_data[item.created]){
                grouped_data[item.created].data.push(item);
            }else{
                grouped_data[item.created] = {
                    title: item.created,
                    data: [item]
                };
            }
        });
        // turn grouped_data to arr
        const grouped_data_arr = [];
        Object.keys(grouped_data).forEach((key) => {
            grouped_data_arr.push(grouped_data[key])
        })
        return grouped_data_arr;
    }

    useEffect(()=> {
        if(data){
            const mutated_list = mutateDate(data.characters.results);
            const grouped = groupData(mutated_list);
            set_char_list(grouped);
            setDataLoading(false);
        }
    }, [data]);

    useEffect(()=> {
        if(error){
            setDataLoading(false);
        }
    }, [error])

  return (
    <View style={[styles.container, {
      marginTop: StatusBar.currentHeight
    }]}>
      <StatusBar style="auto" />
      <ScrollView>
        {/* search start */}
        <View style={styles.searchWrap}>
          <TextInput
            style={styles.search}
            placeholder="Search for any character.."
            placeholderTextColor={"#8c8c8c"}
            value={search}
            onChangeText={text => setSearch(text)}
          />
        </View>
        {/* search end */}
        {/* filters start */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterWrap}>
          <View style={styles.filterItemWrap}>
              <Text style={styles.filterLabel}>Gender:</Text>
              <Picker
              style={styles.filter}
              mode="dropdown"
              selectedValue={gender}
              onValueChange={(itemValue, _) =>
                setGender(itemValue)
              }>
                <Picker.Item label="All" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="female" />
            </Picker>
          </View>
          <View style={styles.filterItemWrap}>
              <Text style={styles.filterLabel}>Status:</Text>
              <Picker
              style={styles.filter}
              mode="dropdown"
              selectedValue={status}
              onValueChange={(itemValue, _) =>
                setStatus(itemValue)
              }>
                <Picker.Item label="All" value="" />
                <Picker.Item label="Alive" value="Alive" />
                <Picker.Item label="Dead" value="Dead" />
                <Picker.Item label="Unknown" value="Unknown" />
            </Picker>
          </View>
        </ScrollView>
        {/* filters end */}

        {/* loading start */}
        {
            dataLoading
            &&
            <View style={styles.loadingWrap}>
                <AnimatedLottieView
                    source={require("../assets/lottie/loading.json")}
                    autoPlay
                    loop
                    style={styles.lottie}
                />
                <Text style={styles.normalText}>Getting characters, please wait..</Text>
            </View>
        }
        {/* loading end */}

        {/* error start */}
        {
            error
            &&
            <View style={styles.loadingWrap}>
                <AnimatedLottieView
                    source={require("../assets/lottie/error.json")}
                    autoPlay
                    style={styles.lottie}
                />
                <Text style={[styles.normalText, {
                    textAlign: "center"
                }]}>{error.message}</Text>
            </View>
        }
        {/* error end */}
      </ScrollView>
        {/* characters start */}
        {
            char_list.length
            ?<SectionList
                style={{
                    marginTop: 50
                }}
                sections={char_list}
                keyExtractor={(_, index) => index}
                renderItem={({ item }) => <Character item={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{new Date(title).toDateString()}</Text>
                )}
            />
            :<></>
        }
        {/* characters end */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  normalText:{
    color: "#000",
    fontSize: 16,
    fontWeight: "500"
  },
  searchWrap:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f5f5f5"
  },
  search:{
    fontSize: 20,
    color: "#000"
  },
  filterWrap:{
    margin: 10,
    height: 80
  },
  filterItemWrap:{
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    shadowColor: "#000",
    backgroundColor: "#fff",
    shadowOffset: {
      width: 2,
      height: 7,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 5
  },
  filter:{
    height: 30,
    width: 100,
    borderRadius: 20
  },
  filterLabel:{
    color: "#000",
    fontSize: 15,
    fontWeight: "400"
  },
  loadingWrap:{
    alignItems: "center",
    marginHorizontal: 20
  },
  lottie:{
    width: 150,
    height: 100
  },
  retryBtn:{
    marginVertical: 10
  },
  header:{
    color: "#000",
    fontSize: 20,
    marginLeft: 25
  }
});
