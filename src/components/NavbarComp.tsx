import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Button,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from "@nextui-org/react";
import { useLogoutMutation } from "@/services/auth";

function NavbarComp() {
	const token = localStorage.getItem("token");
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const controller = useMemo(() => new AbortController(), []);
	const navigate = useNavigate();
	const logoutMutate = useLogoutMutation();

	const handleLogout = () => {
		logoutMutate.mutate(
			{ token, controller },
			{
				onSuccess: () => {
					localStorage.removeItem("token");
					navigate("/");
				},
			}
		);
	};

	return (
		<Navbar
			isBordered
			maxWidth="full"
			onMenuOpenChange={setIsMenuOpen}
			className="p-5 font-poppins"
		>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="md:hidden"
				/>
				<NavbarBrand
					onClick={() => navigate(`${token ? "/app" : "/"}`)}
					className="md:justify-normal justify-end"
				>
					<svg
						className="cursor-pointer"
						width="64px"
						height="64px"
						viewBox="0 0 64 64"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="m50.51 41.63c-1.17-5.58-6-4.92-6-4.92s0-.58 0-1.58.33-10.21-2.12-17.42-6.59-12.91-8-13.12-2.75.41-4.84 3.33a50.23 50.23 0 0 0 -7.83 15.13 36.16 36.16 0 0 0 -1.42 12.71c-2.41-.17-5.54 1.29-6.75 5.16s-.62 8.25 2.29 12.88 5.8 4.21 6 3.91-1.71-3.41-1.46-6.2a11.87 11.87 0 0 1 2.5-5.5s1.92 2.7 2.17 3a4.42 4.42 0 0 0 1.46.42s.33 2 .37 2.21 1.92.37 1.92.37 1.13 6.63 1.13 7.13 3.12.46 3.66 0 1.21-7.14 1.21-7.14 3.34 0 3.54 0 .13-2.12.13-2.12a6.59 6.59 0 0 0 1.75-.25 14.5 14.5 0 0 0 1.37-3s.92.25 2.13 3.41-.08 7.88.21 8.34 3.16.16 5-3 2.75-8.17 1.58-13.75zm-16.51-35.46c1.21.13 4.75 6.63 4.5 6.75a17.14 17.14 0 0 0 -5.29-.5 22.88 22.88 0 0 0 -5 .71c.18-.21 4.55-7.08 5.79-6.96zm-14.66 42.71a9.36 9.36 0 0 0 -.29 5.67s-2.5-1.46-3.83-7.17.87-9.5 4.92-10.08a21.61 21.61 0 0 0 .86 4.7c.71 2.3 1 3 1 3s-1.53.59-2.66 3.88zm9.17 2c-.12 0-.87.17-1-.08a6.38 6.38 0 0 1 0-1.25c.21 0 .79-.21.88 0s.25 1.45.12 1.37zm3.83 6.71c-.25.17-.83.46-1 .13s-2.17-16.3-2-17.34c.12-.62 4.21-1.29 4.37-.79s-1.12 17.87-1.37 18.04zm5-6.62a13.31 13.31 0 0 1 -2.34-.05c0-.12.25-1.37.25-1.37a9.53 9.53 0 0 1 2.21.12c.01.17-.03 1.33-.16 1.33zm4.75-10.13s-3.71-4.75-3.83-4.71-.54.34-.46.5 4.08 5 4 5.38a4.81 4.81 0 0 1 -.54 1.62c-.17.09-3.62-4.54-3.79-4.54s-.42.46-.42.46a61.77 61.77 0 0 1 3.63 5.08c-.09.25-.46 1-.46 1s-3.08-3.71-3.22-3.75-.58.5-.42.67a40.45 40.45 0 0 1 3.34 4c-.09.21-.5 1.46-.5 1.46h-.63a20.58 20.58 0 0 0 -2-2.59c-.25 0-.54.42-.54.59s1.71 2 1.54 2.08-2.46.08-2.46.08.5-8.62.09-9.29a2.25 2.25 0 0 0 -2.42-1.21 18.69 18.69 0 0 0 -4.79 1.54c-1 .55-.75 2.46-.63 3.21a50.21 50.21 0 0 1 .76 5.58 9.25 9.25 0 0 1 -2.16 0c-.18-.12-3.67-3.91-4.18-10.87a40.39 40.39 0 0 1 2.71-17.21c1.46-3.62 2.16-5.12 2.16-5.12a16.59 16.59 0 0 1 6.71-1.29c3.75.08 5.42.83 5.63 1.08a36.47 36.47 0 0 1 3 8.92 27.26 27.26 0 0 1 .41 4.83s-1.15-1.46-1.4-1.34-.38.67-.38.67a16.3 16.3 0 0 1 1.75 1.71c0 .21.13 2 .13 2s-2.13-2.71-2.38-2.58-.54.46-.41.62 2.71 2.92 2.83 3.21a8.93 8.93 0 0 1 0 1.83s-3.25-3.46-3.42-3.46-.62.42-.29.63a45 45 0 0 1 3.67 4.08c0 .21-.13 2.25-.13 2.25s-3.5-4.12-3.66-4.08-.42.42-.34.58 3.88 4.13 3.88 4.5a16.51 16.51 0 0 1 -.42 1.92zm7.17 7a14.1 14.1 0 0 0 -2.5-1.46c-.13.17-.13.75.12.88a9.63 9.63 0 0 1 2.17 1.74 10.7 10.7 0 0 1 -.12 1.92l-.09.38s-1.75-1.25-2-1.17-.5.42-.25.67 2 1.37 1.88 1.62a7.46 7.46 0 0 1 -1.42 2.46 6.57 6.57 0 0 1 -1.54 1.08s.88-5.66-.62-8.16-2.38-2.67-2.38-2.67a35.41 35.41 0 0 0 1.25-3.92c.58-2.25.79-2.91.79-2.91a10.19 10.19 0 0 1 3.09 1.29c1 .71 1.54 5.12 1.54 5.12s-2.63-1.71-2.75-1.71-.38.79-.13.91a24.87 24.87 0 0 1 2.88 1.71 22.82 22.82 0 0 1 .04 2.3zm-32.58-6.38a5 5 0 0 0 -.38 2.21c.09.17.63.13.84 0s-.05-1 .41-1.66a3 3 0 0 1 1.25-.92l-.37-.83a2.18 2.18 0 0 0 -1.75 1.2zm21.71-18.37c-.38-4.88-4.07-6.19-6.34-5.38-5.25 1.88-5.33 7.71-2.12 10.67s8.83-.38 8.46-5.29zm-1.84 1.5a23.87 23.87 0 0 0 -2-3.33c-.25 0-.79.33-.67.5a28.13 28.13 0 0 1 2.21 3.87 3 3 0 0 1 -3.71 1.75c-2.58-.75-3.62-4.08-3-5.87s1.95-2.38 3.66-2.55a3.14 3.14 0 0 1 3.21 2.5 15.07 15.07 0 0 1 .3 3.13zm-4.55-3.5a.44.44 0 0 0 -.58-.42 2 2 0 0 0 -1.21.79 3.7 3.7 0 0 0 -.38 1.8c0 .25.79.33 1.13.2s.12-.29.12-.87.85-1.25.92-1.5zm.54 1.58a12.54 12.54 0 0 0 1.58 3c.25.17.42-.08.67-.37s-1.17-2.55-1.42-2.84-.86.03-.86.21zm-.49 1.33a1.84 1.84 0 0 0 -.71.63 4.57 4.57 0 0 0 .92 1.37c.21.16.67-.05.79-.17s-.75-1.96-1-1.83zm.73-8.27a.49.49 0 0 0 -.47-.72.54.54 0 0 0 -.47.77.57.57 0 0 0 .94-.09zm2.82.08a.49.49 0 0 0 -.48-.72.53.53 0 0 0 -.46.77.57.57 0 0 0 .94-.09zm2.4 1.65a.49.49 0 0 0 -.48-.72.54.54 0 0 0 -.46.77.57.57 0 0 0 .94-.05zm1.57 2.75a.49.49 0 0 0 -.48-.72.54.54 0 0 0 -.47.77.58.58 0 0 0 .96-.05zm-.4 3.11a.57.57 0 0 0 .94-.05.49.49 0 0 0 -.48-.72.54.54 0 0 0 -.45.77zm.38 2.09a.53.53 0 0 0 -.47.76.56.56 0 0 0 .94-.05.48.48 0 0 0 -.46-.71zm-1.66 3.29a.53.53 0 0 0 -.46.76.57.57 0 0 0 .94 0 .49.49 0 0 0 -.48-.76zm-3.06 1.39a.54.54 0 0 0 -.47.77.57.57 0 0 0 .94-.05.49.49 0 0 0 -.47-.72zm-4.07.19a.54.54 0 0 0 -.46.77.57.57 0 0 0 .94-.05.49.49 0 0 0 -.48-.72zm-3.1-2.19a.54.54 0 0 0 -.46.77.57.57 0 0 0 .94-.05.49.49 0 0 0 -.48-.72zm-1.66-3.25a.54.54 0 0 0 -.46.77.57.57 0 0 0 .94-.05.49.49 0 0 0 -.48-.72zm.15-4a.54.54 0 0 0 -.46.77.57.57 0 0 0 .94-.05.49.49 0 0 0 -.45-.74zm2.23-2.42a.49.49 0 0 0 -.48-.72.53.53 0 0 0 -.46.76.57.57 0 0 0 .97-.06zm2.21-1.73a.49.49 0 0 0 -.48-.72.53.53 0 0 0 -.46.76.57.57 0 0 0 .97-.06z"
							fill="#D65A31"
						/>
					</svg>
					<p className="font-bold text-[#D65A31] text-xl cursor-pointer">
						My <br /> Todo
					</p>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent justify="end" className="md:flex hidden">
				{token ? (
					<NavbarItem>
						<Button
							isLoading={logoutMutate.isPending}
							radius="sm"
							onPress={() => handleLogout()}
							className="bg-[#D65A31] text-[#EEEEEE] text-base font-semibold"
						>
							Logout
						</Button>
					</NavbarItem>
				) : (
					<>
						<NavbarItem>
							<Button
								radius="sm"
								onPress={() => navigate("/auth#login")}
								className="bg-[#EEEEEE] text-[#D65A31] text-base font-semibold"
							>
								Login
							</Button>
						</NavbarItem>
						<NavbarItem>
							<Button
								onPress={() => navigate("/auth#register")}
								radius="sm"
								className="bg-[#EEEEEE] text-[#D65A31] text-base font-semibold"
							>
								Register
							</Button>
						</NavbarItem>
					</>
				)}
			</NavbarContent>
			<NavbarMenu className="pt-20 gap-y-10">
				{token ? (
					<NavbarMenuItem className="w-full">
						<Button
							isLoading={logoutMutate.isPending}
							onPress={() => handleLogout()}
							radius="sm"
							className="bg-[#D65A31] text-[#EEEEEE] text-base font-semibold w-full"
						>
							Logout
						</Button>
					</NavbarMenuItem>
				) : (
					<>
						<NavbarMenuItem className="w-full">
							<Button
								onPress={() => navigate("/auth#login")}
								radius="sm"
								className="bg-[#EEEEEE] text-[#D65A31] text-base font-semibold w-full"
							>
								Login
							</Button>
						</NavbarMenuItem>
						<NavbarMenuItem className="w-full">
							<Button
								onPress={() => navigate("/auth#register")}
								radius="sm"
								className="bg-[#EEEEEE] text-[#D65A31] text-base font-semibold w-full"
							>
								Register
							</Button>
						</NavbarMenuItem>
					</>
				)}
			</NavbarMenu>
		</Navbar>
	);
}

export default NavbarComp;
