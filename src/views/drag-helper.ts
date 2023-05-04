
 // 用于播放器进度条拖拽
export const clickDragerHelper = (event: MouseEvent,className: string,callback: any)=>{
    const detailDom = getDetailDOM(event.target as HTMLElement, className);
    const domRect: DOMRect = detailDom.getBoundingClientRect();
    callback({
        x:event.pageX - domRect.x,
        y: event.pageY - domRect.y
    },{
        width:domRect.width,
        height:domRect.height
    })
}
export const mouseDragerHelper = (
  event: MouseEvent,
  className: string,
  callback: any,
  endCallBack:any
) => {
  const detailDom = getDetailDOM(event.target as HTMLElement, className);
  
  const domRect: DOMRect = detailDom.getBoundingClientRect()
  const draggerMove = function (event: MouseEvent) {
    callback({
        x:event.pageX - domRect.x,
        y: event.pageY - domRect.y
    },{
        width:domRect.width,
        height:domRect.height
    })
  }
  const draggerEnd = function (event: MouseEvent) {
    document.removeEventListener('mousemove', draggerMove)
    document.removeEventListener('mouseup', draggerEnd)
    endCallBack({
        x:event.pageX - domRect.x,
        y:event.pageY - domRect.y
    },{
        width:domRect.width,
        height:domRect.height
    })
  }
  document.addEventListener('mousemove', draggerMove)
  document.addEventListener('mouseup', draggerEnd)
}
export const touchDragerHelper = (
  event: TouchEvent,
  className: string,
  callback: any,
  endCallBack:any
) => {
  const detailDom = getDetailDOM(event.target as HTMLElement, className)
  const domRect: DOMRect = detailDom.getBoundingClientRect()
  const draggerMove = function (event: TouchEvent) {
    const _event = event.touches[0]
    callback({
        x:_event.pageX - domRect.x,
        y: _event.pageY - domRect.y
    },{
        width:domRect.width,
        height:domRect.height
    })
  }
  const draggerEnd = function (event: TouchEvent) {
    document.removeEventListener('touchmove', draggerMove)
    document.removeEventListener('touchend', draggerEnd)
    const _event = event.changedTouches[0]
    endCallBack({
        x:_event.pageX - domRect.x,
        y:_event.pageY - domRect.y
    },{
        width:domRect.width,
        height:domRect.height
    })
  }
  document.addEventListener('touchmove', draggerMove)
  document.addEventListener('touchend', draggerEnd)
}
const getDetailDOM = (element: HTMLElement, className: string): HTMLElement => {
  if (element.className.indexOf(className) > -1) {
    return element
  } else {
    return getDetailDOM(element.parentElement as HTMLElement, className)
  }
}
