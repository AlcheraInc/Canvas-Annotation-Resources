export default function Home() {
  return (
    <div>
      카드
      <div className="card border-2 border-black">
        <span className="card-body text-red-600">카드의 정중앙입니다</span>
      </div>

      <div className="w-1/2 text-center justify-center flex h-16 text-red-600 items-center border-2 border-black">
        박스에 가운데 정렬된 텍스트를 표시해봅시다
      </div>
    </div>
  )
}
