import { createRoot } from 'react-dom/client'
import '@/index.css'
import ImageryStudio from './ImageryStudio'

const root = document.getElementById('root')
if (!root) throw new Error('missing #root')
createRoot(root).render(<ImageryStudio />)
