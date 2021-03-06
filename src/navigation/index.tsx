/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '@constants/Colors';
import useColorScheme from '@hooks/useColorScheme';
import { Text, View } from '@components/Themed';
import Message from './Message';
import {
  GlobalMenuScreens, DetailScreens, ModalScreens,
} from './Screens';
import { RootStackParamList, RootTabParamList, initialRouteName } from './types';
import LinkingConfiguration from './LinkingConfiguration';
import { navigationRef } from './navigator'


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      ref={navigationRef}
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
      <Message />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={initialRouteName}
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      {DetailScreenNavigator()}
      <Stack.Group
        screenOptions={{ presentation: 'modal' }}
        children={ModalScreenNavigator()}
      />
    </Stack.Navigator>
  );
}

/**
 * グローバルメニューのスクリーン群
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();
function BottomTabNavigator() : JSX.Element {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
      tabBar={BottomMenu}
    >
      {GlobalMenuScreens.map(row => (
        <BottomTab.Screen
          name={row.page}
          key={row.page}
          component={row.component}
          options={row.options}
        />
      ))}
    </BottomTab.Navigator>
  );
}

/**
 * 詳細ページ系のスクリーン
 */
function DetailScreenNavigator() : JSX.Element[] {
  return DetailScreens.map(props => (
    <Stack.Screen
      name={props.page}
      key={props.page}
      component={props.component}
      options={props.options}
    />
  ));
}

/**
 * Modalで開くスクリーン
 */
function ModalScreenNavigator() : JSX.Element[] {
  return ModalScreens.map(props => (
    <Stack.Screen
      name={props.page}
      key={props.page}
      component={props.component}
      options={props.options}
    />
  ));
}

/**
 * メニュー
 */
 function BottomMenu(params:BottomTabBarProps) {
  const { state, descriptors, navigation } = params;
  return (
    <View style={styles.menus}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        return (
          <TouchableOpacity
            style={styles.menu}
            onPress={() => {
              navigation.navigate(initialRouteName, { screen: route.name });
            }}
            key={`menu-${route.name}`}
          >
            <MaterialCommunityIcons
              name={options.tabBarLabel as React.ComponentProps<typeof MaterialCommunityIcons>['name']}
              color={isFocused ? Colors.primary : Colors.black1}
              size={40}
            />
            <Text
              style={[
                styles.label,
                isFocused ? styles.selected : null,
              ]}
            >
              {options.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  menus: {
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.black2,
    height: 80,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white1,
  },
  menu: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: Colors.black1,
    fontSize: 10,
    lineHeight: 10,
    marginTop: 4,
  },
  selected: {
    color: Colors.primary,
  },
});