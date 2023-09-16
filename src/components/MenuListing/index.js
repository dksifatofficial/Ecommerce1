// // "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function MenuListing({ data }) {
//   const router = useRouter();

//   useEffect(() => {
//     router.refresh();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <section className=" gap-4 flex flex-wrap">
//       {data && data.length
//         ? data.splice(0, 2).map((item) => (
//             <article
//               className="relative flex flex-col items-center overflow-hidden cursor-pointer"
//               key={item._id}
//             >
//               <Image
//                 className="h-[50px] w-[50px] object-cover transition-all duration-300 
//                        group-hover:scale-125 rounded-[50%]"
//                 src={item.imageUrl}
//                 alt="product Image"
//                 width="400"
//                 height="400"
//               />
//               <p>{item.name}</p>
//             </article>
//           ))
//         : null}
//     </section>
//   );
// }
