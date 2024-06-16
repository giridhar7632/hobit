import React from 'react'
import { colors } from '@/constants/Colors'
import {
	ActivityIndicator,
	Pressable,
	Text,
	useColorScheme,
} from 'react-native'

type ButtonProps = {
	title: string
	handlePress: () => void
	containerStyles?: any
	textStyles?: any
	loading?: boolean
}

export default function Button({
	title,
	handlePress,
	containerStyles,
	textStyles,
	loading,
}: ButtonProps) {
	const colorScheme = useColorScheme()
	return (
		<Pressable
			onPress={handlePress}
			disabled={loading}
			style={{ backgroundColor: colors[colorScheme ?? 'light'].tint }}
			className={`rounded-xl flex flex-row items-center justify-center ${containerStyles} ${
				loading ? 'opacity-80' : ''
			}`}>
			<Text
				className={`text-white py-3 px-6 font-semibold font-psemibold text-lg ${textStyles}`}>
				{title}
			</Text>

			{loading && (
				<ActivityIndicator
					animating={loading}
					color='#fff'
					size='small'
					className='ml-2'
				/>
			)}
		</Pressable>
	)
}
