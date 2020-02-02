<template>
  <div class="resources-servers-container">
  <el-table
    :data="serverList"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand" >
         <el-form-item label="CPU">
            <span>{{ props.row.cpu }}</span>
          </el-form-item>
          <el-form-item label="内存">
            <span>{{ props.row.mem }}</span>
          </el-form-item>
          <el-form-item label="磁盘">
            <span>{{ props.row.disk }}</span>
          </el-form-item>
          <el-form-item label="sn号">
            <span>{{ props.row.sn }}</span>
          </el-form-item>
          <el-form-item label="UUID">
            <span>{{ props.row.uuid }}</span>
          </el-form-item>
          </el-form>
        <div v-for="d in props.row.device">
        <el-form label-position="left" inline class="demo-table-expand" >
          <div v-for="ifnet in d.ips">
            <el-form-item label="网卡名">
              <span>{{ d.name }}</span>
            </el-form-item>
            <el-form-item label="MAC地址">
              <span>{{ d.mac }}</span>
            </el-form-item>
            <el-form-item label="IPV4地址">
              <span>{{ ifnet.ip }}</span>
            </el-form-item>
            <el-form-item label="IPV4网关">
              <span>{{ ifnet.gateway }}</span>
            </el-form-item>
            <el-form-item label="IPV6地址">
              <span>{{ ifnet.ipv6 }}</span>
            </el-form-item>
            <el-form-item label="IPV6网关">
              <span>{{ ifnet.ipv6_gateway }}</span>
            </el-form-item>
          </div>
        </el-form>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="IP"
      prop="ip">
    </el-table-column>
    <el-table-column
      label="主机名"
      prop="hostname">
    </el-table-column>
    <el-table-column
      label="操作系统"
      prop="os">
    </el-table-column>
    <el-table-column
      label="最后操作时间"
      prop="last_check">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  import { getServerList } from '@/api/servers'
  export default {
    data() {
      return {
        serverList: []
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getServerList(this.params).then(res => {
          console.log('server   res::::::' + res)
          this.serverList = res.results
        })
      }
    }
  }

</script>
<style>
    .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
