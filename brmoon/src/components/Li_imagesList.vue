<template>
    <div class="Li_images_list">
        <div class="Li_images_play" v-show="ablum_images">
            <div class="Upload_images">
                <a @click="uploadShow()">
                    <i class="fa fa-upload" aria-hidden="true"></i>
                    上传图片
                </a>
            </div>
            <div class="image_btn" @click="AddAblumShow()">
                <a>创建相册</a>
            </div>
            <div class="image_btn">
                <a>显示设置</a>
            </div>
        </div>
        <div class="Li_ablum_list" v-show="ablum_images">
            <ul>
                <li v-for="(ablum,index) in ablumList" :key="index" :data-id="ablum.ablumid">
                    <div class="Li_ablim_content" @click="showImg(ablum.ablumid,ablum.ablumTitle,ablum.ablumCoverUrl)">
                        <div class="Li_ablum_cover">
                            <img :src="ablum.ablumCoverUrl" alt="">
                            <span class="Li_ablum_num">{{ablum.ablumNum}}</span>
                        </div>
                        <div class="Li_ablum_title">
                            <span>{{ablum.ablumTitle}}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="Li_img_list" v-show="!ablum_images">
            <div class="img_coverImg">
                <img :src="ablumSelectCover" alt="">
            </div>
            <div class="Li_img_info">
                <div class="Li_img_title"><h3>{{ablumSelectTitle}}</h3></div>
                <div class="Upload_images">
                    <a @click="uploadShow()">
                        <i class="fa fa-upload" aria-hidden="true"></i>
                        上传图片
                    </a>
                </div>
            </div>
            <div class="Li_img_content">
                <ul>
                    <li v-for="(img,index) in showImgList" :key="index" :data-id="img.ablumid">
                        <div class="Li_ablim_content">
                            <div class="Li_ablum_cover">
                                <img :src="img.imgUrl" alt="">
                            </div>
                            <div class="Li_ablum_title">
                                <span>{{img.imgTitle}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="uploadimg" v-show="uploadS">
            <div class="uploadtop">
                <span>上传图片</span>
                <span style="float:right" @click="uploadHide()">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </span>
            </div>
            <div class="uploadto" @click="selectAblum()">
                <span style="vertical-align: middle;">上传至</span>
                <div class="uploadto_de">
                    <img :src="ablumSelectCover" alt="" class="list_img">
                    <span>{{ablumSelectTitle}}</span>
                    <i class="fa fa-sort-desc" aria-hidden="true"></i>
                </div>
                <div class="up_ablum_list" v-show="up_to_List">
                    <ul>
                        <li v-for="(title,index) in ablumList" :key="index" @click="selectThisAblum(title.ablumid,title.ablumTitle,title.ablumCoverUrl)">
                            <img :src="title.ablumCoverUrl" alt="" class="list_img">
                            <span>{{title.ablumTitle}}</span>
                        </li>
                        <li class="up_add_ablum" @click="AddAblumShow()">
                            <i class="fa fa-picture-o" aria-hidden="true"></i>
                            <span>添加相册</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="uploadlist">
                <label class="uploadlist_n_btn uploadlist_none" for="upImg" v-show="!uploadlist">
                    <a>
                        <i class="fa fa-upload" aria-hidden="true"></i>
                        上传图片
                    </a>
                </label>
                <input type="file" id="upImg" accept="image/*" @change="uploadimg" v-show="false" multiple="multiple">
                <div class="uploadlist_show" v-show="uploadlist">
                    <div v-for="(img,index) in imgList" :key="index" class="preImgList">
                        <div>
                            <img :src="img.preImgUrl" alt="">
                        </div>
                        <span>{{img.preImgName}}</span>
                    </div>
                </div>
                <div class="uploadlist_Continue" v-show="uploadlist">
                    <div class="com_upload" @click="StartUploadImg()"><a>开始上传</a></div>
                    <label class="Continue_up" for="upImg"><a>继续添加</a></label>
                </div>
            </div>
        </div>
        <div class="shade" v-show="uploadS" @click="uploadHide()"></div>
        <div class="addAblum" v-show="addAblum">
            <div class="uploadtop">
                <span>创建相册</span>
                <span style="float:right" @click="addAblumhide()">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </span>
            </div>
            <div class="inputAblum"><span>相册名称</span><input type="text" v-model="NewAblumTitle"></div>
            <div class="comfireAdd">
                <div @click="CreatAblum()">确定</div>
                <div style="background-color:#fff;color:#333" @click="addAblumhide()">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Li_imagesList',
  data(){
      return{
          addAblum:false,
          up_to_List:false,
          uploadS:false,
          uploadlist:false,
          NewAblumTitle:'',
          ablumSelectTitle:'第一个相册',
          ablumSelectId:'2520',
          ablumSelectCover:require("../assets/Li_head.jpg"),

          ablumList:[],
            //预览图片数据
          imgList:[],
          showImgList:[]
      }
  },
    computed:{
        ...mapState([
            'ablum_images'
        ]),
    },
  mounted(){
    const _this=this
    _this.$axios({
        methods:'GET',
        url:'http://localhost:8806/index.php?type=ablumList',
        scriptCharset: 'utf-8'
    }).then(function(res){
        _this.ablumList=res.data;
        _this.ablumSelectTitle=_this.ablumList[0].ablumTitle;
        _this.ablumSelectId=_this.ablumList[0].ablumid;
        _this.ablumSelectCover=require(_this.ablumList[0].ablumCoverUrl);
    }).catch(function(res){
        console.log("请求数据错误");
    })
  },
  methods:{
    ...mapMutations([
        "ablumToimages"
    ]),
      uploadShow:function(){
          this.uploadS=true;
          this.uploadlist=false;
      },
      uploadHide:function(){
          this.uploadS=false;
          this.imgList=[];
      },
      AddAblumShow:function(){
          this.addAblum=true;
      },
      addAblumhide:function(){
          this.addAblum=false;
      },
      selectAblum:function(){
          this.up_to_List=!this.up_to_List;
      },
      selectThisAblum:function(ablumid,ablumTitle,ablumCoverUrl){
        this.ablumSelectId=ablumid;
        this.ablumSelectTitle=ablumTitle;
        this.ablumSelectCover=ablumCoverUrl;
      },
      tranImg:function(files,imginfo,i,num,e,_this){
        var that=this;
        files = e.target.files[i];
        imginfo={};
        // console.log(files);
        if (!e || !window.FileReader) return ; // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里;
        reader.onloadend = function () {
            imginfo.preImgUrl = this.result;
            imginfo.preImgName = files.name;
            _this.imgList.push(imginfo);
            console.log(_this.imgList);
            console.log(i,num);
            if(i<num){
                that.tranImg(files,imginfo,i,num,e,_this);
            }
        }
        i++;
      },
      uploadimg:function(e){
        this.uploadlist=true;
        let _this = this;
        var imginfo={};
        var files = {};
        var i=0;
        this.$options.methods.tranImg(files,imginfo,i,e.target.files.length,e,_this);
      },
      StartUploadImg:function(){
            let _this=this;
            var imginfo={};
            imginfo.num=_this.imgList.length;
            imginfo.type="img";
            imginfo.ablumSelectId=_this.ablumSelectId;
            imginfo.info=_this.imgList;
            // var postData=_this.$qs.parse(parmar);
            var postData=JSON.stringify(imginfo);
            
            console.log(postData);
                // data:JSON.stringify(parmar),
            _this.$axios({
                method: 'post',
                url:'http://localhost:8806/upload.php',
                data: postData,
            }).then(function(res){
                //刷新图片
                _this.$axios({
                    methods:'GET',
                    url:'http://localhost:8806/index.php?ablumid='+ _this.ablumSelectId+'&type=imgList',
                    scriptCharset: 'utf-8'
                }).then(function(res){
                    _this.showImgList=res.data;
                }).catch(function(res){
                    console.log("获取图片数据错误");
                })
                //刷新相册
                _this.$axios({
                    methods:'GET',
                    url:'http://localhost:8806/index.php?type=ablumList',
                    scriptCharset: 'utf-8'
                }).then(function(res){
                    _this.ablumList=res.data;
                }).catch(function(res){
                    console.log("请求数据错误");
                })
                _this.uploadS=false;
            }).catch(function(res){
                console.log("请求数据错误");
            })
      },
      CreatAblum:function(){
        const _this=this;
        var parmar={};
        var info={}
        _this.addAblum=false;
        parmar.type=5;
        info.NewAblumTitle=_this.NewAblumTitle;
        info.ablumid=Math.floor(Math.random()*40)+1000;
        parmar.info=info;
        // var postData=_this.$qs.parse(parmar);
        var postData=JSON.stringify(parmar);
        
        console.log(postData);
            // data:JSON.stringify(parmar),
        _this.$axios({
            method: 'post',
            url:'http://localhost:8806/postComment.php',
            data: postData,
            }).then(function(res){
                if(res.data){
                    alert('创建成功');
                }else{
                    alert('创建失败');
                }
            }).catch(function(res){
                console.log("请求数据错误");
            })
      },
      showImg:function(ablumid,ablumTitle,ablumCoverUrl){
          this.ablumToimages(false);
          let _this=this;
            _this.$axios({
                methods:'GET',
                url:'http://localhost:8806/index.php?ablumid='+ablumid+'&type=imgList',
                scriptCharset: 'utf-8'
            }).then(function(res){
                _this.showImgList=res.data;
                _this.ablumSelectTitle=ablumTitle;
                _this.ablumSelectId=ablumid;
                _this.ablumSelectCover=require(ablumCoverUrl);
            }).catch(function(res){
                console.log("请求数据错误");
            })
      }
  }
}
</script>

