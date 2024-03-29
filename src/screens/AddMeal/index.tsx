import { useState } from "react";
import { Alert, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ScreenContent } from "@components/ScreenContent";
import { LayoutContainer } from "@components/LayoutContainer";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { InputDatepicker } from "@components/InputDatepicker";
import { Button } from "@components/Button";
import { InputRadio } from "@components/InputRadio";

import { mealCreate } from "@storage/meal/meal-create";
import { MealStorageDTO } from "@storage/meal/meal-storage-dto";
import { AppError } from "@utils/app-error";
import { AccomplishmentTypes } from "@utils/types/accomplishment-types";

import {
  ActionAreaContainer,
  GroupColumnContainer,
  GroupRowContainer,
  GroupTitle,
} from "./styles";

export function RegisterMeal() {
  const [nameValue, setNameValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [radioValue, setRadioValue] = useState<AccomplishmentTypes | "">("");
  const navigation = useNavigation();

  const handleChangeNameValue = (value: string) => {
    setNameValue(value);
  };
  const handleChangeDescriptionValue = (value: string) => {
    setDescriptionValue(value);
  };
  const handleChangeDateValue = (value: string) => {
    setDateValue(value);
  };

  const handleChangeTimeValue = (value: string) => {
    setTimeValue(value);
  };

  const handleChangeRadioValue = (value: AccomplishmentTypes) => {
    setRadioValue(value);
  };

  const handleRegisterMeal = async () => {
    if (
      !nameValue.trim() ||
      !descriptionValue.trim() ||
      !dateValue ||
      !timeValue ||
      !radioValue
    ) {
      Alert.alert("Nova refeição", "É necessário preencher todos os campos.");
    } else {
      try {
        const newMeal: Omit<MealStorageDTO, "id"> = {
          title: nameValue.trim(),
          description: descriptionValue.trim(),
          date: dateValue,
          status: radioValue,
          time: timeValue,
        };

        await mealCreate(newMeal);
        navigation.navigate("feedback", { type: radioValue });
      } catch (error) {
        if (error instanceof AppError) {
          Alert.alert("Nova refeição", error.message);
        } else {
          console.log(error);

          Alert.alert(
            "Nova refeição",
            "Não foi possível cadastrar uma nova refeição."
          );
        }
      }
    }
  };

  return (
    <LayoutContainer variant={"NEUTRAL"}>
      <Header title="Nova refeição" />
      <ScreenContent style={{ gap: 20 }}>
        <Input
          title="Nome"
          value={nameValue}
          onChangeText={handleChangeNameValue}
        />
        <Input
          title="Descrição"
          variant="textarea"
          value={descriptionValue}
          onChangeText={handleChangeDescriptionValue}
        />
        <GroupRowContainer>
          <InputDatepicker
            title="Data"
            style={{ width: Dimensions.get("window").width / 2 - 34 }}
            value={dateValue}
            handleOnChange={handleChangeDateValue}
          />
          <InputDatepicker
            title="Hora"
            style={{ width: Dimensions.get("window").width / 2 - 34 }}
            value={timeValue}
            mode="time"
            handleOnChange={handleChangeTimeValue}
          />
        </GroupRowContainer>
        <GroupColumnContainer>
          <GroupTitle>Está dentro da dieta</GroupTitle>
          <GroupRowContainer>
            <InputRadio
              variant="SUCCESS"
              isSelected={radioValue === "SUCCESS"}
              title="Sim"
              style={{ width: Dimensions.get("window").width / 2 - 34 }}
              onPress={() => handleChangeRadioValue("SUCCESS")}
            />
            <InputRadio
              variant="FAILURE"
              isSelected={radioValue === "FAILURE"}
              title="Não"
              style={{ width: Dimensions.get("window").width / 2 - 34 }}
              onPress={() => handleChangeRadioValue("FAILURE")}
            />
          </GroupRowContainer>
        </GroupColumnContainer>
        <ActionAreaContainer>
          <Button label="Cadastrar refeição" onPress={handleRegisterMeal} />
        </ActionAreaContainer>
      </ScreenContent>
    </LayoutContainer>
  );
}
