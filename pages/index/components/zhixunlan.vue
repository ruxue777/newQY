<template xlang="wxml">
  <view class="content">
    <view class="headlines_container">
      <view class="headlines_head">
        <span class="zx">平台新闻</span><span class="x">|</span>
      </view>
      <view class="headlines_main" ref="item_container">
        <text
          class="headlines_item"
          v-for="(item, index) in headlinesList"
          :key="index"
          :class="[{current:item.isCurrent},{leave_down:item.isLeaveDown},{enter_top:item.isEnterTop},{leave_left:item.isLeaveLeft}]"
          ref="textDOM"
        >{{item.text}}</text>
      </view>
    </view>
	
  </view>
</template>

<script>
export default {
  data() {
    return {
      headlinesList: [
        {
          text: "虔消费小程序上线啦！！！",
          isCurrent: true,
          isLeaveDown: false,
          isEnterTop: false,
          isLeaveLeft: false
        },
        {
          text: "立众天-虔消费App也上线啦！",
          isCurrent: false,
          isLeaveDown: false,
          isEnterTop: false,
          isLeaveLeft: false
        },
        {
          text: "每周抽消费红包！！",
          isCurrent: false,
          isLeaveDown: false,
          isEnterTop: false,
          isLeaveLeft: false
        },
        {
          text: "共创平台、共享收益.",
          isCurrent: false,
          isLeaveDown: false,
          isEnterTop: false,
          isLeaveLeft: false
        }
      ],
      currentIndex: 0,
      widthList: null
    };
  },

  methods: {
    toggleCurrent() {
      let currentIndex = 0;
      let itemWidth;
      const query = uni.createSelectorQuery().in(this);
      const data = query
        .selectAll(".headlines_item")
        .boundingClientRect(data => {
          this.widthList = data;
        })
        .exec();

      let timer = setInterval(() => {
        currentIndex++;

        currentIndex = currentIndex >= this.headlinesList.length ? 0 : currentIndex;
          
        this.headlinesList.forEach((item, index) => {
          item.isCurrent = false;
          item.isLeaveDown = false;
          item.isEnterTop = false;
          item.isLeaveLeft = false;
        });

        // 使文字从上面出来
        if (this.headlinesList.length >= 2) {
          this.headlinesList[currentIndex].isCurrent = true;
        } else {
          this.headlinesList[currentIndex].isCurrent = true;
        }

        // 短的从下面出去
        // 使文字向下面出去
        if (currentIndex == 0) {
          this.headlinesList[this.headlinesList.length - 1].isLeaveDown = true;

          // 下去之后使其复位
          setTimeout(() => {
            this.headlinesList[
              this.headlinesList.length - 1
            ].isLeaveDown = false;

            this.headlinesList[this.headlinesList.length - 1].isEnterTop = true;
      
          }, 600);
        } else {
          this.headlinesList[currentIndex - 1].isLeaveDown = true;

          // 下去之后使其复位
          setTimeout(() => {
            this.headlinesList[currentIndex - 1].isLeaveDown = false;
            this.headlinesList[currentIndex - 1].isEnterTop = true;
          }, 600);
        }
      }, 3000);
    },

  },

  mounted() {
    this.toggleCurrent();
  }
};
</script>


<style lang="scss" scoped>
.content {
  margin-top: -10rpx;
  padding-left: 24rpx;
  .feileikuang{
	  width: 100%;
	  height: 400rpx;
	  background: red;
	  display: flex;
	  align-items: center;
	  justify-content: center;
  }
  .nekasd{
	  width: 700rpx;
	  height: 400rpx;
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
  }
  .zuo{
	  width: 350rpx;
	  height: 360rpx;
	  background: yellow;
	  display: flex;
	  align-items: center;
	  justify-content: center;
  }
  .you{
  	  width: 350rpx;
  	  height: 360rpx;
  	  background: blue;
  	  display: flex;
  	  align-items: center;
  	  justify-content: center;
	  flex-direction: column;
  }
  .headlines_container {
    display: flex;
	align-items: center;
    justify-content: center;
    flex-direction: row;

    .headlines_head {
	  width: 180rpx;
      .zx{
		  font-size: 34rpx;
		  font-weight: bold;
		  
	  }
	  .x{
		  font-size: 26rpx;
		  margin-left: 20rpx;
		  margin-top: -6rpx;
	  }
    }

    .headlines_main {
      overflow: hidden;
      position: relative;
      flex-grow: 1;
	  height: 50rpx;
      width: 80rpx;
	  margin-top: 8rpx;
      .headlines_item {
        padding: -10rpx 10rpx;
        white-space: nowrap;
        position: absolute;
        left: 0;
        top: -120%;
		line-height: 40rpx;
        transform: translateY(0);
		color: #999999;
        // background-color: #fff;
      }

      .current {
        top: 50%;
        transform: translateY(-50%);
        transition: all 0.5s linear;
      }

      .enter_top {
        top: -100% !important;
        transform: translateY(0) !important;
        // display: none;
      }

      .leave_down {
        top: 100%;
        transform: translateY(0);
        transition: all 0.5s linear;
      }
    }
  }
}
</style>