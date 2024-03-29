import { useRef, useState } from "react";
import { Keyboard, Pressable, TextInputProps } from "react-native";
import { Modalize } from "react-native-modalize";

import { Datepicker, DatepickerModeTypes } from "@components/Datepicker";

import { InputContainer, InputLabel, StyledInput } from "./styles";

type InputProps = Omit<TextInputProps, "onChange"> & {
  title: string;
  value: string;
  mode?: DatepickerModeTypes;
  handleOnChange: (date: string) => void;
};

export function InputDatepicker({
  title,
  style,
  mode = "date",
  value,
  handleOnChange,
  ...rest
}: InputProps) {
  const ref = useRef<Modalize>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  function handleOpenDatepicker() {
    Keyboard.dismiss();
    ref.current?.open();
    setDatePickerVisibility(true);
  }

  function handleCloseDatepicker() {
    ref.current?.close();
    setDatePickerVisibility(false);
  }

  return (
    <>
      <InputContainer style={style}>
        <InputLabel>{title}</InputLabel>
        <Pressable onPress={handleOpenDatepicker}>
          <StyledInput
            editable={false}
            value={value}
            onPressIn={handleOpenDatepicker}
            {...rest}
          />
        </Pressable>
      </InputContainer>
      <Datepicker
        title={title}
        datepickerRef={ref}
        isDatepickerVisible={isDatePickerVisible}
        onChange={handleOnChange}
        onCloseDatepicker={handleCloseDatepicker}
        value={value}
        mode={mode}
      />
    </>
  );
}
