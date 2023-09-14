export default [
  { name: 'API商店', icon: 'HomeOutlined', path: '/', component: './Index' },
  { name: '我的接口', icon: 'StarOutlined', path: '/my_interface', component: './MyInterface' },
  {
    name: '查看接口',
    icon: 'smile',
    path: '/interface_info/:id',
    component: './InterfaceInfo',
    hideInMenu: true,
  },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user', routes: [
          {name: '登录', path: '/user/login', component: './User/Login'},
          {name: '注册', path: '/user/register', component: './User/Register'}
        ]
      },
      {component: './404'},
    ],
  },
  {
    path: '/admin',
    name: '管理中心',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        name: '接口管理',
        icon: 'table',
        path: '/admin/interface_info',
        component: './Admin/InterfaceInfo',
      },
      {
        name: '统计分析',
        icon: 'table',
        path: '/admin/analysis',
        component: './Admin/InterfaceInfoAnalysis',
      },
    ],
  },
  { name: '个人中心', icon: 'UserOutlined', path: '/profile', component: './User/Profile' },
  // {name: '接口管理', icon: 'table', path: '/list', component: './InterfaceInfo'},
  // {path: '/', redirect: '/welcome'},
  { path: '*', layout: false, component: './404' },
];
