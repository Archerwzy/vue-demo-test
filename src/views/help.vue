<template>
  <div class="help">
    <div class="help-header">
      <i class="jw-Left2-Outlined help-header-icon"></i>
      <span class="help-header-text">帮助中心</span>
    </div>
    <div class="help-base" id="helpBase">
      <div class="help-base-title">
        <span class="txt">基本介绍</span>
        <i
          :class="`${
            helpBaseIntroduce ? 'jw-Down2-Outlined' : 'jw-Up2-Outlined'
          } header-base-icon`"
          @click="helpBaseIntroduce = !helpBaseIntroduce"
        ></i>
      </div>
      <div class="help-base-content" v-if="helpBaseIntroduce">
        <div class="content1">
          LinkWall投屏助手是一款屏幕共享软件，支持在Windows、iOS、Android、MacOS等多平台使用，能将手机/电脑设备内容投屏LinkWall大屏端，是课堂演示、资源共享的好帮手。
        </div>
        <div class="content2">
          拥有扫码连接、搜索连接、投屏码连接、设备IP连接，四种高效连接方式，仅需将手机和LinkWall大屏连接相同网络，即可轻松投屏，画面高清无延迟。
        </div>
      </div>
    </div>
    <div class="help-prepare" id="helpPrepare">
      <div class="help-prepare-title">
        <span class="txt">投屏前准备</span>
        <i
          :class="`${
            helpPrepare ? 'jw-Down2-Outlined' : 'jw-Up2-Outlined'
          } header-prepare-icon`"
          @click="helpPrepare = !helpPrepare"
        ></i>
      </div>
      <div class="help-prepare-content" v-if="helpPrepare">
        <div class="prepare-txt">
          1. 先在LinkWall大屏开启LinkWall无线投屏接收端
        </div>
        <div class="prepare-img-content">
          <img src="./full_screen.png" alt="" class="prepare-img" />
        </div>
        <div class="prepare-txt tip">
          推荐的无线网络，在联网准备-推荐连接处查看
        </div>
        <div class="prepare-txt">
          2.
          根据推荐的无线网络，设置投屏手机所连WI-FI，确保所有投屏设备连接同一局域网；
        </div>
        <div class="prepare-txt">
          3. 打开手机上的投屏助手APP，选择适合的设备连接方式
        </div>
      </div>
    </div>
    <div class="help-link" id="helpLink">
      <div class="help-link-title">
        <span class="txt">投屏连接</span>
        <i
          :class="`${
            helpLink ? 'jw-Down2-Outlined' : 'jw-Up2-Outlined'
          } header-link-icon`"
          @click="helpLink = !helpLink"
        ></i>
      </div>
      <div class="help-link-content" v-if="helpLink">
        <div class="switch-block">
          <div
            @click="switchTap(item)"
            :class="`${item.active ? 'switch-tap' : 'no-tap'}`"
            v-for="item in helpLinkList"
            :key="item.name"
          >
            {{ item.name }}
          </div>
        </div>
        <div v-if="currentActiveItem === 'scanLink'">
          <div class="link-txt link-txt-tip">
            若大屏接收端连接的是有线网络，则优先推荐此方法
          </div>
          <div class="link-txt">
            1）确保投屏手机与LinkWall大屏已连接同一局域网（如何连网请看<span
              class="link-txt link-txt-tip"
              >投屏前准备</span
            >的操作步骤）
          </div>
          <div class="link-txt">
            2）若您使用的是苹果手机，请根据引导页面开启控制中心的屏幕镜像功能（安卓手机可忽略该操作）
          </div>
          <div class="mirror-img-content">
            <div class="left">
              <div class="left-img">
                <img src="./mirror_one.png" alt="" class="mirror-img" />
              </div>
              <div class="kv">
                <div class="key">1</div>
                <div class="val">打开控制中心选择屏幕镜像</div>
              </div>
            </div>
            <div class="right">
              <div class="kv">
                <div class="key">2</div>
                <div class="val">选择目标设备开始投屏</div>
              </div>
              <div class="left-img">
                <img src="./mirror_two.png" alt="" class="mirror-img" />
              </div>
            </div>
          </div>
          <div class="link-txt">
            3）打开投屏助手【扫码连接】页面，将扫码框瞄准接收端上的投屏二维码，等待连接投屏
          </div>
          <div class="link-img-content">
            <img src="./link_scan.png" alt="" class="link-scan-img" />
          </div>
          <div class="link-txt">
            4）若投屏失败，尝试用其他连接方式，优先推荐<span
              class="link-txt-tip"
              >投屏码连接</span
            >投屏
          </div>
        </div>
        <div v-if="currentActiveItem === 'autoSearch'">
          <div class="link-txt link-txt-tip">
            若大屏接收端连接的是有线网络，则优先推荐此方法
          </div>
          <div class="link-txt">
            1）确保投屏手机与LinkWall大屏已连接同一局域网（如何连网请看<span
              class="link-txt link-txt-tip"
              >投屏前准备</span
            >的操作步骤）
          </div>
          <div class="link-txt">
            2）若您使用的是苹果手机，请根据引导页面开启控制中心的屏幕镜像功能（安卓手机可忽略该操作）
          </div>
          <div class="mirror-img-content">
            <div class="left">
              <div class="left-img">
                <img src="./mirror_one.png" alt="" class="mirror-img" />
              </div>
              <div class="kv">
                <div class="key">1</div>
                <div class="val">打开控制中心选择屏幕镜像</div>
              </div>
            </div>
            <div class="right">
              <div class="kv">
                <div class="key">2</div>
                <div class="val">选择目标设备开始投屏</div>
              </div>
              <div class="left-img">
                <img src="./mirror_two.png" alt="" class="mirror-img" />
              </div>
            </div>
          </div>
          <div class="auto-search">
            <div class="link-txt">
              3）等待系统搜索，选择你要投屏的设备，系统会自动连接投屏
            </div>
            <div class="img-block">
              <div class="auto-img">
                <img src="./auto_screen_one.png" alt="" class="img" />
              </div>
              <div class="auto-img">
                <img src="./auto_screen_two.png" alt="" class="img" />
              </div>
            </div>
          </div>
          <div class="link-txt">
            4）若未搜索到可投屏设备，请尝试用其他连接方式，优先推荐<span
              class="link-txt-tip"
              >扫码连接</span
            >投屏
          </div>
        </div>
        <div v-if="currentActiveItem === 'screenCode'">
          <div class="link-txt">
            1）确保投屏手机与LinkWall大屏已连接同一局域网（如何连网请看<span
              class="link-txt link-txt-tip"
              >投屏前准备</span
            >的操作步骤）
          </div>
          <div class="link-txt">
            2）若您使用的是苹果手机，请根据引导页面开启控制中心的屏幕镜像功能（安卓手机可忽略该操作）
          </div>
          <div class="mirror-img-content">
            <div class="left">
              <div class="left-img">
                <img src="./mirror_one.png" alt="" class="mirror-img" />
              </div>
              <div class="kv">
                <div class="key">1</div>
                <div class="val">打开控制中心选择屏幕镜像</div>
              </div>
            </div>
            <div class="right">
              <div class="kv">
                <div class="key">2</div>
                <div class="val">选择目标设备开始投屏</div>
              </div>
              <div class="left-img">
                <img src="./mirror_two.png" alt="" class="mirror-img" />
              </div>
            </div>
          </div>
          <div class="link-txt">
            3）打开投屏助手【投屏码连接】页面，在输入框输入接收端显示的投屏码，不区分英文大小写，输入后点击开始投屏
          </div>
          <div class="screen-code-content">
            <img src="./screen_code.png" alt="" class="img" />
          </div>
          <div class="link-txt">4）若投屏失败，尝试用IP直连的方式连接投屏</div>
        </div>
        <div v-if="currentActiveItem === 'ipConnect'">
          <div class="link-txt">
            1）确保投屏手机与LinkWall大屏已连接同一局域网（如何连网请看<span
              class="link-txt link-txt-tip"
              >投屏前准备</span
            >的操作步骤）
          </div>
          <div class="link-txt">
            2）若您使用的是苹果手机，请根据引导页面开启控制中心的屏幕镜像功能（安卓手机可忽略该操作）
          </div>
          <div class="mirror-img-content">
            <div class="left">
              <div class="left-img">
                <img src="./mirror_one.png" alt="" class="mirror-img" />
              </div>
              <div class="kv">
                <div class="key">1</div>
                <div class="val">打开控制中心选择屏幕镜像</div>
              </div>
            </div>
            <div class="right">
              <div class="kv">
                <div class="key">2</div>
                <div class="val">选择目标设备开始投屏</div>
              </div>
              <div class="left-img">
                <img src="./mirror_two.png" alt="" class="mirror-img" />
              </div>
            </div>
          </div>
          <div class="link-txt">
            3）打开投屏助手【IP直连】页面，根据接收端显示的设备IP，在输入框进行输入，输入后点击开始投屏
          </div>
          <div class="ip-connect">
            <img src="./screen_code.png" alt="" class="img" />
          </div>
          <div class="link-txt">
            若以上方式均无法成功连接投屏，请尝试重启手机或大屏设备，或找设备管理人员确认无线网络是否正常
          </div>
        </div>
      </div>
    </div>
    <div class="help-require" id="helpRequire">
      <div class="help-require-title">
        <span class="txt">运行要求</span>
        <i
          :class="`${
            helpRequire ? 'jw-Down2-Outlined' : 'jw-Up2-Outlined'
          } header-require-icon`"
          @click="helpRequire = !helpRequire"
        ></i>
      </div>
      <div class="help-require-content" v-if="helpRequire">
        <div class="help-require-txt">为了更好的兼容性以及安全性：</div>
        <div class="help-require-txt">
          iOS设备：建议在iOS11及以上版本安装使用；
        </div>
        <div class="help-require-txt">
          Android设备：建议在Android5.0及以上版本安装使用；
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
onMounted(() => {
  const params = route.query;
  console.log(params);
  if (Object.keys(params).length > 0 && params.to) {
    switch (params.to) {
      case "helpBase":
        helpBaseIntroduce.value = true;
        setTimeout(() => {
          document.querySelector("#helpBase")?.scrollIntoView({
            behavior: "smooth",
          });
        }, 300);
        break;
      case "helpPrepare":
        helpPrepare.value = true;
        setTimeout(() => {
          document.querySelector("#helpPrepare")?.scrollIntoView({
            behavior: "smooth",
          });
        }, 300);
        break;
      case "helpLink":
        helpLink.value = true;
        toCurrentActiveItem(params.type as string);
        setTimeout(() => {
          document.querySelector("#helpLink")?.scrollIntoView({
            behavior: "smooth",
          });
        }, 300);
        break;
      case "helpRequire":
        helpRequire.value = true;
        setTimeout(() => {
          document.querySelector("#helpRequire")?.scrollIntoView({
            behavior: "smooth",
          });
        }, 300);
        break;
      default:
        break;
    }
  }
});
const toCurrentActiveItem = (item: string) => {
  helpLinkList.value.forEach((it) => {
    if (it.key === item) {
      it.active = true;
    } else {
      it.active = false;
    }
  });
  currentActiveItem.value = item;
};

const helpBaseIntroduce = ref<boolean>(false);
const helpPrepare = ref<boolean>(false);
const helpLink = ref<boolean>(false);
interface HelpLink {
  name: string;
  active: boolean;
  key: string;
}
const currentActiveItem = ref<string>("scanLink");
const helpLinkList = ref<HelpLink[]>([
  { name: "扫码连接", active: true, key: "scanLink" },
  { name: "自动搜索", active: false, key: "autoSearch" },
  { name: "投屏码", active: false, key: "screenCode" },
  { name: "IP直连", active: false, key: "ipConnect" },
]);
const switchTap = (item: HelpLink) => {
  helpLinkList.value.forEach((it) => {
    it.active = false;
  });
  item.active = true;
  currentActiveItem.value = item.key;
};
const helpRequire = ref<boolean>(false);
</script>
<style lang="scss" scoped>
.help {
  padding: 0.72rem 0.21rem;
  .help-header {
    display: flex;
    align-items: center;
    &-icon {
      font-size: 1.4rem;
      color: rgba(0, 0, 0, 0.9);
      margin-right: 0.2rem;
    }
    &-text {
      font-size: 1rem;
      color: #1a1a1a;
      font-weight: 500;
    }
  }
  .help-base {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 1rem;
    margin-top: 1rem;
    &-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .txt {
        font-size: 1rem;
        color: #1a1a1a;
        font-weight: 600;
      }
      .header-base-icon {
        font-size: 1.3rem;
        color: #808080;
      }
    }
    &-content {
      margin-top: 0.8rem;
      .content1 {
        font-size: 0.9rem;
        color: #4d4d4d;
        font-weight: 400;
        word-break: break-all;
        text-align: left;
        letter-spacing: 0.08rem;
        line-height: 1.5rem;
      }
      .content2 {
        font-size: 0.9rem;
        color: #4d4d4d;
        font-weight: 400;
        word-break: break-all;
        text-align: left;
        letter-spacing: 0.08rem;
        line-height: 1.5rem;
      }
    }
  }
  .help-prepare {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 1rem;
    margin-top: 1rem;
    &-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .txt {
        font-size: 1rem;
        color: #1a1a1a;
        font-weight: 600;
      }
      .header-prepare-icon {
        font-size: 1.3rem;
        color: #808080;
      }
    }
    &-content {
      margin-top: 0.8rem;
      .prepare-txt {
        font-size: 0.9rem;
        color: #4d4d4d;
        font-weight: 400;
        word-break: break-all;
        text-align: left;
        letter-spacing: 0.04rem;
        line-height: 1.5rem;
      }
      .tip {
        color: #098c9d;
        line-height: 2rem;
      }
      .prepare-img-content {
        .prepare-img {
          width: 100%;
        }
      }
    }
  }
  .help-link {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 1rem;
    margin-top: 1rem;
    &-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .txt {
        font-size: 1rem;
        color: #1a1a1a;
        font-weight: 600;
      }
      .header-link-icon {
        font-size: 1.3rem;
        color: #808080;
      }
    }
    &-content {
      margin-top: 0.8rem;
      .switch-block {
        background: #f1f2f7;
        border-radius: 10px;
        height: 2.5rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 0.8rem;
        .switch-tap {
          font-size: 0.9rem;
          color: #1a1a1a;
          font-weight: 500;
          padding: 0.3rem 0.7rem;
          background: #ffffff;
          border-radius: 9px;
        }
        .no-tap {
          font-size: 0.9rem;
          color: #808080;
          font-weight: 500;
          padding: 0.3rem 0.7rem;
        }
      }
      .link-txt {
        font-size: 0.9rem;
        color: #4d4d4d;
        font-weight: 400;
        word-break: break-all;
        text-align: left;
        letter-spacing: 0.04rem;
        line-height: 1.5rem;
      }
      .link-txt-tip {
        color: #098c9d;
        // line-height: 2rem;
      }
      .link-img-content {
        .link-scan-img {
          width: 100%;
        }
      }
      .mirror-img-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 1rem 0;
        .left {
          width: calc((100% - 2rem) / 2);
          .left-img {
            .mirror-img {
              width: 100%;
            }
          }
          .kv {
            display: flex;
            .key {
              background: #098c9d;
              border: 1px solid rgba(9, 140, 157, 1);
              display: flex;
              align-items: center;
              justify-content: center;
              height: 1rem;
              min-width: 1rem;
              border-radius: 50%;
              color: #ffffff;
              font-weight: 400;
              font-size: 0.5rem;
              margin-right: 0.5rem;
            }
            .val {
              font-size: 0.8rem;
              color: #098c9d;
              letter-spacing: 0.2rem;
              font-weight: 400;
              text-align: left;
            }
          }
        }
        .right {
          width: calc((100% - 2rem) / 2);
          .left-img {
            .mirror-img {
              width: 100%;
            }
          }
          .kv {
            display: flex;
            .key {
              background: #098c9d;
              border: 1px solid rgba(9, 140, 157, 1);
              display: flex;
              align-items: center;
              justify-content: center;
              height: 1rem;
              min-width: 1rem;
              border-radius: 50%;
              color: #ffffff;
              font-weight: 400;
              font-size: 0.5rem;
              margin-right: 0.5rem;
            }
            .val {
              font-size: 0.8rem;
              color: #098c9d;
              letter-spacing: 0.2rem;
              font-weight: 400;
              text-align: left;
            }
          }
        }
      }
      .screen-code-content {
        width: 100%;
        .img {
          width: 100%;
          margin: 1rem 0;
        }
      }
      .ip-connect {
        width: 100%;
        .img {
          width: 100%;
          margin: 1rem 0;
        }
      }
      .auto-search {
        .link-txt {
          font-size: 0.9rem;
          color: #4d4d4d;
          font-weight: 400;
          word-break: break-all;
          text-align: left;
          letter-spacing: 0.04rem;
          line-height: 1.5rem;
        }
        .img-block {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1rem;
          .auto-img {
            width: calc((100% - 2rem) / 2);
            .img {
              width: 100%;
            }
          }
        }
      }
    }
  }
  .help-require {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 1rem;
    margin-top: 1rem;
    &-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .txt {
        font-size: 1rem;
        color: #1a1a1a;
        font-weight: 600;
      }
      .header-require-icon {
        font-size: 1.3rem;
        color: #808080;
      }
    }
    &-content {
      margin-top: 0.8rem;
      .help-require-txt {
        font-size: 0.9rem;
        color: #4d4d4d;
        font-weight: 400;
        word-break: break-all;
        text-align: left;
        letter-spacing: 0.04rem;
        line-height: 1.5rem;
      }
    }
  }
}
</style>
<style>
body {
  background-color: #f2f6f9;
}
</style>
