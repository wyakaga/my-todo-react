import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Divider } from "@nextui-org/react";

import NavbarComp from "@/components/NavbarComp";
import { useGetSingleQuery } from "@/services/todos";
import convertDate from "@/utils/convertDate";

function TodoDetails() {
	const { id } = useParams();
	const token = localStorage.getItem("token");
	const controller = useMemo(() => new AbortController(), []);

	const { data } = useGetSingleQuery(Number(id), token, controller);

	return (
		<div className="grid grid-cols-1 grid-rows-1 relative app-bg bg-no-repeat bg-cover bg-center min-h-screen">
			<main className="flex flex-col items-center gap-y-5 pb-5">
				<NavbarComp />
				<section className="flex flex-col gap-y-5 h-full w-11/12 rounded-sm bg-[#EEEEEE]/30 backdrop-filter backdrop-blur-xl">
					<div className="bg-default-100 p-2">
						<div className="bg-[#D65A31] p-1 rounded-sm">
							<p className="font-inter text-3xl text-[#EEEEEE] font-bold">Details</p>
						</div>
					</div>
					<div className="p-8 h-full rounded-sm">
						<div className="bg-default-100 h-full flex flex-col p-4 font-poppins">
							<p className="text-2xl font-semibold">{data.data.title}</p>
							<Divider className="my-3" />
							<div className="flex flex-col gap-y-7 overflow-auto">
								<p className="text-sm italic">{convertDate(data.data.deadline)}</p>
								<p className="text-xl font-medium">{data.data.description}</p>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

export default TodoDetails;
