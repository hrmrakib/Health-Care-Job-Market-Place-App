import React, { useEffect, useMemo } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Text,
  Animated,
  Easing,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../context/ThemeContext";
import ThemedView from "../../components/ui/ThemedView";
import ThemedNav from "../../components/ui/ThemedNav";
import ThemedButton from "../../components/ui/ThemedButton";
import useJobSeekerProfileStore from "../../store/user/useJobSeekerProfileStore";
import Svg, { Circle } from "react-native-svg";

const CIRCLE_SIZE = 180;
const STROKE_WIDTH = 12;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Animated Circle component for the progress ring
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function CircularProgress({ percentage }: { percentage: number }) {
  const { theme } = useTheme();
  const animatedValue = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 1200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [percentage, animatedValue]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [CIRCUMFERENCE, 0],
  });

  return (
    <View style={styles.circularContainer}>
      <Svg
        width={CIRCLE_SIZE}
        height={CIRCLE_SIZE}
        viewBox={`0 0 ${CIRCLE_SIZE} ${CIRCLE_SIZE}`}
      >
        {/* Background circle (track) */}
        <Circle
          cx={CIRCLE_SIZE / 2}
          cy={CIRCLE_SIZE / 2}
          r={RADIUS}
          stroke={theme.navBackground}
          strokeWidth={STROKE_WIDTH}
          fill="none"
        />
        {/* Progress circle */}
        <AnimatedCircle
          cx={CIRCLE_SIZE / 2}
          cy={CIRCLE_SIZE / 2}
          r={RADIUS}
          stroke={theme.primary}
          strokeWidth={STROKE_WIDTH}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          rotation="-90"
          origin={`${CIRCLE_SIZE / 2}, ${CIRCLE_SIZE / 2}`}
        />
      </Svg>
      {/* Center text */}
      <View style={styles.circularCenterText}>
        <Text style={[styles.percentageText, { color: theme.title }]}>
          {percentage}%
        </Text>
        <Text style={[styles.completeLabel, { color: theme.iconColor }]}>
          Complete
        </Text>
      </View>
    </View>
  );
}

function StrengthBar({ percentage }: { percentage: number }) {
  const animatedWidth = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: percentage,
      duration: 1000,
      delay: 400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [percentage, animatedWidth]);

  const width = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.strengthTrack}>
      <Animated.View
        style={[
          styles.strengthFill,
          { width },
        ]}
      />
      {/* Thumb indicator */}
      <Animated.View
        style={[
          styles.strengthThumb,
          {
            left: width,
          },
        ]}
      />
    </View>
  );
}

export default function JobSeekerProfileStep6() {
  const router = useRouter();
  const { theme } = useTheme();

  const { getProfileCompletion, completeProfile } =
    useJobSeekerProfileStore();

  const profileCompletion = getProfileCompletion();

  const getStrengthMessage = (pct: number) => {
    if (pct >= 100) return "Your profile is complete! You're all set.";
    if (pct >= 80)
      return "Your profile is looking great! Complete your documents to reach 100%.";
    if (pct >= 50)
      return "Good progress! Keep adding details to strengthen your profile.";
    return "Let's get started! Fill out your profile to attract employers.";
  };

  const handleCompleteProfile = () => {
    completeProfile();
    router.push("/home" as any);
  };

  const handleSkip = () => {
    router.push("/home" as any);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedNav title="Profile Summary" />

        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: theme.text }]}>
          Your uploaded documents will be reviewed, and we will provide you with
          an update shortly.
        </Text>

        {/* Circular Progress Ring */}
        <View style={styles.ringSection}>
          <CircularProgress percentage={profileCompletion} />
        </View>

        {/* Profile Strength Card */}
        <View style={styles.strengthCard}>
          {/* Gradient background simulated with solid + overlay */}
          <View style={styles.strengthCardInner}>
            <View style={styles.strengthHeader}>
              <Text style={styles.strengthTitle}>Profile Strength</Text>
              <Text style={styles.strengthPercentage}>
                {profileCompletion}%
              </Text>
            </View>

            <StrengthBar percentage={profileCompletion} />

            <Text style={styles.strengthMessage}>
              {getStrengthMessage(profileCompletion)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View
        style={[
          styles.footer,
          {
            backgroundColor: theme.background,
            borderTopColor: theme.border + "30",
          },
        ]}
      >
        <ThemedButton
          title="Skip it For Now"
          variant="secondary"
          onPress={handleSkip}
          style={[
            styles.button,
            styles.skipButton,
            { borderColor: theme.primary },
          ]}
          textStyle={{ color: theme.primary }}
        />
        <ThemedButton
          title="Complete Profile Set Up"
          onPress={handleCompleteProfile}
          style={styles.button}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 32,
    marginTop: -8,
  },

  // Circular Progress
  ringSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  circularContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  circularCenterText: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  percentageText: {
    fontSize: 36,
    fontWeight: "800",
  },
  completeLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 2,
  },

  // Strength Card
  strengthCard: {
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#0074BE",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  strengthCardInner: {
    backgroundColor: "#006B55",
    // backgroundImage: "linear-gradient(135deg, #006B55 0%, #0074BE 100%)",
    padding: 24,
    // We use a solid teal-to-blue gradient look via background color
    // For React Native, we just use a solid color. The gradient is visual polish.
  },
  strengthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  strengthTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  strengthPercentage: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  // Strength Bar
  strengthTrack: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 4,
    marginBottom: 16,
    position: "relative",
  },
  strengthFill: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
  },
  strengthThumb: {
    position: "absolute",
    top: -4,
    marginLeft: -8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  strengthMessage: {
    fontSize: 13,
    lineHeight: 20,
    color: "rgba(255,255,255,0.9)",
  },

  // Footer
  footer: {
    flexDirection: "row",
    padding: 16,
    paddingBottom: Platform.OS === "ios" ? 32 : 16,
    gap: 16,
    borderTopWidth: 1,
  },
  button: {
    flex: 1,
  },
  skipButton: {
    borderWidth: 1,
    backgroundColor: "transparent",
  },
});
