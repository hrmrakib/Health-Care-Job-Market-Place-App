import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ThemedView from "../components/ui/ThemedView";
import SelectYourRolePage from "./role/selectrole";

const AppHome = () => {
  return (
    <ThemedView>
      <SelectYourRolePage />
    </ThemedView>
  );
};

export default AppHome;

const styles = StyleSheet.create({});
