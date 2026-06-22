import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";

const DARK_RED = "#7B0D0D";
const MID_RED = "#9B1B1B";
const ACCENT_RED = "#B22222";
const WHITE = "#FFFFFF";
const LIGHT_GRAY = "#F5F5F5";
const LABEL_RED = "#C0392B";
const TEXT_DARK = "#222222";
const PLACEHOLDER = "#AAAAAA";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSignIn = () => {
    // Handle sign-in logic here
    console.log("Sign In pressed", { email, password });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={DARK_RED} />

      {/* Background */}
      <View style={styles.background}>
        {/* Decorative circles */}
        <View style={styles.circleTopLeft} />
        <View style={styles.circleBottomRight} />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          {/* Card */}
          <View style={styles.card}>
            {/* Icon */}
            <View style={styles.iconContainer}>
              <Text style={styles.iconEmoji}>🎓</Text>
            </View>

            {/* Title */}
            <Text style={styles.title}>ACADOCS</Text>
            <Text style={styles.subtitle}>Academic Management System</Text>
            <View style={styles.subtitleUnderline} />

            {/* Email Field */}
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === "email" && styles.inputFocused,
              ]}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Enter your email"
              placeholderTextColor={PLACEHOLDER}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
            />

            {/* Password Field */}
            <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
            <TextInput
              style={[
                styles.input,
                focusedField === "password" && styles.inputFocused,
              ]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Enter your password"
              placeholderTextColor={PLACEHOLDER}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
            />

            {/* Sign In Button */}
            <TouchableOpacity
              style={styles.signInButton}
              onPress={handleSignIn}
              activeOpacity={0.85}
            >
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: DARK_RED,
  },
  background: {
    flex: 1,
    backgroundColor: DARK_RED,
    justifyContent: "center",
    alignItems: "center",
  },
  circleTopLeft: {
    position: "absolute",
    top: -80,
    left: -80,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: MID_RED,
    opacity: 0.5,
  },
  circleBottomRight: {
    position: "absolute",
    bottom: -100,
    right: -60,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: ACCENT_RED,
    opacity: 0.4,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 28,
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 24,
    paddingVertical: 40,
    paddingHorizontal: 28,
    width: "100%",
    maxWidth: 380,
    alignItems: "center",
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 12,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: DARK_RED,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  iconEmoji: {
    fontSize: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: DARK_RED,
    letterSpacing: 2,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#888888",
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  subtitleUnderline: {
    width: 40,
    height: 2,
    backgroundColor: DARK_RED,
    borderRadius: 1,
    marginBottom: 28,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 12,
    fontWeight: "600",
    color: LABEL_RED,
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: LIGHT_GRAY,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    color: TEXT_DARK,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  inputFocused: {
    borderColor: DARK_RED,
    backgroundColor: "#FFF5F5",
  },
  signInButton: {
    width: "100%",
    height: 50,
    backgroundColor: DARK_RED,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28,
  },
  signInText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});