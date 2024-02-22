import { LucideArrowBigLeft, LucideConstruction } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from './components/ui/button'

export function ComingSoon() {
  const navigate = useNavigate()
  return (
    <div className="flex h-screen items-center justify-center flex-col m-auto space-y-6">
      <h1 className="inline-flex gap-2 text-2xl text-bold ">
        This area is under construction
        <LucideConstruction />
      </h1>
      <Button className="gap-2" onClick={() => navigate(-1)}>
        <LucideArrowBigLeft className="size-5" />
        Go Back
      </Button>
    </div>
  )
}
