import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, AntDesign } from "@expo/vector-icons";
import { AppColors } from "../../global";
import HomeTab from "./tabs/home-tab";
import ProfileTab from "./tabs/profile-tab";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 90,
        },
        headerShown: false,
        tabBarActiveTintColor: AppColors.primaryColor,
        tabBarInactiveTintColor: AppColors.inactiveColor,
        tabBarLabelStyle: {
          fontSize: 13,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather name="home" size={27} color={getFocusColor(focused)} />
          ),
        }}
        name="Home"
        component={HomeTab}
      />
      {/* <Tab.Screen
				options={{
					tabBarIcon: ({ focused }) => (
						<MaterialCommunityIcons
							name="weather-partly-snowy-rainy"
							size={27}
							color={getFocusColor(focused)}
						/>
					),
				}}
				name="Weather"
				component={WeatherTab}
			/> */}
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="profile"
              size={27}
              color={getFocusColor(focused)}
            />
          ),
        }}
        name="Profile"
        component={ProfileTab}
      />
    </Tab.Navigator>
  );
}

const getFocusColor = (focus: boolean) => {
  return focus ? AppColors.primaryColor : AppColors.inactiveColor;
};
