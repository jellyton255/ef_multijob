import { create } from "zustand";

export type Config = {};

export const useStoreConfig = create<Config>((set) => ({
	// Initial State

	// Methods for manipulating state
	setConfig: (config) => {
		if (config.themeColors) {
			set(() => ({
				ThemeColors: config.themeColors,
			}));
		}
	},
}));
