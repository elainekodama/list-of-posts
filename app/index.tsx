import { PatientPost } from "@/components/patient-experiences/PatientPost";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ServiceContext } from "@/context/ServiceContext";
import { Post } from "@/models/Post";
import React, { useContext, useState } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, View, Pressable, ActivityIndicator } from "react-native";
import { PostDetailsModal } from "@/components/patient-experiences/PostDetailsModal";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ListHeader } from "@/components/patient-experiences/ListHeader";
import { patientPostStrings } from "@/constants/Strings";

const ageGroupFilters = [
  { label: '0-19', value: '0' },
  { label: '20-39', value: '20' },
  { label: '40-59', value: '40' },
  { label: '60-79', value: '60' },
  { label: '80+', value: '80' },
];
const genderFilters = [
  { label: 'Female', value: 'F' },
  { label: 'Male', value: 'M' },
  { label: 'Other', value: '12' },
];
const LIMIT = 30;

export default function Index() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Post[]>([]);
  const [ageFilter, setAgeFilter] = useState<string>();
  const [genderFilter, setGenderFilter] = useState<string>();
  const [fetchedAll, setFetchedAll] = useState<boolean>(false);
  const [cursor, setCursor] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<Post | null>(null)
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { apiService } = useContext(ServiceContext);
  const listItemBackground = useThemeColor({}, 'card');

  /**
   * Retrieve data to display
   */
  async function fetchData(newSearch: boolean) {
    // Reset search params
    if (newSearch) {
      setFetchedAll(false);
      // Should cache data
      setData([]);
      setCursor(0);
    }
    if (!fetchedAll) {
      try {
        setLoading(true);
        // Fetch new data with age and gender filter if exists
        const newData = await apiService.fetchPatientPosts(cursor, LIMIT, ageFilter ? Number(ageFilter) : undefined, genderFilter);
        if (newData.length > 0) {
          // Update the cursor to new spot and add new data items
          setCursor(data.length + newData.length + 1);
          setData(prevItems => [...prevItems, ...newData]);
          // No more items left
          if (newData.length < LIMIT) {
            setFetchedAll(true);
          }
        }
      } catch (error) {
        // Should display error message for user
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  /**
   * Update the number of hugs when a user hugs/removes hug
   * @param postUrl 
   * @param newNumHugs 
   */
  async function updateHugHandler(postUrl: string, newNumHugs: number) {
    await apiService.updateNumberOfHugs(postUrl, newNumHugs);
  }

  /**
   * New age filter was chosen
   * @param item
   */
  function ageFilterUpdateHandler(item: any) {
    setAgeFilter(item.value);
    fetchData(true);
  }

  /**
   * New gender filter was chosen
   * @param item
   */
  function genderFilterUpdateHandler(item: any) {
    setGenderFilter(item.value);
    fetchData(true);
  }

  /**
   * Clear both filters and reset data
   */
  function clearFilterHandler() {
    setAgeFilter(undefined);
    setGenderFilter(undefined);
    fetchData(true);
  }

  /**
   * Open post detail modal
   * @param selectedPost 
   */
  function openPostDetails(selectedPost: Post) {
    setSelectedItem(selectedPost);
    setModalVisible(true);
  }

  /**
   * Close post detail modal
   */
  function closePostDetails() {
    setSelectedItem(null);
    setModalVisible(false);
  }

  /**
   * Patient post preview
   * @param renderItem 
   * @returns 
   */
  function renderFlatListItem(renderItem: ListRenderItemInfo<Post>) {
    return (
      <Pressable
        onPress={() => openPostDetails(renderItem.item)}
        key={renderItem.index}
        style={[styles.listItem, { backgroundColor: listItemBackground }]}>
        <PatientPost
          previewOnly
          post={renderItem.item}
          onHugNumberChange={updateHugHandler} />
      </Pressable>
    )
  }

  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <FlatList
        ListHeaderComponent={
          <ListHeader
            filterValue1={ageFilter}
            filterValue2={genderFilter}
            filters1={ageGroupFilters}
            filters2={genderFilters}
            filter1ChangeHandler={ageFilterUpdateHandler}
            filter2ChangeHandler={genderFilterUpdateHandler}
            clearFilterHandler={clearFilterHandler} />
        }
        ListFooterComponent={
          <View style={styles.flatlistFooter}>
            {
              loading ?
                <ActivityIndicator size="large" /> : null}
            {
              !loading && fetchedAll ?
                <ThemedText type="defaultSemiBold">{patientPostStrings.noMorePosts}</ThemedText> :
                null
            }
          </View>
        }
        contentContainerStyle={styles.flatlistContainer}
        data={data}
        renderItem={renderFlatListItem}
        onEndReached={() => fetchData(false)}
        onEndReachedThreshold={0.75}
      />
      <PostDetailsModal
        post={selectedItem}
        isVisible={modalVisible}
        onClose={closePostDetails}
        updateHugNumberHandler={updateHugHandler} />
    </ThemedView >
  );
}

const styles = StyleSheet.create({
  flatlistContainer: {
    alignSelf: 'center',
    width: '66%',
    minWidth: 450,
    marginVertical: '4%'
  },
  flatlistFooter: {
    alignItems: 'center',
    marginVertical: '3%'
  },
  listItem: {
    marginVertical: 8,
    gap: 8,
    alignItems: 'center',
    borderRadius: 8,
    width: '100%',
    shadowColor: '#888',
    shadowRadius: 8,
    shadowOffset: {
      width: 6,
      height: 6
    },
    shadowOpacity: 0.2
  },
  dropdown: {
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginBottom: 14,
  },
  dropdownTextStyle: {
    fontSize: 16,
    marginVertical: 8,
  },
})