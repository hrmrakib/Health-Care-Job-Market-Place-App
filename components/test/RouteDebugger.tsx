import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useSegments, useGlobalSearchParams } from "expo-router";

export default function RouteDebugger() {
  const segments = useSegments();
  const params = useGlobalSearchParams();

  // 1. Reconstruct the pathname from segments
  // This converts ['product', '[id]'] into '/product/[id]'
  const pathname = "/" + segments.join("/");

  // 2. Format query params (if any exist) into a string: ?key=value&foo=bar
  const paramKeys = Object.keys(params);
  const queryString = paramKeys.length
    ? "?" + paramKeys.map((key) => `${key}=${params[key]}`).join("&")
    : "";

  // 3. (Optional) Reconstruct the actual filled URL: /product/123
  // Replaces placeholders like '[id]' or '[...rest]' with their actual values
  let actualUrl =
    "/" +
    segments
      .map((segment) => {
        // Clean up brackets to get the param key name (e.g., '[id]' -> 'id')
        const cleanKey = segment.replace(/[\[\]]/g, "");
        if (segment.startsWith("[") && params[cleanKey]) {
          return params[cleanKey];
        }
        return segment;
      })
      .join("/");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* <Text style={styles.label}>Route Debugger</Text> */}

        <View style={styles.row}>
          <Text style={styles.subLabel}>Current URL: </Text>
          <Text style={styles.urlText}>{actualUrl}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.subLabel}>File Path: </Text>
          <Text style={styles.pathText}>
            {pathname}
            {queryString}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#1c1c1e",
  },
  container: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2c2c2e",
  },
  label: {
    color: "#ff9500",
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  subLabel: {
    color: "#eaeaea",
    fontSize: 12,
    fontWeight: "600",
    width: 85,
  },
  urlText: {
    color: "#4cd964",
    fontFamily: "Courier",
    fontSize: 13,
    fontWeight: "bold",
    flex: 1,
  },
  pathText: {
    color: "#8e8e93",
    fontFamily: "Courier",
    fontSize: 12,
    flex: 1,
  },
});
