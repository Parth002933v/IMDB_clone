import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { IoIosArrowDown } from 'react-icons/io';
import useToggle from '~/hooks/useToogle';

interface FilterMenuProps<T extends string> {
	menuTitle: string;
	menuOptions: T[];
	className?: string;
	darkTheme?: boolean;
	onClick?: (string: T) => void;
}

const FilterMenu = <T extends string>({
	menuOptions,
	menuTitle,
	darkTheme = false,
	onClick,
}: FilterMenuProps<T>) => {
	const { isOpen, toggleIsOpen } = useToggle(true);

	const [selectedOption, setSelectedOption] = useState(menuOptions[0]);

	// console.log(selectedOption);
	return (
		<div className={'flex items-center px-5'}>
			<label
				className={twMerge(
					'whitespace-nowrap pr-4 text-xl font-semibold capitalize',
					darkTheme && 'text-white'
				)}
			>
				{menuTitle}
			</label>

			<div className={'relative h-8 w-full'}>
				<div className={'absolute left-0 top-0 w-auto'}>
					{/*selected option for small screen*/}
					<div
						className={twMerge(
							'absolute flex h-8 cursor-pointer select-none items-center justify-center gap-1 whitespace-nowrap',
							'rounded-xl bg-[#032541] px-6 text-center text-[#1cd3ad] transition-all',
							isOpen ? 'hidden' : 'animate-delay-visible md:hidden',
							darkTheme &&
								'bg-gradient-to-l from-[#21d6aa] to-[#bcfdce] text-[#032541]'
						)}
						onClick={() => toggleIsOpen()}
					>
						<div className={'bg-clip-text'}>{selectedOption}</div>
						<IoIosArrowDown
							strokeWidth={36}
							color={`${darkTheme ? '#032541' : '#1cd3ad'} `}
							className={twMerge(
								isOpen ? 'rotate-180' : 'rotate-0',
								`hidden bg-clip-content transition-all max-md:block`
							)}
						/>
					</div>

					<div
						className={twMerge(
							'relative top-0 z-[1] flex min-h-8 items-center justify-end overflow-hidden',
							'whitespace-nowrap rounded-2xl border border-black',
							darkTheme && 'border-[#21d6aa]',
							'text-start font-semibold transition-all duration-300 ease-in',
							isOpen
								? 'max-w-[400rem] opacity-100 max-md:max-h-40'
								: 'max-w-[400rem] max-md:max-h-14 max-md:opacity-0',
							'max-md:flex-col max-md:bg-gradient-to-l max-md:from-[#21d6aa] max-md:to-[#bcfdce]'
						)}
					>
						{menuOptions?.map((val, i) => {
							return (
								<div
									key={val}
									className={twMerge(
										'flex h-8 w-full cursor-pointer select-none items-center justify-center gap-1 rounded-xl px-4 text-center',
										'sticky left-0 right-0 text-[#032541]',
										val === selectedOption &&
											!darkTheme &&
											'bg-[#032541] text-[#1cd3ad]',
										val === selectedOption &&
											darkTheme &&
											'bg-gradient-to-l from-[#21d6aa] to-[#bcfdce]',

										val !== selectedOption && darkTheme && 'text-white'
									)}
									// onClick={() => onselect}

									onClick={() => {
										if (val === selectedOption) {
											toggleIsOpen();
										} else {
											setSelectedOption(menuOptions[i]);
											toggleIsOpen();
											if (onClick) {
												onClick(menuOptions[i]);
											}
										}
									}}
								>
									<div
										className={twMerge(
											'bg-clip-text'
											// val === selectedOption
											// 	? 'text-[#1cd3ad]'
											// 	: 'text-[#032541]'
										)}
									>
										{val}
									</div>
									<IoIosArrowDown
										strokeWidth={36}
										color={'#1cd3ad'}
										className={twMerge(
											'bg-clip-content transition-all',
											isOpen ? 'rotate-180' : 'rotate-0',
											val === selectedOption
												? 'hidden max-md:block'
												: 'hidden'
										)}
									/>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FilterMenu;
