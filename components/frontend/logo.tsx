import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo({ href }: { href: string }) {
	return (
		<Link href={href} className=" w-[180px] flex items-center gap-2 ">
			<Image
				src="/1-removebg-preview.png"
				alt=""
				width={300}
				height={300}
				className="w-full h-full object-cover object-center"
			/>
		</Link>
	);
}
