import dynamic from 'next/dynamic'

const CanvasComponent = dynamic(() => import('@component/CanvasComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

export default function Home() {
  return (
    <main className='h-96	w-full'>
      <CanvasComponent />
    </main>
  )
}
