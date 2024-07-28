// "use client";

// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import Input from "./inputs/Input";

// export default function Home() {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm<FieldValues>({
//     defaultValues: {
//       name: "",
//     },
//   });

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <Input
//         id="name"
//         label="First Name"
//         placeholder="Altamiro"
//         errors={errors}
//         register={register("name", {
//           required: "Name is required!",
//           minLength: {
//             value: 9,
//             message: "Name must be at least 9 characters long!",
//           },
//         })}
//       />
//     </main>
//   );
// }