<style>
a{
    text-decoration: none;
    color: #333;
}
.Li_images_list{
    padding-top: 30px;
}
.image_btn{
    display: inline-block;
    vertical-align: middle;
    margin-right: 20px;
}
.image_btn a{
    float: left;
    height: 33px;
    line-height: 33px;
    padding: 0 10px;
    background-color: #fafafa;
    border-radius: 2px;
    border: 1px solid #d9d9d9;
    font-size: 14px;
}
.Upload_images{
    display: inline-block;
    vertical-align: middle;
    margin-right: 20px;

}
.Upload_images a{
    padding: 7px 20px;
    color: #fff;
    border: 1px solid #4798d6;
    background-color: #5caae6;
    background-position: 0 0!important;
    text-decoration: none;
    font-size: 16px;
    border-radius: 3px;
    cursor: pointer;
}
.Li_ablum_list{
    padding: 40px 0;
}
.Li_ablum_list li{
    display: inline-block;
    margin-right: 20px;
    vertical-align: middle;
}
.Li_ablim_content{
    width: 150px;
    padding:6px;
    text-shadow: 0 1px 4px rgba(0,0,0,.15);
    background-color: #ffffff;
    border-style: solid;
    border-width: 0;
    border-color: #e6e6e6;
}
.Li_ablum_cover{
    height: 142px;
    position: relative;
}
.Li_ablum_cover img{
    width: 100%;
    height: 100%;
}
.Li_ablum_title{
    padding: 4px 5px 0 5px;
}
.Li_ablum_title span{
    color: #333;
    font-size: 12px;
}
.Li_ablum_num{
    color: #fff;
    position: absolute;
    top: 110px;
    right: 10px;
    font-size: 25px;
}
.uploadimg{
    width: 80%;
    position: fixed;
    display: block;
    left: 10%;
    top: 10%;
    bottom: 5%;
    color: black;
    background-color: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    z-index: 20;
}
.uploadtop{
    line-height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid #d9d9d9;
}
.uploadto{
    background-color: #fafafa;
    line-height: 50px;
    padding: 0 20px;
}
.uploadto span{
    font-size: 14px;
    color: #555;
}
.uploadto_de{
    display: inline-block;
    height: 42px;
    vertical-align: middle;
    padding: 0 5px;
    line-height: 42px;
    border: 1px solid #ddd;
    background-color: #fff;
    width: 280px;
    border-radius: 5px;
}
.list_img{
    height: 80%;
    vertical-align: middle;
    width: 14%;
}
.uploadto_de i{
    float: right;
    margin-top: 10px;
    color: #888;
}
.up_ablum_list{
    padding: 0 5px;
    width: 280px;
    position: absolute;
    top: 99px;
    left: 67px;
    border-radius: 0 0 5px 5px;
    border: 1px solid #ddd;
    border-top: none;
    background-color: #fff;
}
.up_ablum_list li{
    border-bottom: 1px dashed #ddd;
    height: 50px;
    cursor: pointer;
}
.up_ablum_list li:hover{
    background-color: #d9d9d9;
}
.up_add_ablum{
    text-align: center;
    border-bottom: none!important;
}
.uploadlist{
    height: 75%;
}
.uploadlist_none{
    line-height: 50px;
    background: #349cf3;
    width: 200px;
    height: 50px;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    cursor: pointer;
}
.uploadlist_n_btn{
    cursor: pointer;
}
.uploadlist_n_btn a{
    font-size: 20px;
    color: #ffffff;
}
.uploadlist_show{
    padding-top: 20px;
}
.preImgList{
    width: 130px;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    margin: 0px 20px 10px 20px;
}
.preImgList img{
    width:100%;
    vertical-align: middle;
}
.preImgList div{
    height: 130px;
    line-height: 130px
}
.preImgList span{
    color: #333;
    font-size: 12px;
}
.uploadlist_Continue{
    padding: 15px 30px;
    background-color: #fafafa;
    position: absolute;
    bottom: 20px;
    width: 100%;
    box-sizing: border-box;
    height: 80px;
}
.uploadlist_Continue div{
    float: left;
    height: 50px;
    width: 200px;
    text-align: center;
    line-height: 50px;
    background-color: #349cf3;
    /* color: #fff!important; */
    font-size: 18px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-right: 20px;
    cursor: pointer;
}
.com_upload a{
    color: #fff;
}
.Continue_up{
    background-color: #fff;
    float: left;
    height: 50px;
    width: 200px;
    text-align: center;
    line-height: 50px;
    /* color: #fff!important; */
    font-size: 18px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-right: 20px;
    cursor: pointer;
}
.addAblum{
    position: fixed;
    width: 50%;
    left: 22%;
    top: 40%;
    bottom: 43%;
    color: black;
    background-color: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    z-index: 20;
}
.inputAblum{
    width: 50%;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
}
.inputAblum input{
    margin-left: 20px;
    height: 20px;
    border-radius: 5px;
    border: 1px solid #ddd;
}
.comfireAdd{
    text-align: center;
    height: 50px;
}
.comfireAdd div{
    height: 30px;
    border: 1px solid #ddd;
    width: 80px;
    text-align: center;
    line-height: 30px;
    border-radius: 3px;
    cursor: pointer;
    background-color: #47a9fb;
    display: inline-block;
    color: #fff;
}
.img_coverImg{
    display: inline-block;
    height: 70px;
    padding: 2px;
    border: 1px solid#ddd;
    margin:0 15px;
}
.img_coverImg img{
    height: 70px;
}
.Li_img_info{
    display: inline-block;
    height: 70px;
    vertical-align: text-bottom;
    margin-bottom: 5px;
}
.Li_img_title{
    height: 45px;
}
.Li_img_content{
    padding-top: 30px;
}
.Li_img_content li{
    list-style: none;
    display: inline-block;
    margin: 0 10px 20px 10px;
}
</style>
