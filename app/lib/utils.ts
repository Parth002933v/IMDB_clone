import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TCastCrew, TWatchProvider } from '~/tyoes';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getRandomInt(max: number): number {
	return Math.floor(Math.random() * max);
}

export function convertMinutes(minutes: number): { hours: number; minutes: number } {
	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;
	return { hours, minutes: remainingMinutes };
}

export function filterCrewByJobs(
	crewList: TCastCrew['crew']
): { name: string; jobs: string[] }[] {
	const targetJobs = [
		'Director',
		'Writer',
		'Characters',
		'Novel',
		'Creator',
		'Screenplay',
		'Story',
	];

	const crewMap = new Map<string, string[]>();

	crewList.forEach(crew => {
		if (targetJobs.includes(crew.job)) {
			if (crewMap.has(crew.name)) {
				crewMap.get(crew.name)?.push(crew.job);
			} else {
				crewMap.set(crew.name, [crew.job]);
			}
		}
	});

	return Array.from(crewMap, ([name, jobs]) => ({ name, jobs }));
}

export function formatDate(dateStr: string) {
	const date = new Date(dateStr); // Convert the string to a Date object

	// Use toLocaleDateString to format the date
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export function formatMediaType(unFormatedMediaType: string) {
	switch (unFormatedMediaType) {
		case 'tv':
			return 'TV Shows';
		case 'person':
			return 'Person';
		case 'movie':
			return 'Movies';
	}
}

export function generateNumbers(n: number): number[] {
	const numbers: number[] = [];
	for (let i = 1; i <= n; i++) {
		numbers.push(i);
	}
	return numbers;
}

export const localWatchProvider = (lcoal: string, watchProvider: TWatchProvider) => {
	return watchProvider.results;
};

export const convertFormDataToObject = <T>(
	formData: FormData,
	typeMap: Partial<Record<keyof T, 'string' | 'number' | 'boolean'>> = {}
) => {
	const result = {} as T;

	formData.forEach((value, key) => {
		// Determine the type of the current field
		const targetType = typeMap[key as keyof T];

		if (targetType === 'number') {
			(result as any)[key] = Number(value); // Convert to number
		} else if (targetType === 'boolean') {
			(result as any)[key] = value === 'true'; // Convert to boolean
		} else {
			(result as any)[key] = value; // Keep as string
		}
	});
	return result;
};
