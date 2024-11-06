import {create} from 'zustand'

type LanguageStore = {
    selectedLanguage: string;
    setSelectedLanguage: (language:string) => void;
}

export const useLanguageStore = create<LanguageStore>((set)=>({
    selectedLanguage: '',
    setSelectedLanguage: (language) => set({selectedLanguage:language}),
}));