// import React, { useState, useRef } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   NativeSyntheticEvent,
//   NativeScrollEvent,
// } from "react-native";
// import { useRouter } from "expo-router"; // or use NavigationProp from @react-navigation/native
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import ThemedView from "../../components/ui/ThemedView";

// const { width, height } = Dimensions.get("window");

// interface Slide {
//   id: string;
//   title: string;
//   desc: string;
//   color: string;
// }

// const slides: Slide[] = [
//   {
//     id: "1",
//     title: "Find Jobs Near You",
//     desc: "Search using your zip code to discover nearby shifts within your preferred radius.",
//     color: "#0070BA",
//   },
//   {
//     id: "2",
//     title: "Upload Credentials Securely",
//     desc: "Your certifications and credentials are protected with bank-level encryption.",
//     color: "#005DA0",
//   },
//   {
//     id: "3",
//     title: "Clear Pay. Trusted Work.",
//     desc: "View flat rates upfront, receive payments securely, and work confidently.",
//     color: "#004A80",
//   },
// ];

// const OnboardingScreen = () => {
//   const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
//   const ref = useRef<FlatList>(null);
//   const router = useRouter();

//   const updateCurrentSlideIndex = (
//     e: NativeSyntheticEvent<NativeScrollEvent>,
//   ) => {
//     const contentOffsetX = e.nativeEvent.contentOffset.x;
//     const currentIndex = Math.round(contentOffsetX / width);
//     setCurrentSlideIndex(currentIndex);
//   };

//   const goToNextSlide = () => {
//     const nextSlideIndex = currentSlideIndex + 1;
//     if (nextSlideIndex < slides.length) {
//       ref?.current?.scrollToIndex({ index: nextSlideIndex, animated: true });
//       setCurrentSlideIndex(nextSlideIndex);
//     }
//   };

//   const handleGetStarted = async () => {
//     // Save to local storage so onboarding doesn't show again
//     await AsyncStorage.setItem("hasLaunched", "true");
//     router.replace("/(auth)/login"); // Adjust path to your login/home route
//   };

//   return (
//     <ThemedView style={styles.container}>
//       <FlatList
//         ref={ref}
//         onMomentumScrollEnd={updateCurrentSlideIndex}
//         data={slides}
//         keyExtractor={(item) => item.id}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <View style={[styles.slide, { backgroundColor: item.color }]}>
//             {/* The visual 'curve' effect */}
//             <View style={styles.curveDecorator} />

//             <View style={styles.contentContainer}>
//               <Text style={styles.title}>{item.title}</Text>
//               <Text style={styles.subtitle}>{item.desc}</Text>
//             </View>
//           </View>
//         )}
//       />

//       <View style={styles.footer}>
//         {/* Pagination Dots */}
//         <View style={styles.indicatorContainer}>
//           {slides.map((_, index) => (
//             <View
//               key={index}
//               style={[
//                 styles.indicator,
//                 currentSlideIndex === index && styles.activeIndicator,
//               ]}
//             />
//           ))}
//         </View>

//         {/* Action Button */}
//         <TouchableOpacity
//           activeOpacity={0.8}
//           style={styles.btn}
//           onPress={
//             currentSlideIndex === slides.length - 1
//               ? handleGetStarted
//               : goToNextSlide
//           }
//         >
//           <Text style={styles.btnText}>
//             {currentSlideIndex === slides.length - 1 ? "GET STARTED" : "NEXT"}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ThemedView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   slide: {
//     width,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   curveDecorator: {
//     position: "absolute",
//     bottom: -height * 0.45, // Moves the "circle" down to create a curve effect
//     width: width * 2,
//     height: width * 2,
//     borderRadius: width,
//     backgroundColor: "white",
//   },
//   contentContainer: {
//     paddingHorizontal: 40,
//     alignItems: "center",
//     marginTop: -100, // Pulls text up above the curve
//   },
//   title: {
//     color: "white",
//     fontSize: 28,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   subtitle: {
//     color: "white",
//     fontSize: 16,
//     textAlign: "center",
//     lineHeight: 22,
//     opacity: 0.9,
//   },
//   footer: {
//     height: height * 0.2,
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     paddingBottom: 40,
//   },
//   indicatorContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   indicator: {
//     height: 4,
//     width: 10,
//     backgroundColor: "#E0E0E0",
//     marginHorizontal: 4,
//     borderRadius: 2,
//   },
//   activeIndicator: {
//     backgroundColor: "#0070BA",
//     width: 25,
//   },
//   btn: {
//     height: 55,
//     backgroundColor: "#006D77",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//   },
//   btnText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "600",
//     letterSpacing: 1,
//   },
// });

// export default OnboardingScreen;
