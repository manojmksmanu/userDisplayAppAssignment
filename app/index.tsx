
import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar as RNStatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import UserCard from "@/components/UserCard";
import { fetchUsers, User } from "@/services/api";



export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchUsers();
      setUsers(data);
      setCurrentUserIndex(0);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(errorMessage);
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    loadUsers();
  }, [loadUsers]);


  const goToPreviousUser = useCallback(() => {
    setCurrentUserIndex((prev) => (prev === 0 ? users.length - 1 : prev - 1));
  }, [users.length]);

  const goToNextUser = useCallback(() => {
    setCurrentUserIndex((prev) => (prev === users.length - 1 ? 0 : prev + 1));
  }, [users.length]);


  const renderLoading = () => (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.centeredContainer}
    >
      <ActivityIndicator size="large" color="#ffffff" />
      <Text style={styles.loadingText}>Loading users...</Text>
    </LinearGradient>
  );


  const renderError = () => (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.centeredContainer}
    >
      <Text style={styles.errorText}>
        {error || "Sorry, some error occurred..."}
      </Text>
      <TouchableOpacity
        style={styles.retryButton}
        onPress={loadUsers}
        activeOpacity={0.8}
      >
        <Text style={styles.retryButtonText}>Try Again</Text>
      </TouchableOpacity>
    </LinearGradient>
  );

  const renderContent = () => {
    if (users.length === 0) {
      return (
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={styles.centeredContainer}
        >
          <Text style={styles.errorText}>No user data found</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={loadUsers}
            activeOpacity={0.8}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </LinearGradient>
      );
    }

    const currentUser = users[currentUserIndex];

    return (
      <>
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={styles.header}
        >
          <Text style={styles.headerText}>User Directory</Text>
          <Text style={styles.userCounter}>
            User {currentUserIndex + 1} of {users.length}
          </Text>
        </LinearGradient>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <UserCard currentUser={currentUser} />
        </ScrollView>

        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={[styles.navButton, styles.prevButton]}
            onPress={goToPreviousUser}
            activeOpacity={0.7}
            disabled={users.length <= 1}
          >
            <Text style={styles.navButtonText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, styles.nextButton]}
            onPress={goToNextUser}
            activeOpacity={0.7}
            disabled={users.length <= 1}
          >
            <Text style={styles.navButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? renderLoading() : error ? renderError() : renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    padding: 10,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  userCounter: {
    color: "white",
    marginTop: 4,
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  navButton: {
    padding: 14,
    borderRadius: 20,
    width: "48%",
    alignItems: "center",
  },
  prevButton: {
    backgroundColor: "#3498db",
  },
  nextButton: {
    backgroundColor: "#2980b9",
  },
  navButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingText: {
    marginTop: 16,
    color: "white",
    fontSize: 16,
  },
  errorText: {
    color: "white",
    textAlign: "center",
    marginBottom: 16,
    fontSize: 16,
  },
  retryButton: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: 120,
  },
  retryButtonText: {
    color: "#3b5998",
    fontWeight: "bold",
  },
});
