import { Tabs } from "expo-router";
import { Entypo } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="cards"
        options={{
          title: "Hobbies",
          tabBarIcon: ({ color }) => (
            <Entypo name="globe" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="repository"
        options={{
          title: "Repositorio",
          tabBarIcon: ({ color }) => (
            <Entypo name="github" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
