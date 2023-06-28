import dynamic from "next/dynamic";
import FabricComponent from "@component/FabricComponent";

import Link from "next/link";

const CanvasComponent = dynamic(() => import("@component/CanvasComponent"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Home() {
  return (
    <main className="h-96	w-full">
             <Link href='/Polygon'>
               <button className='bg-slate-200 m-2.5 px-2'>3000만큼 별찍자</button>
             </Link>
      <CanvasComponent />
      {/* <FabricComponent />*/}
    </main>
  );
}
