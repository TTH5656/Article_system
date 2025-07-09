import request from '@/utils/request'
export const getArticleChannelService = () => request.get('/my/cate/list')
export const addArticleChannelService = ({ cate_name, cate_alias }) =>
  request.post('/my/cate/add', {
    cate_name,
    cate_alias,
  })
export const updateArticleChannelService = ({ cate_name, cate_alias, id }) =>
  request.put('/my/cate/info', {
    cate_name,
    cate_alias,
    id,
  })
export const deleteArticleService = (id) =>
  request.delete('/my/cate/del', {
    params: {
      id,
    },
  })
export const getArticleListService = ({ pagenum, pagesize, cate_id, state }) =>
  request.get('/my/article/list', {
    params: {
      pagenum,
      pagesize,
      cate_id,
      state,
    },
  })
export const getArticleDetailService = (id) =>
  request.get('/my/article/info', {
    params: {
      id,
    },
  })
export const addArticleService = (data) => request.post('/my/article/add', data)
export const editArticleService = (id) =>
  request.get('/my/article/info', {
    params: { id },
  })
