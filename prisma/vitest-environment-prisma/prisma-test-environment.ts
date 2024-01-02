/* eslint-disable @typescript-eslint/no-empty-function */
import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    return {
      async teardown() {},
    }
  },
}
