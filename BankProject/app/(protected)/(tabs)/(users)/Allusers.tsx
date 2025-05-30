import { getAllUsers, transferMoney } from "@/api/users";
// import AuthContext from "@/context/AuthContext";
import { userscard } from "@/data/usersdata";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Allusers = () => {
  // const { setIsAuthenticated } = useContext(AuthContext);
  const [amount, setAmount] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();
  const {
    data,
    isLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });
  const { mutate } = useMutation({
    mutationKey: ["LoginFn"],
    mutationFn: ({ amount, username }: { amount: number; username: string }) =>
      transferMoney(amount, username),
    onSuccess: (data) => {
      alert("transfer Successfully");
      setAmount("");
      setUsername("");
      refetchUser();
    },
    onError: (error) => {
      console.log("Login error", error);
      alert(" transfer not done");
    },
  });

  const handleTransfer = () => {
    if (!username) {
      alert("please choose the username");
      return;
    }
    if (!amount) {
      alert("please enter number");
      {
        return;
      }
    }
    mutate({ amount: Number(amount), username: String(username) });
  };

  // console.log("HOME", data);

  // console.log("profile", data);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  // const loadUsers = async () => {
  //   const result = await getAllUsers();
  //   setIsAuthenticated(result);
  // };

  // useEffect(() => {
  //   if (isTransferred) {
  //     refetchUser();
  //   }
  // }, []);

  return (
    <View style={{ padding: 20, backgroundColor: "#ddd", flex: 1 }}>
      <View>
        <Text
          style={{
            color: "white",
            marginBottom: 20,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          LIST OF USERS:
        </Text>
      </View>

      {/* list user + with the map i can click on the user and choose it*/}
      <ScrollView>
        {data.map((data: any) => (
          <TouchableOpacity
            key={data?._id}
            onPress={() => setUsername(data.username)}
            style={{
              flexDirection: "row",
              backgroundColor: "#0488",
              padding: 15,
              marginBottom: 15,
              borderRadius: 15,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 55,
                height: 55,
                borderRadius: 30,
                marginRight: 15,
                borderWidth: 2,
                padding: 15,
              }}
            >
              <FontAwesome name="user" size={28} color="#8576" />
            </View>

            <View style={{ width: "70%" }}>
              <Text
                style={{
                  color: "yellow",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {data?.username}
              </Text>
              <Text
                style={{ color: "yellow", fontSize: 13, marginTop: 2 }}
              ></Text>
              <Text
                style={{
                  color: "#046099",
                  fontSize: 15,
                  fontWeight: "600",
                  marginTop: 5,
                }}
              >
                {data?.balance} KWD
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* amount enter */}
      <TextInput
        placeholder="Enter the amount"
        value={amount}
        onChangeText={setAmount}
        style={{
          backgroundColor: "#093762",
          color: "white",
          borderRadius: 8,
          padding: 10,
          marginTop: 20,
        }}
      />

      {/* the click tranfer */}
      <TouchableOpacity
        onPress={handleTransfer}
        style={{
          backgroundColor: "#065A82",
          padding: 12,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <Text
          style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
        >
          transfer user {username}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Allusers;
