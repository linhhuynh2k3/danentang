import React from "react";
import {
  SectionList,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  name: {
    fontSize: 16,
  },
  separator: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: 1,
  },
  sectionHeader: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: "rgb(170, 170, 170)",
  },
});

// Hàm nhóm dữ liệu theo chữ cái đầu của họ (last name)
const groupPeopleByLastName = (data) => {
  const groupedData = data.reduce((acc, item) => {
    const group = item.name.last[0].toUpperCase();
    if (acc[group]) {
      acc[group].data.push(item);
    } else {
      acc[group] = {
        title: group,
        data: [item],
      };
    }
    return acc;
  }, {});

  const sections = Object.keys(groupedData).map((key) => groupedData[key]);

  return sections.sort((a, b) => {
    if (a.title > b.title) return 1;
    if (a.title < b.title) return -1;
    return 0;
  });
};

// Dữ liệu mẫu
const PEOPLE = [
  { name: { first: "Haeva", last: "Scott" } },
  { name: { first: "Henry", last: "Anderson" } },
  { name: { first: "Lana", last: "Fanjin" } },
  { name: { first: "Bruce", last: "Banner" } },
];

const Project8 = () => {
  return (
    <SafeAreaView>
      <SectionList
        sections={groupPeopleByLastName(PEOPLE)}
        keyExtractor={(item) => `${item.name.first}-${item.name.last}`}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>
              {item.name.first} {item.name.last}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

export default Project8;
