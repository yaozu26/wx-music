import { yzReqInstance } from './index'

export function getTopMvs(offset = 0, limit = 20) {
  return yzReqInstance.get({ url: "/top/mv", data: { limit, offset }
  })
}

export function getMvURL(id) {
  return yzReqInstance.get({ url: "/mv/url", data: { id } })
}

export function getMvInfo(mvid) {
  return yzReqInstance.get({ url: "/mv/detail", data: { mvid } })
}

export function getRelated(id) {
  return yzReqInstance.get({ url: "/related/allvideo", data: { id } })
}