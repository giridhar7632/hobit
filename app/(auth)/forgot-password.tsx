import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedView } from '@/components/ui/ThemedView'
import { Controller, useForm } from 'react-hook-form'
import { Button, StyleSheet, TextInput, View } from 'react-native'
import Constants from 'expo-constants'

export default function TrackScreen() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
		},
	})
	const onSubmit = (data: any) => {
		console.log(data)
	}

	return (
		<ThemedView style={styles.container}>
			<ThemedText style={styles.label}>Email</ThemedText>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						style={styles.input}
						onBlur={onBlur}
						onChangeText={(value) => onChange(value)}
						value={value}
					/>
				)}
				name='email'
				rules={{ required: true }}
			/>

			<View style={styles.button}>
				<Button title='Button' onPress={handleSubmit(onSubmit)} />
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
})
