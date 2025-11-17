// import type { passwordSchema } from "@/components/forms/password-item.tsx";
// import { fetcher } from "@/services/fetcher.ts";
// import { z } from "zod";

// const newPasswordItem = (data: z.infer<typeof passwordSchema>) => {
//   try {
//     fetcher.post(
//       `/api/${user_id}/items/password/new`,
//       {
//         "websites": data.websites,
//         "username": data.username.length === 0 ? null : data.username,
//         "email": data.email,
//         "encrypted_password": null,//  TODO
//         "notes": data.password.length === 0 ? null: data.username,
//       }
//     );
//
//   }
// };
