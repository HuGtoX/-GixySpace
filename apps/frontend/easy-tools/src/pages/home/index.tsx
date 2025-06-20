import Header from './components/Header';
import Footer from './components/Footer';
import News from './components/News';
import Tools from './components/Tools';
import Aside from './components/Aside';

const HomePage = () => {
	return (
		<div className="font-inter pb-[50px]  bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 theme-transition">
			<Header />
			<main className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
				<section className="lg:col-span-7 space-y-6">
					<News />
				</section>
				<section className="lg:col-span-3 space-y-6">
					<Tools />
				</section>
				<aside className="lg:col-span-2 space-y-6">
					<Aside />
				</aside>
			</main>
			<Footer />
		</div>
	);
};

export default HomePage;
