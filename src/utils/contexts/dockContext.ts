import { createContext, useContext } from 'react'
import { SpringValue } from '@react-spring/web'

type DockApi = {
  hovered: boolean
  width: number
  /** Base tile size in px (smaller on phones so the dock fits the screen). */
  size: number
  zoomLevel?: SpringValue
  setIsZooming: (isZooming: boolean) => void
}

export const DockContext = createContext<DockApi>({ width: 0, size: 48, hovered: false, setIsZooming: () => {} })

export const useDock = () => {
  return useContext(DockContext)
}
