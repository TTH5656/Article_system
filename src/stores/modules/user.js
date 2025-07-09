import { defineStore } from "pinia";
import { usergetInfoService } from "@/api/user";
import { ref } from "vue"; // 修正这里
export const useUserStore=defineStore('big-user',()=>{
  const token=ref('')
  const userInfo=ref({})
  const setToken=(val)=>{
    token.value=val
  }
  const removeToken=()=>{
    token.value=''
  }
  const getUserInfo=async ()=>{
    const res=await usergetInfoService()
    userInfo.value=res.data.data
    // console.log(res.data.data);
  }
  const setUserInfo=(val)=>{
    userInfo.value=val
  }
  return {
    token,
    setToken,
    removeToken,
    getUserInfo,
    setUserInfo,
    userInfo
  }
},
{
  persist:true
})
