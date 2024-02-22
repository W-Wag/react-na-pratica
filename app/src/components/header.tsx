import { ChevronDown } from 'lucide-react'

import nivoLogo from '../assets/logo-nivo.svg'
import { Badge } from './ui/badge'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <div className="max-w-[1200px] mx-auto flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={nivoLogo} alt="nivo.video" />

          <Badge>BETA</Badge>
        </Link>

        <svg
          width="6"
          height="16"
          viewBox="0 0 6 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="1.18372"
            y1="15.598"
            x2="5.32483"
            y2="0.143194"
            className="stroke-zinc-700"
          />
        </svg>

        <div className="flex items-center gap-2.5">
          <img
            src="https://github.com/rocketseat.png"
            className="size-5 rounded-full"
            alt=""
          />

          <span className="text-sm font-medium text-zinc-100">Rocketseat</span>

          <Badge variant="primary">PRO</Badge>

          <ChevronDown className="text-zinc-600 size-4" />
        </div>

        <svg
          width="6"
          height="16"
          viewBox="0 0 6 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="1.18372"
            y1="15.598"
            x2="5.32483"
            y2="0.143194"
            className="stroke-zinc-700"
          />
        </svg>

        <div className="flex items-center gap-2.5">
          <span className="text-sm font-medium text-zinc-100">Ignite</span>

          <ChevronDown className="text-zinc-600 size-4" />
        </div>
      </div>

      <a
        href="https://github.com/diego3g"
        target="_blank"
        className="flex items-center gap-3"
        rel="noreferrer"
      >
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-sm font-medium text-zinc-300/70">
            Professor que ministrou o projeto
          </span>
          <span className="text-sm font-medium">Diego Fernandes</span>
          <span className="text-xs text-zinc-400">diego@nivo.video</span>
        </div>
        <img
          src="https://github.com/diego3g.png"
          className="size-8 rounded-full"
          alt=""
        />
      </a>
    </div>
  )
}
