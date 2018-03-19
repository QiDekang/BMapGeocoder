<template>
  <div class="test">
    <baidu-map class="AddressMap" :center="center" :zoom="15" :scroll-wheel-zoom="true" @ready="handler">
      <group class="AddressInput">
        <x-input placeholder="请输入详细地址" v-model="communityInputValue" @on-change="change"></x-input>
      </group>
    </baidu-map>
  </div>
</template>

<script>
import { Group, XInput } from 'vux'

export default {
  components: {
    Group,
    XInput
  },
  data () {
    return {
      center: {lng: 0, lat: 0},
      zoom: 3,
      communityInputValue: ''
    }
  },
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
      // 创建地址解析器实例
      var myGeo = new BMap.Geocoder()
      // 将地址解析结果显示在地图上，并调整地图视野
      var myAddress = this.communityInputValue
      if (myAddress.length > 0) {
        myGeo.getPoint(myAddress, function (point) {
          if (point) {
            map.centerAndZoom(point, 16)
            map.addOverlay(new BMap.Marker(point))
            console.log(point)
          } else {
            console.log('您选择的地址没有解析到结果!')
          }
        },
        '北京市')
      }
    },
    change (val) {
      this.handler()
      //  this.handler(this.BMap, this.map)
    }
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/variable"
.test
  .AddressMap
    width: 100vw
    height: 100vh
    .AddressInput
      width: 100vw
      position: absolute
      top: 4.0005vw
      z-index: 20
</style>
