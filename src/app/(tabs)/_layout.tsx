import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from '../../theme';

export default function TabLayout() {
    const { colors } = useTheme();
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: "gray",


                tabBarStyle: {
                    height: 65,
                    borderTopWidth: 0,
                    paddingBottom: 8,
                    paddingTop: 8,
                    backgroundColor: colors.background,
                },
            }}
        >
            <Tabs.Screen
                name="index"

                options={{
                    title: "Home",

                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="home"
                            size={size }
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="chat"
                options={{
                    title: "Chat",

                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="chatbubble"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",

                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="person"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",

                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="settings"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}