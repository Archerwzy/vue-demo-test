<template>
  <div class="mic-setting">
    <div class="mic-oper">
      <div class="mic-voice">
        <div class="mic-icon-block">
          <!-- <img src="../../../../assets/Audio-Filled.svg" alt="" class="mic-icon" v-if="!micVoiceSize || !currentMicVolumSize" />
          <img src="../../../../assets/Audio1-Filled.svg" alt="" class="mic-icon" />
          <img src="../../../../assets/Audio4-Filled.svg" alt="" class="mic-icon" v-if="micVoiceSize && currentMicVolumSize" /> -->
          <i class="jw-Audio-Filled mic-icon" v-if="state.micDisabled"></i>
          <i class="jw-Audio1-Filled mic-icon"></i>
          <i class="jw-Audio4-Filled mic-icon" v-if="!state.micDisabled"></i>
          <div
            class="heart-beat-block"
            :style="`height: ${(state.micVoiceSize / 100) * 12}px`"
            v-if="state.micVoiceSize"
          ></div>
        </div>
        <div class="audio-show-content">
          <div
            :class="`auido-show-block ${
              state.currentMicVolumSize &&
              Math.round((state.micVoiceSize / 100) * state.audioBlockNum) >= item
                ? 'auido-active'
                : ''
            }`"
            v-for="item in state.audioBlockNum"
            :key="item"
          ></div>
        </div>
      </div>
      <div class="mic-volume">
        <i
          class="jw-Volume-Filled volume-icon"
          v-if="Math.min(Math.max(0, state.currentMicVolumSize * 100), 100)"
        ></i>
        <i class="jw-VolumeSilence-Filled volume-icon disabled" v-else></i>
        <div class="-multi-player-voice-bar">
          <div class="-process-bar" @click="onProcessClick" :style="`background: ${state.audioProgressBgColor}`">
            <div
              class="-inner-bar"
              :style="`width:${Math.min(
                Math.max(0, state.currentMicVolumSize * 100),
                100
              )}%`"
            >
              <div
                :class="`-pointer ${
                  !Math.min(Math.max(0, state.currentMicVolumSize * 100), 100)
                    ? 'disable-pointer'
                    : ''
                }`"
                @mousedown="onMouseDrag($event)"
                @touchstart="onTouchDrag($event)"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType, ref, watch } from "vue";
interface ParamsOption {
  micDisabled: boolean;
  micVoiceSize: number;
  currentMicVolumSize: number;
  gainNode: any;
  audioBlockNum: number;
  audioProgressBgColor: string;
  audioBlockBgColor: string
}
const props = defineProps({
  paramsOption: {
    type: Object as PropType<ParamsOption>,
    default() {
      return {};
    },
  },
})
const defaultOption = {
  micDisabled: false,
  micVoiceSize: 0,
  currentMicVolumSize: 0,
  gainNode: null,
  audioBlockNum: 44,
  audioProgressBgColor: '#E6E6E6',
  audioBlockBgColor: '#333333'
}
const state = ref<ParamsOption>(Object.assign({}, defaultOption, props.paramsOption))

watch(
  () => props.paramsOption,
  (newVal) => {
    state.value = newVal
  },
  {
    deep: true,
    // immediate: true,
  }
)
// mic信息
// 点击进度条
let onProcessClick = (event: MouseEvent) => {
  console.log(event);
  if (!state.value.micDisabled) {
    clickDragerHelper(event, "-process-bar", (deltaPos: any, domRect: any) => {
      console.log(deltaPos.x / domRect.width);
      state.value.currentMicVolumSize = deltaPos.x / domRect.width;
      state.value.gainNode.gain.value = state.value.currentMicVolumSize;
    });
    event.stopPropagation();
  }
}

// 鼠标拖拽
const onMouseDrag = (event: MouseEvent) => {
  if (!state.value.micDisabled) {
    mouseDragerHelper(
      event,
      "-process-bar",
      (deltaPos: any, domRect: any) => {
        state.value.currentMicVolumSize = deltaPos.x / domRect.width;
        if (state.value.currentMicVolumSize > 1) {
          state.value.currentMicVolumSize = 1;
        } else if (state.value.currentMicVolumSize < 0) {
          state.value.currentMicVolumSize = 0;
        }
        // console.log(deltaPos.x / domRect.width)
        state.value.gainNode.gain.value = state.value.currentMicVolumSize;
      },
      (deltaPos: any, domRect: any) => {
        state.value.currentMicVolumSize = deltaPos.x / domRect.width;
        if (state.value.currentMicVolumSize > 1) {
          state.value.currentMicVolumSize = 1;
        } else if (state.value.currentMicVolumSize < 0) {
          state.value.currentMicVolumSize = 0;
        }
        // console.log(deltaPos.x / domRect.width)
        state.value.gainNode.gain.value = state.value.currentMicVolumSize;
      }
    )
    event.stopPropagation();
  }
};
const onTouchDrag = (event: TouchEvent) => {
  if (!state.value.micDisabled) {
    touchDragerHelper(
      event,
      "-process-bar",
      (deltaPos: any, domRect: any) => {
        state.value.currentMicVolumSize = deltaPos.x / domRect.width;
        if (state.value.currentMicVolumSize > 1) {
          state.value.currentMicVolumSize = 1;
        } else if (state.value.currentMicVolumSize < 0) {
          state.value.currentMicVolumSize = 0;
        }
        // console.log(deltaPos.x / domRect.width)
        state.value.gainNode.gain.value = state.value.currentMicVolumSize;
      },
      (deltaPos: any, domRect: any) => {
        state.value.currentMicVolumSize = deltaPos.x / domRect.width;
        if (state.value.currentMicVolumSize > 1) {
          state.value.currentMicVolumSize = 1;
        } else if (state.value.currentMicVolumSize < 0) {
          state.value.currentMicVolumSize = 0;
        }
        console.log(deltaPos.x / domRect.width);
        state.value.gainNode.gain.value = state.value.currentMicVolumSize;
      }
    )
    event.stopPropagation();
  }
}
// 用于播放器进度条拖拽
const clickDragerHelper = (
  event: MouseEvent,
  className: string,
  callback: any
) => {
  const detailDom = getDetailDOM(event.target as HTMLElement, className);
  const domRect: DOMRect = detailDom.getBoundingClientRect();
  callback(
    {
      x: event.pageX - domRect.x,
      y: event.pageY - domRect.y,
    },
    {
      width: domRect.width,
      height: domRect.height,
    }
  )
}
const mouseDragerHelper = (
  event: MouseEvent,
  className: string,
  callback: any,
  endCallBack: any
) => {
  const detailDom = getDetailDOM(event.target as HTMLElement, className);

  const domRect: DOMRect = detailDom.getBoundingClientRect();
  const draggerMove = function (event: MouseEvent) {
    callback(
      {
        x: event.pageX - domRect.x,
        y: event.pageY - domRect.y,
      },
      {
        width: domRect.width,
        height: domRect.height,
      }
    )
  }
  const draggerEnd = function (event: MouseEvent) {
    document.removeEventListener("mousemove", draggerMove);
    document.removeEventListener("mouseup", draggerEnd);
    endCallBack(
      {
        x: event.pageX - domRect.x,
        y: event.pageY - domRect.y,
      },
      {
        width: domRect.width,
        height: domRect.height,
      }
    );
  };
  document.addEventListener("mousemove", draggerMove);
  document.addEventListener("mouseup", draggerEnd);
}
const touchDragerHelper = (
  event: TouchEvent,
  className: string,
  callback: any,
  endCallBack: any
) => {
  const detailDom = getDetailDOM(event.target as HTMLElement, className);
  const domRect: DOMRect = detailDom.getBoundingClientRect();
  const draggerMove = function (event: TouchEvent) {
    const _event = event.touches[0];
    callback(
      {
        x: _event.pageX - domRect.x,
        y: _event.pageY - domRect.y,
      },
      {
        width: domRect.width,
        height: domRect.height,
      }
    )
  }
  const draggerEnd = function (event: TouchEvent) {
    document.removeEventListener("touchmove", draggerMove);
    document.removeEventListener("touchend", draggerEnd);
    const _event = event.changedTouches[0];
    endCallBack(
      {
        x: _event.pageX - domRect.x,
        y: _event.pageY - domRect.y,
      },
      {
        width: domRect.width,
        height: domRect.height,
      }
    )
  }
  document.addEventListener("touchmove", draggerMove);
  document.addEventListener("touchend", draggerEnd);
}
const getDetailDOM = (element: HTMLElement, className: string): HTMLElement => {
  if (element.className.indexOf(className) > -1) {
    return element;
  } else {
    return getDetailDOM(element.parentElement as HTMLElement, className);
  }
}
</script>
<style lang="scss" scoped>
.mic-setting {
  .mic-oper {
    margin-top: 18px;
    .mic-voice {
      display: flex;
      align-items: center;
      .mic-icon-block {
        width: 20px;
        height: 20px;
        position: relative;
        .mic-icon {
          width: 20px;
          height: 20px;
          position: absolute;
          font-size: 20px;
          left: 0;
        }
        .heart-beat-block {
          width: 6px;
          // height: 12px;
          background-color: #098c9d;
          position: absolute;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          left: 7px;
          bottom: 7px;
        }
      }
      .voice-icon {
        font-size: 20px;
        color: #b3b3b3;
        margin-right: 5px;
      }
      .voice-active {
        color: #098c9d;
      }
      .audio-show-content {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        .auido-show-block {
          background: #333333;
          border-radius: 2px;
          height: 16px;
          width: 4px;
          // margin-right: 4px;
        }
      }
      
      .auido-active {
        background: #098c9d;
      }
    }
  }
  .mic-volume {
    display: flex;
    align-items: center;
    margin-top: 18px;
    .volume-icon {
      color: #098c9d;
      font-size: 20px;
      margin-right: 6px;
    }
    .disabled {
      color: #b3b3b3;
    }
    .-multi-player-voice-bar {
      width: 100%;
      height: 100%;
      font-size: 16px;
      color: #fff;
      display: flex;
      align-items: center;
      .-process-bar {
        // background: rgba(255, 255, 255, 0.6);
        height: 4px;
        flex: 1 0 auto;
        border-radius: 2px;
        .-inner-bar {
          height: 100%;
          background: #2dccd3;
          position: relative;
          .-pointer {
            position: absolute;
            background-color: #2dccd3;
            content: "";
            width: 10px;
            height: 10px;
            border-radius: 50%;
            transform: translate(50%, -50%);
            top: 50%;
            right: 0;
          }
          .disable-pointer {
            background-color: #b3b3b3;
          }
        }
      }
    }
    .volume-block {
      width: 348px;
      height: 16px;
      border-radius: 6px;
      background-color: #e6e6e6;
      position: relative;

      .volume-block-active {
        //   width: 100px;
        height: 16px;
        position: absolute;
        border-radius: 6px;
        background-color: #098c9d;
      }
      .top-pane {
        width: 350px;
        height: 10px;
        position: absolute;
        background-color: #1a1a1a;
        z-index: 2;
        transform: rotate(-0.4deg);
        top: -5px;
        left: -2px;
      }
      .bottom-pane {
        width: 350px;
        height: 10px;
        position: absolute;
        background-color: #1a1a1a;
        z-index: 2;
        transform: rotate(0.4deg);
        top: 11px;
        left: -2px;
      }
      .mic-dot {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 1px solid #ffffff;
        background-color: #098c9d;
        z-index: 3;
        top: 2px;
        cursor: pointer;
      }
    }
  }
}
</style>
