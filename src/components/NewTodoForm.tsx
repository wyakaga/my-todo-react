import { ChangeEvent, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Textarea,
} from "@nextui-org/react";

import { useCreateTodoMutation } from "@/services/todos";
import dateValidator from "@/utils/dateValidator";

function NewTodoForm({ isOpen, onOpenChange, token, controller, page }) {
	const queryClient = useQueryClient();
	const createTodoMutate = useCreateTodoMutation();

	const [form, setForm] = useState({
		title: "",
		description: "",
		deadline: "",
	});
	const [errMessage, setErrMessage] = useState("");

	const handleCreateTodoInput = (e: ChangeEvent<HTMLInputElement>) => {
		setForm((form) => {
			return { ...form, [e.target.name]: e.target.value };
		});
	};

	const handleCreateTodoSubmit = (onClose: () => void) => {
		if (!dateValidator(form.deadline)) {
			setErrMessage("Deadline format should be in YYYY-MM-DD");
		}

		setErrMessage("");

		createTodoMutate.mutate(
			{
				title: form.title,
				description: form.description,
				deadline: form.deadline,
				token,
				controller,
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: ["todo", "all", page],
					});
					onClose();
					setErrMessage("");
				},
			}
		);
	};

	return (
		<>
			<Modal
				backdrop="blur"
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				classNames={{
					closeButton: "text-black hover:text-[#EEEEEE] duration-300",
				}}
				className="bg-[#EEEEEE]/50 font-poppins"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Add new todo</ModalHeader>
							<ModalBody>
								<Input onChange={handleCreateTodoInput} type="text" label="Title" name="title" />
								<Textarea
									onChange={handleCreateTodoInput}
									type="text"
									label="Description"
									name="description"
								/>
								<Input
									onChange={handleCreateTodoInput}
									type="text"
									label="Deadline"
									name="deadline"
								/>
							</ModalBody>
							<ModalFooter className="flex flex-col gap-y-2">
								{errMessage && <p>{errMessage}</p>}
								<Button
									onPress={() => handleCreateTodoSubmit(onClose)}
									isLoading={createTodoMutate.isPending && !errMessage}
									className="bg-[#D65A31]"
								>
									Submit
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}

export default NewTodoForm;
