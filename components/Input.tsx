import { useController } from "react-hook-form";
import { TextInput } from "react-native-gesture-handler";

export default function Input({ name, control }) {
    const { filed } = useController({
        defaultValue: "",
        name
    })
    return(
        <TextInput />
    )
}