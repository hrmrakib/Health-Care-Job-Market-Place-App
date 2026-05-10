import React, { useCallback } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Text,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../context/ThemeContext";
import ThemedView from "../../../components/ui/ThemedView";
import ThemedNav from "../../../components/ui/ThemedNav";
import ThemedButton from "../../../components/ui/ThemedButton";
import ProgressBar from "../../../components/ui/ProgressBar";
import useJobSeekerProfileStore from "../../../store/user/useJobSeekerProfileStore";

export default function JobSeekerProfileStep5() {
  const router = useRouter();
  const { theme } = useTheme();

  const { backgroundCheckFile, uploadBackgroundCheck, removeBackgroundCheck } =
    useJobSeekerProfileStore();

  const handlePickDocument = useCallback(async () => {
    try {
      let DocumentPicker: any;
      try {
        DocumentPicker = require("expo-document-picker");
      } catch {
        // Fallback: simulate upload for demo purposes
        const simulatedFileName = `background_check_${Date.now()}.pdf`;
        uploadBackgroundCheck(
          simulatedFileName,
          `file://${simulatedFileName}`,
          2048000,
        );
        return;
      }

      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "image/jpeg",
          "image/png",
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];

        // Check file size (max 10MB)
        if (file.size && file.size > 10 * 1024 * 1024) {
          Alert.alert(
            "File Too Large",
            "Maximum file size is 10MB. Please choose a smaller file.",
          );
          return;
        }

        uploadBackgroundCheck(
          file.name || `background_check_${Date.now()}.pdf`,
          file.uri,
          file.size,
        );
      }
    } catch (error) {
      // Fallback: simulate upload for demo
      const simulatedFileName = `background_check_${Date.now()}.pdf`;
      uploadBackgroundCheck(
        simulatedFileName,
        `file://${simulatedFileName}`,
        2048000,
      );
    }
  }, [uploadBackgroundCheck]);

  const handleReplace = useCallback(() => {
    Alert.alert(
      "Replace Document",
      "Are you sure you want to replace the current background check document?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Replace",
          onPress: () => {
            removeBackgroundCheck();
            // Slight delay to allow state to update before re-picking
            setTimeout(() => handlePickDocument(), 300);
          },
        },
      ],
    );
  }, [removeBackgroundCheck, handlePickDocument]);

  const handleSaveAndContinue = () => {
    router.push("/job-seeker-profile/step-6" as any);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedNav title='Background Check' />
        <ProgressBar step={5} totalSteps={5} percentage={75} />

        {/* Accepted Formats Banner */}
        <View
          style={[
            styles.formatBanner,
            { backgroundColor: "#E3F2FD", borderColor: "#90CAF9" },
          ]}
        >
          <Text style={styles.formatBannerText}>
            Accepted formats: PDF, DOC, DOCX, JPG, PNG
          </Text>
          <Text style={styles.formatBannerSub}>(Max 10MB per file)</Text>
        </View>

        {/* Upload Area or Uploaded File Card */}
        {!backgroundCheckFile ? (
          <TouchableOpacity
            style={[
              styles.uploadArea,
              {
                borderColor: theme.primary,
                backgroundColor: theme.surface,
              },
            ]}
            onPress={handlePickDocument}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.uploadIconCircle,
                { backgroundColor: theme.primary + "15" },
              ]}
            >
              <Ionicons
                name='cloud-upload-outline'
                size={32}
                color={theme.primary}
              />
            </View>
            <Text style={[styles.uploadTitle, { color: theme.title }]}>
              Upload Background Check
            </Text>
            <Text style={[styles.uploadSubtitle, { color: theme.iconColor }]}>
              Tap to browse and select your file
            </Text>
          </TouchableOpacity>
        ) : (
          <View
            style={[styles.uploadedCard, { backgroundColor: theme.surface }]}
          >
            <View style={styles.uploadedCardContent}>
              {/* Document Icon */}
              <View
                style={[
                  styles.docIconWrapper,
                  { backgroundColor: "#0074BE18" },
                ]}
              >
                <Ionicons
                  name='document-text'
                  size={28}
                  color={theme.primary}
                />
              </View>

              {/* Document Info */}
              <View style={styles.docInfo}>
                <Text
                  style={[styles.docName, { color: theme.title }]}
                  numberOfLines={2}
                >
                  Pennsylvania Access To Criminal History Patch
                </Text>
                <Text
                  style={[styles.docFileName, { color: theme.iconColor }]}
                  numberOfLines={1}
                >
                  {backgroundCheckFile.fileName}
                </Text>
              </View>

              {/* Uploaded Badge */}
              <View style={styles.statusContainer}>
                <Text style={styles.uploadedBadge}>UPLOADED</Text>
              </View>
            </View>

            {/* Replace Button */}
            <TouchableOpacity
              style={[styles.replaceButton, { backgroundColor: theme.primary }]}
              onPress={handleReplace}
              activeOpacity={0.7}
            >
              <Text style={styles.replaceButtonText}>REPLACE</Text>
            </TouchableOpacity>
          </View>
        )}
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
          title='Back'
          variant='secondary'
          onPress={() => router.back()}
          style={[
            styles.button,
            styles.backButton,
            { borderColor: theme.primary },
          ]}
          textStyle={{ color: theme.primary }}
        />
        <ThemedButton
          title='Save & Continue'
          onPress={handleSaveAndContinue}
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
  formatBanner: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    alignItems: "center",
  },
  formatBannerText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1565C0",
    textAlign: "center",
  },
  formatBannerSub: {
    fontSize: 11,
    color: "#1976D2",
    marginTop: 2,
    textAlign: "center",
  },

  // Empty upload area
  uploadArea: {
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  uploadIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  uploadSubtitle: {
    fontSize: 13,
  },

  // Uploaded file card
  uploadedCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: "#0000008b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  uploadedCardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  docIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  docInfo: {
    flex: 1,
    gap: 4,
  },
  docName: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  docFileName: {
    fontSize: 12,
  },
  statusContainer: {
    alignItems: "flex-end",
  },
  uploadedBadge: {
    fontSize: 11,
    fontWeight: "700",
    color: "#27AE60",
    letterSpacing: 0.5,
  },

  // Replace button
  replaceButton: {
    marginTop: 16,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  replaceButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
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
  backButton: {
    borderWidth: 1,
    backgroundColor: "transparent",
  },
});
