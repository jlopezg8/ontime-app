import { useField, useFormikContext } from "formik";
import React from 'react';

import { PhotoPicker as DefaultPhotoPicker } from './PhotoPicker';
import { Button, Snackbar, TextField as StyledTextField } from './styled';

/**
 * @requires formik.Formik for Formik state and helpers
 * @requires react-native-paper.Provider for the Material Design components
 * expo-image-picker can be mocked
 */
 export function PhotoPicker({ name } : { name: string }) {
  const { setStatus } = useFormikContext();
  const [{ onChange }] = useField(name);
  return (
    <DefaultPhotoPicker
      setStatus={setStatus}
      setBase64Image={onChange(name)}
    />
  );
}

/**
 * @requires formik.Formik for Formik state and helpers
 * @requires react-native-paper.Provider for the Material Design components
 */
export function StatusSnackbar() {
  const { status, setStatus } = useFormikContext();
  const hasError = Boolean(status);
  const onDismiss = () => setStatus(undefined);
  return (
    <Snackbar visible={hasError} onDismiss={onDismiss} message={status} />
  );
}

/**
 * @requires formik.Formik for Formik state and helpers
 * @requires react-native-paper.Provider for the Material Design components
 */
export function SubmitButton({ label }: { label: string }) {
  const { submitForm, isSubmitting } = useFormikContext();
  return (
    <Button
      mode="contained"
      onPress={submitForm}
      loading={isSubmitting}
      disabled={isSubmitting}
      label={label}
    />
  );
}

export type TextFieldProps<Model> = {
  label: string;
  name: keyof Model & string;
};

/**
 * We don't use <formik.Field as={react-native.TextInput} />, since it injects
 * onChange, onBlur, name, and value into the TextInput, and that can't handle
 * name and needs onChangeText instead of onChange.
 * @requires formik.Formik for Formik state and helpers
 * @requires react-native-paper.Provider for the Material Design components
 */
export function TextField<Model>({ label, name }: TextFieldProps<Model>) {
  const [field, meta] = useField(name);
  const hasError = Boolean(meta.touched && meta.error);
  return (
      <StyledTextField
        label={label}
        value={field.value}
        onChangeText={field.onChange(name)}
        onBlur={field.onBlur(name)}
        error={hasError}
        errorText={meta.error}
      />
  );
}

export interface TextFieldType<Model> {
  (props: TextFieldProps<Model>): ReturnType<typeof TextField>
}