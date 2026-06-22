import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";

// ── Modern Color Palette ────────────────────────────────
const PRIMARY = "#2563EB";
const PRIMARY_DARK = "#1D4ED8";
const ACCENT = "#8B5CF6";
const SUCCESS = "#10B981";
const WARNING = "#F59E0B";
const WHITE = "#FFFFFF";
const BG = "#F9FAFB";
const TEXT_DARK = "#111827";
const TEXT_GRAY = "#6B7280";
const TEXT_LIGHT = "#9CA3AF";
const CARD_BG = "#FFFFFF";
const BORDER = "#E5E7EB";

// ── Tiny wave SVG-ish drawn with Views ──────────────────
const MiniWave = ({ color }: { color: string }) => (
  <View style={[styles.waveContainer, { borderTopColor: color + "55" }]} />
);

// ── Stat Card ───────────────────────────────────────────
const StatCard = ({
  icon,
  label,
  value,
  iconBg,
  waveColor,
}: {
  icon: string;
  label: string;
  value: string | number;
  iconBg: string;
  waveColor: string;
}) => (
  <View style={styles.statCard}>
    <View style={[styles.statIconCircle, { backgroundColor: iconBg }]}>
      <Text style={styles.statIcon}>{icon}</Text>
    </View>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
    <View style={[styles.waveBar, { backgroundColor: waveColor + "22" }]}>
      <View style={[styles.waveLine, { borderTopColor: waveColor + "88" }]} />
    </View>
  </View>
);

// ── Quick Access Item ────────────────────────────────────
const QuickItem = ({
  icon,
  label,
  iconBg,
}: {
  icon: string;
  label: string;
  iconBg: string;
}) => (
  <TouchableOpacity style={styles.quickItem} activeOpacity={0.75}>
    <View style={[styles.quickIconBox, { backgroundColor: iconBg }]}>
      <Text style={styles.quickIcon}>{icon}</Text>
    </View>
    <Text style={styles.quickLabel}>{label}</Text>
  </TouchableOpacity>
);

