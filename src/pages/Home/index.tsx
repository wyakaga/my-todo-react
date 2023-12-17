import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

import NavbarComp from "@/components/NavbarComp";

function Home() {
	const navigate = useNavigate();

	return (
		<div className="grid grid-cols-1 grid-rows-1 relative home-bg bg-no-repeat bg-cover bg-center md:h-screen min-h-screen">
			<main className="flex flex-col items-center gap-y-28 md:gap-y-36">
				<NavbarComp />
				<section className="flex flex-col items-center gap-y-16 px-12 md:px-0">
					<section className="text-5xl font-inter font-black text-[#EEEEEE] cursor-default">
						<p>
							<span className="bg-gradient-to-r from-[#D65A31] via-[#eba0c0] to-[#EEEEEE] bg-300% animate-gradient inline-block text-transparent bg-clip-text">
								Faster
							</span>
							.
						</p>
						<p>
							More&nbsp;
							<span className="bg-gradient-to-r from-[#D65A31] via-[#eba0c0] to-[#EEEEEE] bg-300% animate-gradient inline-block text-transparent bg-clip-text">
								efficient
							</span>
							.
						</p>
						<p>
							Manage your life&nbsp;
							<span className="bg-gradient-to-r from-[#D65A31] via-[#eba0c0] to-[#EEEEEE] bg-300% animate-gradient inline-block text-transparent bg-clip-text">
								better
							</span>
							.
						</p>
					</section>
					<section>
						<Button
							size="lg"
							radius="sm"
							onPress={() => navigate("/auth#register")}
							className="text-2xl text-[#EEEEEE] font-medium bg-[#D65A31]"
						>
							Get Started
						</Button>
					</section>
				</section>
			</main>
		</div>
	);
}

export default Home;
