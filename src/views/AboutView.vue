<template>
  <div class="speaker">
    <div class="mic-oper">
      <div class="mic-volume">
        <i
          class="jw-Volume-Filled volume-icon"
          v-if="Math.min(Math.max(0, stateCurrentSpeakerVol * 100), 100)"
        ></i>
        <i class="jw-VolumeSilence-Filled volume-icon disabled" v-else></i>
        <div class="-multi-player-voice-bar">
          <div class="-process-bar" @click="onProcessClickSpeaker" :style="`background: ${speakerProgressBgColor}`">
            <div
              class="-inner-bar"
              :style="`width:${Math.min(
                Math.max(0, stateCurrentSpeakerVol * 100),
                100
              )}%`"
            >
              <div
                :class="`-pointer ${
                  !Math.min(Math.max(0, stateCurrentSpeakerVol * 100), 100)
                    ? 'disable-pointer'
                    : ''
                }`"
                @mousedown="onMouseDragSpeaker($event)"
                @touchstart="onTouchDragSpeaker($event)"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <audio :src="audioTestSrc" ref="audioRef" style="display: none"></audio>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, watch } from "vue";
import {
  clickDragerHelper,
  mouseDragerHelper,
  touchDragerHelper,
} from "./drag-helper";
const props = defineProps({
  audioTestSrc: {
    type: String,
    default() {
      return "";
    },
  },
  currentSpeakerVolumSize: {
    type: Number,
    default() {
      return 0.75;
    },
  },
  speakerProgressBgColor: {
    type: String,
    default() {
      return '#E6E6E6'
    }
  }
});
const stateCurrentSpeakerVol = ref<number>(0.75);
watch(
  () => props.currentSpeakerVolumSize,
  (newVal) => {
    stateCurrentSpeakerVol.value = newVal;
  }
);
// 扬声器
// const currentSpeakerVolumSize = ref<number>(0.75)
// const currentSpeaker = ref<string>('')
// const audioTestSrc = ref<string>("");
const audioRef = ref<HTMLAudioElement | any>();
// let audioCurrentDeviceId = '' as string
// const auidoDisabled = ref<boolean>(false)
// const setSpeaker = (e: string) => {
//   console.log(e)
//   if (e === '0' || !e) {
//     auidoDisabled.value = true
//     audioRef.value.volume = 0
//     currentSpeakerVolumSize.value = 0
//   } else {
//     auidoDisabled.value = false
//     audioCurrentDeviceId = e
//     audioRef.value.volume = currentSpeakerVolumSize.value
//     store.commit('setSettingInfo', { type: 'speaker', value: e })
//   }
//   // audioTestSrc.value = require("../../../../assets/speakerTest.mp3")
// }
// const testSpeaker = async () => {
//   if (audioCurrentDeviceId !== '0' && audioCurrentDeviceId) {
//     audioRef.value.setSinkId(audioCurrentDeviceId)
//     audioTestSrc.value = require('../../../../assets/speakerTest.mp3')
//     setTimeout(() => {
//       audioRef.value.play()
//       speakerTesting.value = true
//       setTimeout(() => {
//         speakerTesting.value = false
//       }, 5500)
//     }, 500)
//   }
// }
// 点击进度条
let onProcessClickSpeaker = (event: MouseEvent) => {
  console.log(event);
  clickDragerHelper(event, "-process-bar", (deltaPos: any, domRect: any) => {
    console.log(deltaPos.x / domRect.width);
    stateCurrentSpeakerVol.value = deltaPos.x / domRect.width;
    audioRef.value.volume = stateCurrentSpeakerVol.value;
    // gainNode.gain.value = currentMicVolumSize.value
  });
  event.stopPropagation();
};

// 鼠标拖拽
const onMouseDragSpeaker = (event: MouseEvent) => {
  mouseDragerHelper(
    event,
    "-process-bar",
    (deltaPos: any, domRect: any) => {
      stateCurrentSpeakerVol.value = deltaPos.x / domRect.width;
      if (stateCurrentSpeakerVol.value > 1) {
        stateCurrentSpeakerVol.value = 1;
      } else if (stateCurrentSpeakerVol.value < 0) {
        stateCurrentSpeakerVol.value = 0;
      }
      audioRef.value.volume = stateCurrentSpeakerVol.value;
      console.log(deltaPos.x / domRect.width);
      // gainNode.gain.value = currentMicVolumSize.value
    },
    (deltaPos: any, domRect: any) => {
      stateCurrentSpeakerVol.value = deltaPos.x / domRect.width;
      if (stateCurrentSpeakerVol.value > 1) {
        stateCurrentSpeakerVol.value = 1;
      } else if (stateCurrentSpeakerVol.value < 0) {
        stateCurrentSpeakerVol.value = 0;
      }
      audioRef.value.volume = stateCurrentSpeakerVol.value;
      console.log(deltaPos.x / domRect.width);
      // gainNode.gain.value = currentMicVolumSize.value
    }
  );
  event.stopPropagation();
};
const onTouchDragSpeaker = (event: TouchEvent) => {
  touchDragerHelper(
    event,
    "-process-bar",
    (deltaPos: any, domRect: any) => {
      stateCurrentSpeakerVol.value = deltaPos.x / domRect.width;
      if (stateCurrentSpeakerVol.value > 1) {
        stateCurrentSpeakerVol.value = 1;
      } else if (stateCurrentSpeakerVol.value < 0) {
        stateCurrentSpeakerVol.value = 0;
      }
      audioRef.value.volume = stateCurrentSpeakerVol.value;
      console.log(deltaPos.x / domRect.width);
      // gainNode.gain.value = currentMicVolumSize.value
    },
    (deltaPos: any, domRect: any) => {
      stateCurrentSpeakerVol.value = deltaPos.x / domRect.width;
      if (stateCurrentSpeakerVol.value > 1) {
        stateCurrentSpeakerVol.value = 1;
      } else if (stateCurrentSpeakerVol.value < 0) {
        stateCurrentSpeakerVol.value = 0;
      }
      audioRef.value.volume = stateCurrentSpeakerVol.value;
      console.log(deltaPos.x / domRect.width);
      // gainNode.gain.value = currentMicVolumSize.value
    }
  );
  event.stopPropagation();
};
</script>
<style lang="scss" scoped>
.speaker {
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
      .auido-show-block {
        background: #333333;
        border-radius: 2px;
        height: 16px;
        width: 4px;
        margin-right: 4px;
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
        background: rgba(255, 255, 255, 0.6);
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