// ── Main Component ───────────────────────────────────────
export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={DARK_RED} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuBtn}>
          <Text style={styles.menuLine}>━━━</Text>
          <Text style={styles.menuLine}>━━━</Text>
          <Text style={styles.menuLine}>━━━</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.headerTitle}>ACADOCS</Text>
          <Text style={styles.headerSub}>School Management</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.bellBtn}>
            <Text style={styles.bellIcon}>🔔</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>M</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeLeft}>
            <View style={styles.welcomeAvatar}>
              <Text style={styles.welcomeAvatarText}>M</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.welcomeGreeting}>Welcome back,</Text>
              <Text style={styles.welcomeName}>Maria Santos</Text>
              <View style={styles.roleTag}>
                <Text style={styles.roleTagIcon}>🎓</Text>
                <Text style={styles.roleTagText}>Teacher</Text>
              </View>
            </View>
          </View>
          {/* Decorative illustration placeholder */}
          <View style={styles.illustrationBox}>
            <Text style={styles.illustrationEmoji}>👩‍💼</Text>
          </View>
        </View>

        {/* Overview */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All ›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <StatCard
            icon="📋"
            label="Total Documents"
            value={1}
            iconBg="#DBEAFE"
            waveColor="#2563EB"
          />
          <StatCard
            icon="🕐"
            label="Pending Review"
            value={1}
            iconBg="#FEF3C7"
            waveColor="#F59E0B"
          />
          <StatCard
            icon="✅"
            label="Reviewed"
            value={0}
            iconBg="#D1FAE5"
            waveColor="#10B981"
          />
        </View>

        {/* Recent Announcements */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionIcon}>📢</Text>
            <Text style={styles.sectionTitle}>Recent Announcements</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All ›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.announcementCard}>
          <View style={styles.annInner}>
            <View style={styles.annIconBox}>
              <Text style={styles.annIcon}>📣</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.annMeta}>
                <View style={styles.annTag}>
                  <Text style={styles.annTagText}>Announcement</Text>
                </View>
                <Text style={styles.annDate}>📅 Mar 28, 2026</Text>
              </View>
              <Text style={styles.annTitle}>Faculty Meeting - March 31, 2026</Text>
              <Text style={styles.annBody}>
                All teachers are required to attend the faculty meeting in the
                conference room at 3:00 PM.
              </Text>
            </View>
            <Text style={styles.annArrow}>›</Text>
          </View>
          {/* Dots */}
          <View style={styles.dotsRow}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Quick Access */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionIcon}>⊞</Text>
            <Text style={styles.sectionTitle}>Quick Access</Text>
          </View>
        </View>

        <View style={styles.quickGrid}>
          <QuickItem icon="📤" label={"Submit\nDocuments"} iconBg="#DBEAFE" />
          <QuickItem icon="📅" label="Deadlines" iconBg="#E9D5FF" />
          <QuickItem icon="🔗" label={"Document\nLinks"} iconBg="#FCA5A5" />
          <QuickItem icon="💰" label={"School\nFunds"} iconBg="#D1FAE5" />
          <QuickItem icon="📍" label={"Student\nAddresses"} iconBg="#FEF3C7" />
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Styles ───────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: DARK_RED,
  },

  // Header
  header: {
    backgroundColor: WHITE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 16 : 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  menuBtn: { gap: 4, padding: 8, borderRadius: 8 },
  menuLine: { color: TEXT_DARK, fontSize: 12, lineHeight: 14 },
  headerTitle: {
    color: TEXT_DARK,
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  headerSub: { color: TEXT_LIGHT, fontSize: 12, fontWeight: "500" },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  bellBtn: { position: "relative", padding: 8 },
  bellIcon: { fontSize: 20 },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: WARNING,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: { color: WHITE, fontSize: 10, fontWeight: "700" },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: PRIMARY,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: WHITE, fontWeight: "700", fontSize: 16 },

  // Scroll
  scroll: { flex: 1, backgroundColor: BG },
  scrollContent: { paddingTop: 16, paddingHorizontal: 20, paddingBottom: 120 },

  // Welcome Card
  welcomeCard: {
    backgroundColor: PRIMARY,
    borderRadius: 16,
    marginTop: 0,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
  },
  welcomeLeft: { flexDirection: "row", alignItems: "center", flex: 1, gap: 12 },
  welcomeAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeAvatarText: { color: WHITE, fontSize: 24, fontWeight: "700" },
  welcomeGreeting: { color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: "500" },
  welcomeName: { color: WHITE, fontSize: 18, fontWeight: "700", marginTop: 2 },
  roleTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 4,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  roleTagIcon: { fontSize: 12 },
  roleTagText: { color: WHITE, fontSize: 12, fontWeight: "600" },
  illustrationBox: {
    width: 56,
    height: 56,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  illustrationEmoji: { fontSize: 28 },

  // Section Header
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  sectionIcon: { fontSize: 18 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: TEXT_DARK },
  viewAll: { color: PRIMARY, fontSize: 13, fontWeight: "600" },

  // Stats
  statsRow: { flexDirection: "row", gap: 12 },
  statCard: {
    flex: 1,
    backgroundColor: WHITE,
    borderRadius: 12,
    padding: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: BORDER,
  },
  statIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  statIcon: { fontSize: 20 },
  statLabel: { color: TEXT_LIGHT, fontSize: 12, lineHeight: 16, fontWeight: "500" },
  statValue: { color: TEXT_DARK, fontSize: 28, fontWeight: "700", marginTop: 6 },
  waveBar: { marginTop: 12, height: 4, borderRadius: 2, overflow: "hidden" },
  waveLine: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    borderTopWidth: 0,
    borderStyle: "solid",
  },
  waveContainer: { height: 4, borderTopWidth: 0, marginTop: 12, borderRadius: 2 },

  // Announcement Card
  announcementCard: {
    backgroundColor: WHITE,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: BORDER,
  },
  annInner: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  annIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#FEF3C7",
    justifyContent: "center",
    alignItems: "center",
  },
  annIcon: { fontSize: 24 },
  annMeta: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  annTag: {
    backgroundColor: "#DBEAFE",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  annTagText: { color: PRIMARY, fontSize: 11, fontWeight: "600" },
  annDate: { color: TEXT_LIGHT, fontSize: 11, fontWeight: "500" },
  annTitle: { color: TEXT_DARK, fontSize: 15, fontWeight: "700", marginBottom: 6 },
  annBody: { color: TEXT_GRAY, fontSize: 13, lineHeight: 20 },
  annArrow: { color: TEXT_LIGHT, fontSize: 20, marginTop: 4 },
  dotsRow: { flexDirection: "row", justifyContent: "center", gap: 6, marginTop: 14 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#D1D5DB" },
  dotActive: { backgroundColor: PRIMARY },

  // Quick Access
  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  quickItem: {
    backgroundColor: WHITE,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width: "31%",
    flexGrow: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: BORDER,
  },
  quickIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  quickIcon: { fontSize: 24 },
  quickLabel: {
    color: TEXT_DARK,
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 18,
  },

  // Tab Bar
  tabBar: {
    flexDirection: "row",
    backgroundColor: WHITE,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingBottom: Platform.OS === "ios" ? 16 : 8,
    paddingTop: 12,
    paddingHorizontal: 4,
  },
  tabItem: { flex: 1, alignItems: "center", justifyContent: "center" },
  tabIcon: { fontSize: 22, textAlign: "center" },
  tabIconActive: {},
  tabLabel: { color: TEXT_GRAY, fontSize: 10, marginTop: 2, textAlign: "center" },
  tabLabelActive: { color: DARK_RED, fontWeight: "700" },
  tabUnderline: {
    height: 2,
    backgroundColor: DARK_RED,
    borderRadius: 1,
    marginTop: 2,
    width: "60%",
    alignSelf: "center",
  },
  tabBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: ACCENT_RED,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBadgeText: { color: WHITE, fontSize: 9, fontWeight: "700" },
  addBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: DARK_RED,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20,
    shadowColor: DARK_RED,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  addBtnText: { color: WHITE, fontSize: 28, lineHeight: 32, fontWeight: "300" },
});