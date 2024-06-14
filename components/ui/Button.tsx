import React from 'react'
import { colors } from '@/constants/Colors'
import { Text, TouchableOpacity, useColorScheme } from 'react-native'

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
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			disabled={loading}
			style={{ backgroundColor: colors[colorScheme ?? 'light'].tint }}
			className={`rounded-xl justify-center items-center ${containerStyles} ${
				loading ? 'opacity-50' : ''
			}`}>
			<Text
				className={`text-white py-3 px-6 font-semibold font-psemibold text-lg ${textStyles}`}>
				{title}
			</Text>
		</TouchableOpacity>
	)
}
