import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import useTitle from "@/utils/useTitle";

function NotFound() {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	useTitle("Page Not Found");

	return (
		<div className="flex justify-center items-center home-bg bg-no-repeat bg-cover bg-center md:h-screen min-h-screen">
			<main className="h-5/6 w-11/12 flex flex-col items-center p-4 rounded-sm bg-[#EEEEEE]/30 backdrop-filter backdrop-blur-xl">
				<p className="font-inter text-9xl font-black text-[#D65A31]">404</p>
				<p className="mt-32 font-poppins text-5xl text-[#EEEEEE] font-semibold">
					No such page exist.
				</p>
				<Button
					onPress={() => navigate(`${token ? "/app" : "/"}`, { replace: true })}
					className="mt-20 md:w-4/12 w-full h-14 text-3xl font-bold font-inter bg-[#EEEEEE] text-[#D65A31] rounded-sm"
				>
					Head home
				</Button>
			</main>
		</div>
	);
}

export default NotFound;
