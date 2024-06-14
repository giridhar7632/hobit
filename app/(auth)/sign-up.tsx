import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedView } from '@/components/ui/ThemedView'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native'
import Constants from 'expo-constants'
import { User } from '@/utils/types'
import { supabase } from '@/utils/supabase'

export default function TrackScreen() {
	const {
		control,
		handleSubmit,
		formState: { errors, isLoading },
	} = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	})

	const onSubmit = async (data: User) => {
		console.log(data)
		const {
			data: { session },
			error,
		} = await supabase.auth.signUp({
			email: data.email,
			password: data.password,
			options: {
				emailRedirectTo: 'https://example.com/welcome',
			},
		})

		if (error) Alert.alert(error.message)
		if (!session) Alert.alert('Please check your inbox for email verification!')
	}

	//   const onChange = arg => {
	//     return {
	//       value: arg.nativeEvent.text,
	//     };
	//   };

	return (
		<ThemedView style={styles.container}>
			<ThemedText style={styles.label}>Name</ThemedText>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						placeholder='What should we call you?'
						style={styles.input}
						onBlur={onBlur}
						onChangeText={(value) => onChange(value)}
						value={value}
					/>
				)}
				name='name'
				rules={{ required: true }}
			/>

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
			<ThemedText style={styles.label}>Password</ThemedText>
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
				name='password'
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
