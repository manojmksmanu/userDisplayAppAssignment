import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";

const { width } = Dimensions.get("window");

const UserCard = ({ currentUser }: { currentUser: any }) => {
  const [imageLoading, setImageLoading] = useState(true); 

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.userCardContainer}>
      <View style={styles.userCard}>
        <View style={styles.avatarContainer}>
          {imageLoading && (
            <View style={styles.placeholder}>
              <ActivityIndicator size="small" color="#7f8c8d" />
            </View>
          )}
          <Image
            source={{ uri: currentUser.avatar }}
            style={[
              styles.avatar,
              imageLoading && { opacity: 0 }, 
            ]}
            resizeMode="cover"
            onLoadStart={() => setImageLoading(true)} 
            onLoadEnd={() => setImageLoading(false)} 
            onError={() => setImageLoading(false)} 
          />
          <Text style={styles.userName}>
            {currentUser.first_name} {currentUser.last_name}
          </Text>
          <Text style={styles.userUsername}>@{currentUser.username}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.userInfo}>
          <InfoRow label="ID" value={currentUser.id.toString()} />
          <InfoRow label="UID" value={currentUser.uid} />
          <InfoRow label="Password" value={currentUser.password} />
          <InfoRow label="First Name" value={currentUser.first_name} />
          <InfoRow label="Last Name" value={currentUser.last_name} />
          <InfoRow label="Username" value={currentUser.username} />
          <InfoRow label="Email" value={currentUser.email} />
        </View>
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  userCardContainer: {
    padding: 16,
    alignItems: "center",
  },
  userCard: {
    backgroundColor: "white",
    borderRadius: 16,
    width: width * 0.9,
    padding: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
  avatarContainer: {
    alignItems: "center",
    padding: 20,
    paddingBottom: 16,
    backgroundColor: "#f8f9fa",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: "white",
  },
  placeholder: {
    position: "absolute",
    width: 120,
    height: 120,
    marginTop: 20,
    borderRadius: 70,
    backgroundColor: "#f8f9fa",
    borderWidth: 4,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginTop: 10,
  },
  userUsername: {
    fontSize: 14,
    color: "#7f8c8d",
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    width: "100%",
  },
  userInfo: {
    padding: 16,
  },
  infoRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: {
    flex: 1,
    fontWeight: "bold",
    color: "#34495e",
    fontSize: 16,
  },
  value: {
    flex: 2,
    color: "#7f8c8d",
    fontSize: 16,
  },
});
