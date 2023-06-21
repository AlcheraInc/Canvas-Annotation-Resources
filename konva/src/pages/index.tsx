import dynamic from "next/dynamic";

const CanvasComponent = dynamic(() => import("@component/CanvasComponent"), {
  // loading: () => <p>Loading...</p>,
  ssr: false,
});
const TestComponent = dynamic(() => import("@component/TestComponent"), {ssr: false});

export default function Home() {
  return (
    <main className="h-96	w-full">
      <CanvasComponent />
         <TestComponent />
      <div className="bg-purple-700">그룹 추가하기</div>
    </main>
  );
}
