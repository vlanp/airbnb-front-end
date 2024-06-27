import { Tabs } from "expo-router";
import MainTabIcons from "../../components/MainTabIcons";
import colors from "../../styles/colors";
import EMainTab from "../../enum/MainTab";
import Logo from "../../components/Logo";

const MainLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          tabBarIcon: (parameters) => {
            return (
              <MainTabIcons color={parameters.color} mainTab={EMainTab.HOME} />
            );
          },
          tabBarLabel: EMainTab.HOME,
          tabBarActiveTintColor: colors.red,
        }}
      />
      <Tabs.Screen
        name="aroundMe"
        options={{
          tabBarIcon: (parameters) => {
            return (
              <MainTabIcons
                color={parameters.color}
                mainTab={EMainTab.AROUND_ME}
              />
            );
          },
          tabBarLabel: EMainTab.AROUND_ME,
          tabBarActiveTintColor: colors.red,
          headerTitle: () => <Logo size={30} isCentered />,
          headerTitleAlign: "center",
        }}
      />
      <Tabs.Screen
        name="myProfile"
        options={{
          tabBarIcon: (parameters) => {
            return (
              <MainTabIcons
                color={parameters.color}
                mainTab={EMainTab.MY_PROFILE}
              />
            );
          },
          tabBarLabel: EMainTab.MY_PROFILE,
          tabBarActiveTintColor: colors.red,
        }}
      />
    </Tabs>
  );
};

export default MainLayout;
