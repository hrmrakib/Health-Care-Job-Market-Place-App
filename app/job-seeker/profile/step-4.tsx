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
import useJobSeekerProfileStore, {
  DocumentItem,
  DocumentStatus,
} from "../../../store/user/useJobSeekerProfileStore";

// Status configuration for visual styling
const STATUS_CONFIG: Record<
  DocumentStatus,
  { label: string; color: string; bgColor: string }
> = {
  required: { label: "Required", color: "#E8703A", bgColor: "#FFF3ED" },
  valid: { label: "Valid", color: "#27AE60", bgColor: "#EAFAF1" },
  invalid: { label: "Invalid", color: "#CC475A", bgColor: "#FDEDEF" },
  reviewing: { label: "Reviewing", color: "#F5A623", bgColor: "#FFF8E7" },
};

// Document icon colors for variety
const DOC_ICON_COLORS = [
  "#27AE60",
  "#CC475A",
  "#0074BE",
  "#E8703A",
  "#8E44AD",
  "#F5A623",
  "#2ECC71",
  "#3498DB",
  "#E74C3C",
  "#1ABC9C",
];

export default function JobSeekerProfileStep4() {
  const router = useRouter();
  const { theme } = useTheme();

  const { documents, uploadDocument, removeDocument } =
    useJobSeekerProfileStore();

  const uploadedCount = documents.filter(
    (doc) => doc.status !== "required",
  ).length;
  const totalCount = documents.length;

  const handlePickDocument = useCallback(
    async (docId: string) => {
      try {
        // Dynamically import expo-document-picker to handle if not installed
        let DocumentPicker: any;
        try {
          DocumentPicker = require("expo-document-picker");
        } catch {
          // Fallback: simulate upload for demo purposes
          const simulatedFileName = `document_${Date.now()}.pdf`;
          uploadDocument(
            docId,
            simulatedFileName,
            `file://${simulatedFileName}`,
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

          uploadDocument(
            docId,
            file.name || `document_${Date.now()}.pdf`,
            file.uri,
            file.size,
          );
        }
      } catch (error) {
        // Fallback: simulate upload for demo
        const simulatedFileName = `document_${Date.now()}.pdf`;
        uploadDocument(docId, simulatedFileName, `file://${simulatedFileName}`);
      }
    },
    [uploadDocument],
  );

  const handleRemoveDocument = useCallback(
    (docId: string, docName: string) => {
      Alert.alert(
        "Remove Document",
        `Are you sure you want to remove "${docName}"?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Remove",
            style: "destructive",
            onPress: () => removeDocument(docId),
          },
        ],
      );
    },
    [removeDocument],
  );

  const handleNext = () => {
    router.push("/job-seeker-profile/step-5" as any);
  };

  const getActionButton = (doc: DocumentItem) => {
    switch (doc.status) {
      case "required":
        return {
          text: "Upload",
          color: "#E8703A",
          bgColor: "#FFF3ED",
          borderColor: "#E8703A",
        };
      case "invalid":
        return {
          text: "Upload Again",
          color: "#CC475A",
          bgColor: "#FDEDEF",
          borderColor: "#CC475A",
        };
      case "reviewing":
        return {
          text: "Replace",
          color: "#27AE60",
          bgColor: "#EAFAF1",
          borderColor: "#27AE60",
        };
      case "valid":
        return null; // No action button needed
      default:
        return null;
    }
  };

  const getDocIconColor = (index: number) => {
    return DOC_ICON_COLORS[index % DOC_ICON_COLORS.length];
  };

  const renderDocumentCard = (doc: DocumentItem, index: number) => {
    const statusConfig = STATUS_CONFIG[doc.status];
    const actionBtn = getActionButton(doc);
    const iconColor = getDocIconColor(index);

    return (
      <View
        key={doc.id}
        style={[styles.documentCard, { backgroundColor: theme.surface }]}
      >
        <View style={styles.documentCardContent}>
          {/* Left icon */}
          <View
            style={[
              styles.docIconWrapper,
              { backgroundColor: iconColor + "18" },
            ]}
          >
            <Ionicons name='document-text' size={22} color={iconColor} />
          </View>

          {/* Center content */}
          <View style={styles.docInfo}>
            <Text
              style={[styles.docName, { color: theme.title }]}
              numberOfLines={2}
            >
              {doc.name}
            </Text>
            {doc.fileName ? (
              <Text
                style={[styles.docFileName, { color: theme.iconColor }]}
                numberOfLines={1}
              >
                {doc.fileName}
              </Text>
            ) : doc.description ? (
              <Text
                style={[styles.docFileName, { color: theme.iconColor }]}
                numberOfLines={1}
              >
                {doc.description}
              </Text>
            ) : null}
          </View>

          {/* Right status badge */}
          <View style={styles.statusContainer}>
            <Text style={[styles.statusBadge, { color: statusConfig.color }]}>
              {statusConfig.label}
            </Text>
          </View>
        </View>

        {/* Action button */}
        {actionBtn && (
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: actionBtn.bgColor,
                borderColor: actionBtn.borderColor,
              },
            ]}
            onPress={() => handlePickDocument(doc.id)}
            activeOpacity={0.7}
          >
            <Text style={[styles.actionButtonText, { color: actionBtn.color }]}>
              {actionBtn.text}
            </Text>
          </TouchableOpacity>
        )}

        {/* For valid documents, show a subtle checkmark instead */}
        {doc.status === "valid" && (
          <View style={styles.validIndicator}>
            <Ionicons name='checkmark-circle' size={20} color='#27AE60' />
            <Text style={[styles.validText, { color: "#27AE60" }]}>
              Document verified
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedNav title='Upload Documents' />
        <ProgressBar step={4} totalSteps={5} percentage={75} />

        {/* Header Section - Counter & Info */}
        <View style={[styles.headerCard, { backgroundColor: theme.surface }]}>
          <View style={styles.counterRow}>
            <View>
              <Text style={[styles.counterLabel, { color: theme.iconColor }]}>
                Documents Uploaded
              </Text>
              <Text style={[styles.counterValue, { color: theme.title }]}>
                {uploadedCount}{" "}
                <Text style={{ color: theme.iconColor, fontSize: 18 }}>
                  / {totalCount}
                </Text>
              </Text>
            </View>
            <View
              style={[
                styles.counterIconWrapper,
                { backgroundColor: "#0074BE15" },
              ]}
            >
              <Ionicons name='documents' size={28} color={theme.primary} />
            </View>
          </View>
        </View>

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

        {/* Document List */}
        <View style={styles.documentList}>
          {documents.map((doc, index) => renderDocumentCard(doc, index))}
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
        <ThemedButton title='Next' onPress={handleNext} style={styles.button} />
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
  headerCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: "#0000008b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  counterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  counterLabel: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 4,
  },
  counterValue: {
    fontSize: 28,
    fontWeight: "bold",
  },
  counterIconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  formatBanner: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
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
  documentList: {
    gap: 12,
  },
  documentCard: {
    borderRadius: 14,
    padding: 16,
    shadowColor: "#0000008b",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  documentCardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  docIconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  docInfo: {
    flex: 1,
    gap: 2,
  },
  docName: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
  },
  docFileName: {
    fontSize: 12,
    marginTop: 2,
  },
  statusContainer: {
    alignItems: "flex-end",
  },
  statusBadge: {
    fontSize: 11,
    fontWeight: "600",
  },
  actionButton: {
    marginTop: 10,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: "600",
  },
  validIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 6,
  },
  validText: {
    fontSize: 12,
    fontWeight: "500",
  },
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
