import Select, {ActionMeta, SingleValue} from 'react-select'
import {ReactNode, useState} from "react";

interface OptionType {
    value: string;
    label: string;
}

interface SelectorMovieProps {
    options: OptionType[];
    onChange?: (option: OptionType | null) => void;
    placeholder?: string;
}

export const SelectorMovie: React.FC<SelectorMovieProps> = ({options, placeholder}) => {
    const [selectedGenre, setSelectedGenre] = useState<OptionType | null>(null)


    const handleChange = (
        newValue: SingleValue<OptionType>,
        actionMeta: ActionMeta<OptionType>
    ) => {
        setSelectedGenre(newValue);
        console.log('Действие:', actionMeta.action);
        console.log('Выбрано:', newValue);
    }

        return (
            <Select value={selectedGenre} onChange={handleChange} options={options} placeholder={placeholder} />
        )
}