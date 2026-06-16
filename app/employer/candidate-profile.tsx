import React from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import ThemedView from "../../components/ui/ThemedView";
import HeaderBar from "../../components/employer/HeaderBar";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ThemedText from "../../components/ui/ThemedText";
import TagBadge from "../../components/employer/TagBadge";
import SectionTitle from "../../components/employer/SectionTitle";
import GradientButton from "../../components/shared/GradientButton";

const CandidateProfile = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <HeaderBar
        title='Candidate Profile'
        showBackButton
        onBack={() => router.back()}
        rightActions={{ heart: true }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header Card */}
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <View style={styles.profileTopRow}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <View style={styles.nameRow}>
                <ThemedText title style={styles.name}>
                  Sarah Johnson
                </ThemedText>
                <View
                  style={[styles.ratingBadge, { backgroundColor: "#FFF4E5" }]}
                >
                  <Ionicons name='star' size={14} color='#F4B740' />
                  <ThemedText style={styles.ratingText}>4.8</ThemedText>
                </View>
              </View>
              <View style={styles.roleLocation}>
                <View style={styles.iconTextRow}>
                  <Ionicons
                    name='ribbon-outline'
                    size={16}
                    color={theme.primary}
                  />
                  <ThemedText
                    style={[styles.roleText, { color: theme.primary }]}
                  >
                    Registered Nurse
                  </ThemedText>
                </View>
                <View style={[styles.iconTextRow, { marginTop: 4 }]}>
                  <Ionicons
                    name='location-outline'
                    size={16}
                    color={theme.iconColor}
                  />
                  <ThemedText style={styles.locationText}>
                    San Francisco, CA
                  </ThemedText>
                </View>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.experienceBox,
              { backgroundColor: `${theme.success}10` },
            ]}
          >
            <View style={styles.experienceHeader}>
              <Ionicons name='ribbon' size={16} color={theme.iconColor} />
              <ThemedText style={styles.experienceTitle}>
                5 years experience
              </ThemedText>
            </View>
            <ThemedText style={styles.bioText}>
              Motivated and detail-oriented individual seeking opportunities to
              apply my skills, grow professionally, and contribute effectively
              to a dynamic organization.
            </ThemedText>
          </View>

          <View style={styles.contactRow}>
            <View style={styles.contactItem}>
              <View
                style={[
                  styles.contactIconBg,
                  { backgroundColor: `${theme.primary}15` },
                ]}
              >
                <Ionicons name='mail-outline' size={20} color={theme.primary} />
              </View>
              <View>
                <ThemedText style={styles.contactLabel}>Email</ThemedText>
                <ThemedText style={styles.contactValue}>
                  sarah.johnson@gmail.com
                </ThemedText>
              </View>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.contactItem}>
              <View
                style={[
                  styles.contactIconBg,
                  { backgroundColor: `${theme.success}15` },
                ]}
              >
                <Ionicons name='call-outline' size={20} color={theme.success} />
              </View>
              <View>
                <ThemedText style={styles.contactLabel}>Phone</ThemedText>
                <ThemedText style={styles.contactValue}>
                  +1 (415) 555-01452
                </ThemedText>
              </View>
            </View>
          </View>
        </View>

        {/* Certificate Section */}
        <SectionTitle title='Certificate' style={{ marginTop: 20 }} />
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <View style={styles.tagsContainer}>
            <TagBadge label='BLS' />
            <TagBadge label='ACLS' />
            <TagBadge label='PALS' />
            <TagBadge label='RN License' />
            <TagBadge label='CNA License' />
            <TagBadge label='CPR Certified' />
          </View>
        </View>

        {/* Documents Section */}
        <SectionTitle title='Documents' style={{ marginTop: 20 }} />
        <View
          style={[styles.card, { backgroundColor: theme.surface, padding: 0 }]}
        >
          <View style={styles.documentRow}>
            <ThemedText style={styles.docName}>Resume</ThemedText>
            <Ionicons
              name='arrow-down-circle-outline'
              size={24}
              color={theme.primary}
            />
          </View>
        </View>

        {/* Skills Section */}
        <SectionTitle title='Skills' style={{ marginTop: 20 }} />
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <View style={styles.tagsContainer}>
            <TagBadge label='Vital Signs' />
            <TagBadge label='CPR' />
            <TagBadge label='Medical Records' />
            <TagBadge label='IV Therapy' />
            <TagBadge label='Wound Care' />
          </View>
        </View>

        {/* Education Section */}
        <SectionTitle title='Education' style={{ marginTop: 20 }} />
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
          <View style={styles.eduHeader}>
            <View style={[styles.eduIconBg, { backgroundColor: "#FFF4E5" }]}>
              <Ionicons name='school-outline' size={24} color='#F4B740' />
            </View>
            <View style={styles.eduInfo}>
              <ThemedText title style={styles.eduDegree}>
                H.S.C
              </ThemedText>
              <ThemedText style={styles.eduSchool}>
                Hashil School & College
              </ThemedText>
              <View style={styles.eduMetaRow}>
                <ThemedText style={styles.eduYear}>2013 • </ThemedText>
                <TagBadge
                  label='Completed'
                  variant='status'
                  color={theme.success}
                  style={{ paddingVertical: 0, paddingHorizontal: 6 }}
                />
              </View>
              <ThemedText style={styles.eduLicense}>License: N/A</ThemedText>
              <View style={[styles.iconTextRow, { marginTop: 4 }]}>
                <Ionicons
                  name='document-text-outline'
                  size={16}
                  color={theme.primary}
                />
                <ThemedText style={[styles.eduCert, { color: theme.primary }]}>
                  Certificate.png
                </ThemedText>
              </View>
            </View>
          </View>
        </View>

        <GradientButton title='Send Message' style={styles.sendMsgBtn} />
      </ScrollView>
    </ThemedView>
  );
};

export default CandidateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 14,
    padding: 16,
    shadowColor: "#0000008b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  profileTopRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
    justifyContent: "center",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#F4B740",
  },
  roleLocation: {
    marginTop: 4,
  },
  iconTextRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  roleText: {
    fontSize: 14,
    fontWeight: "600",
  },
  locationText: {
    fontSize: 14,
    opacity: 0.8,
  },
  experienceBox: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  experienceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  experienceTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  bioText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  contactRow: {
    flexDirection: "column",
    flexWrap: "wrap",
    gap: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#e0e0e0",
    paddingTop: 16,
  },
  contactItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  contactIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contactLabel: {
    fontSize: 12,
    opacity: 0.6,
  },
  contactValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  verticalDivider: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 16,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  documentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  docName: {
    fontSize: 16,
    fontWeight: "500",
  },
  eduHeader: {
    flexDirection: "row",
  },
  eduIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  eduInfo: {
    marginLeft: 16,
    flex: 1,
  },
  eduDegree: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eduSchool: {
    fontSize: 14,
    opacity: 0.8,
    marginTop: 2,
  },
  eduMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  eduYear: {
    fontSize: 13,
    opacity: 0.6,
  },
  eduLicense: {
    fontSize: 13,
    opacity: 0.6,
    marginTop: 4,
  },
  eduCert: {
    fontSize: 13,
    textDecorationLine: "underline",
  },
  sendMsgBtn: {
    marginTop: 30,
    marginBottom: 20,
  },
});
