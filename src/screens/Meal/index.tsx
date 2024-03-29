import { useCallback, useRef, useState } from "react";
import { Alert } from "react-native";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { LayoutContainer } from "@components/LayoutContainer";
import { ScreenContent } from "@components/ScreenContent";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Flag } from "@components/Flag";

import { MealStorageDTO } from "@storage/meal/meal-storage-dto";
import { mealGetById } from "@storage/meal/meal-get-by-id";
import { AppError } from "@utils/app-error";
import { StatusTextEnum } from "@utils/enum/status-text-enum";

import {
  ActionGroupContainer,
  TextDescription,
  TextGroupContainer,
  TextSubtitle,
  TextTitle,
} from "./styles";
import { Modalize } from "react-native-modalize";
import { RemoveMealModal } from "@components/RemoveMealModal";

type RouteParams = {
  id: string;
};

export function Meal() {
  const removeMealModalRef = useRef<Modalize>(null);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<MealStorageDTO | undefined>();
  const navigation = useNavigation();
  const { params } = useRoute();
  const { id } = params as RouteParams;

  const fetchMealData = async () => {
    try {
      setLoading(true);
      const data = await mealGetById(id);
      setData(data);
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Refeição", error.message, [
          {
            text: "Ok",
            onPress: () => {
              navigation.navigate("home");
            },
          },
        ]);
      } else {
        Alert.alert(
          "Refeição",
          "Não foi possível carregar as informações da refeição selecionada.",
          [
            {
              text: "Ok",
              onPress: () => {
                navigation.navigate("home");
              },
            },
          ]
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditMeal = () => {
    navigation.navigate("editmeal", { id: id });
  };

  const handleOpenRemoveMealModal = () => {
    removeMealModalRef.current?.open();
  };

  useFocusEffect(
    useCallback(() => {
      fetchMealData();
    }, [])
  );

  if (!data || isLoading) {
    return (
      <LayoutContainer variant="NEUTRAL">
        <Header title="Refeição" />
        <ScreenContent style={{ gap: 12 }}>
          <TextTitle>
            Aguarde, estamos carregando os dados da refeição.
          </TextTitle>
        </ScreenContent>
      </LayoutContainer>
    );
  }

  return (
    <>
      <LayoutContainer variant={data.status}>
        <Header title="Refeição" />
        <ScreenContent style={{ gap: 24 }}>
          <TextGroupContainer>
            <TextTitle>{data.title}</TextTitle>
            <TextDescription>{data.description}</TextDescription>
          </TextGroupContainer>
          <TextGroupContainer>
            <TextSubtitle>Data e hora</TextSubtitle>
            <TextDescription>
              {data.date} às {data.time}
            </TextDescription>
          </TextGroupContainer>
          <Flag status={data.status} text={StatusTextEnum[data.status]} />
          <ActionGroupContainer>
            <Button
              label="Editar refeição"
              icon="pencilSimpleLine"
              onPress={handleEditMeal}
            />
            <Button
              variant="secondary"
              label="Excluir refeição"
              icon="trash"
              onPress={handleOpenRemoveMealModal}
            />
          </ActionGroupContainer>
        </ScreenContent>
      </LayoutContainer>
      <RemoveMealModal id={id} removeMealModalRef={removeMealModalRef} />
    </>
  );
}
