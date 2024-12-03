import { Link } from 'react-router';

type titleLink = {
	title: string;
	link: string;
};
const Footer = () => {
	const TheBasics: titleLink[] = [
		{ title: 'About TMDB', link: '' },
		{ title: 'Contact us', link: '' },
		{ title: 'Suppoer Forums', link: '' },
		{ title: 'API', link: '' },
	];

	const GetInvolved: titleLink[] = [
		{ title: 'Contribution Bible', link: '' },
		{ title: 'Add New Movie', link: '' },
		{ title: 'Add New TV Show', link: '' },
	];

	const Community: titleLink[] = [
		{ title: 'Guidelines', link: '' },
		{ title: 'Discussions', link: '' },
		{ title: 'Leaderboard', link: '' },
	];

	const Legal: titleLink[] = [
		{ title: 'Terms of Use', link: '' },
		{ title: 'API Terms of Use', link: '' },
		{ title: 'Privacy Policy', link: '' },
		{ title: 'DMCA Policy', link: '' },
	];

	return (
		<div className="md:flex h-fit w-full bg-[#03223c] md:gap-9 max-md:px-5 max-md:py-7 md:justify-center md:items-center py-9">
			<div className="max-md:mb-6  items-end md:flex md:flex-col">
				<div className="max-md:hidden w-32 h-32">
					<img src="/logo2.png" alt="fotter logo" />
				</div>
				<div className="w-fit rounded-lg bg-white md:text-xl px-5 py-2 font-semibold text-[#01b4e4]">
					Join the community
				</div>
			</div>

			<div className="flex flex-col gap-9 md:flex-row">
				<LinkSection title={'The Basics'} listItems={TheBasics} />
				<LinkSection title={'Get Involved'} listItems={GetInvolved} />
				<LinkSection title={'Community'} listItems={Community} />
				<LinkSection title={'Legal'} listItems={Legal} />
			</div>
		</div>
	);
};

export default Footer;

interface LinkSectionProps {
	title?: string;
	listItems?: titleLink[];
}

function LinkSection({ title, listItems }: LinkSectionProps) {
	return (
		<div className="text-white">
			<div className="text-lg md:text-xl font-bold">{title}</div>
			{listItems &&
				listItems.map(item => (
					<div key={item.title} className="text-sm md:text-lg	 leading-[1.3rem]">
						<Link to={'/'}>{item.title}</Link>
					</div>
				))}
		</div>
	);
}
