import request from '@/utils/request'
export const userRegisterService = ({ username, password, repassword }) => {
  request.post('/api/reg', {
    username,
    password,
    repassword,
  })
}
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', {
    username,
    password,
  })

export const usergetInfoService = () => request.get('/my/userinfo')
export const userUpdateInfoService = ({ id, username, nickname, email, user_pic }) =>
  request.put('/my/userinfo', {
    id,
    username,
    nickname,
    email,
    user_pic,
  })
export const userUpdateAvatarService = (avatar) =>
  request.patch('/my/update/avatar', {
    avatar,
  })
export const userUpdatePasswordService = ({ old_pwd, new_pwd, re_pwd }) =>
  request.patch('/my/updatepwd', {
    old_pwd,
    new_pwd,
    re_pwd,
  })
