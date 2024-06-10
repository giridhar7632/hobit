import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { Controller, useForm } from "react-hook-form"
import { Button, StyleSheet, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import Constants from 'expo-constants';

export default function TrackScreen() {
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
          firstName: "",
          lastName: "",
        },
      })
      const onSubmit = data => {
        console.log(data);
      };
    
      const onChange = arg => {
        return {
          value: arg.nativeEvent.text,
        };
      };
    
    return(
        <ThemedView style={styles.container}>
        <ThemedText style={styles.label}>First name</ThemedText>
        <Controller
          control={control}
          render={({field: { onChange, onBlur, value }}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="firstName"
          rules={{ required: true }}
        />
        <ThemedText style={styles.label}>Last name</ThemedText>
        <Controller
          control={control}
          render={({field: { onChange, onBlur, value }}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="lastName"
          rules={{ required: true }}
        />
  
        <View style={styles.button}>
          <Button
            color
            title="Button"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ThemedView>
    )
}

const styles = StyleSheet.create({
    label: {
      color: 'white',
      margin: 20,
      marginLeft: 0,
    },
    button: {
      marginTop: 40,
      color: 'white',
      height: 40,
      backgroundColor: '#171717',
      borderRadius: 4,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      padding: 8,
      backgroundColor: '#0e101c',
    },
    input: {
      backgroundColor: 'white',
      borderColor: 'none',
      height: 40,
      padding: 10,
      borderRadius: 4,
    },
  });