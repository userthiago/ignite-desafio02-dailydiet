import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "@screens/Home";
import { Meal } from "@screens/Meal";
import { RegisterMeal } from "@screens/AddMeal";
import { Statistics } from "@screens/Statistics";
import { EditMeal } from "@screens/EditMeal";
import { Feedback } from "@screens/Feedback";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="statistics" component={Statistics} />
      <Screen name="registermeal" component={RegisterMeal} />
      <Screen name="mealdata" component={Meal} />
      <Screen name="editmeal" component={EditMeal} />
      <Screen name="feedback" component={Feedback} />
    </Navigator>
  );
}
