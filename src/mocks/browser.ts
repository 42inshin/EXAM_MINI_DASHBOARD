//@ts-nocheck
import { setupWorker, type SetupWorker } from 'msw'
import { handlers } from './handlers'

const worker: SetupWorker = setupWorker(...handlers)

export default worker
