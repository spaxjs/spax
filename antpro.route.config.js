export default [
  // user
  {
    path: '/administrator',
    component: '../layouts/LoginLayout',
    routes: [
      { path: '/administrator', redirect: '/administrator/login' },
      { path: '/administrator/login', component: './misc/Login' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      // dashboard
      { path: '/', redirect: '/content/games' },
      // content
      {
        path: '/content',
        name: '内容管理',
        icon: 'form',
        authority: ['admin', 'editor', 'operator'],
        routes: [
          // games
          {
            path: '/content/games',
            name: '游戏管理',
            icon: 'calculator',
            component: './content/Game',
            authority: ['admin', 'editor'],
          },
          { path: '/content/games/new', component: './content/Game/Form', authority: ['admin', 'editor'] },
          { path: '/content/games/:id', component: './content/Game/Form', authority: ['admin', 'editor'] },
          // ratings
          {
            path: '/content/ratings',
            name: '评价管理',
            icon: 'star',
            component: './content/Rating',
            authority: ['admin', 'editor'],
          },
          { path: '/content/ratings/:id', component: './content/Rating/Form', authority: ['admin', 'editor'] },
          // articles
          {
            path: '/content/articles',
            name: '文章管理',
            icon: 'pic-left',
            component: './content/Article',
            authority: ['admin', 'editor'],
          },
          { path: '/content/articles/new', component: './content/Article/Form', authority: ['admin', 'editor'] },
          { path: '/content/articles/:id', component: './content/Article/Form', authority: ['admin', 'editor'] },
          // categories
          {
            path: '/content/categories',
            name: '游戏分类管理',
            icon: 'appstore',
            component: './content/Category',
            authority: ['admin', 'editor'],
          },
          { path: '/content/categories/new', component: './content/Category/Form', authority: ['admin', 'editor'] },
          { path: '/content/categories/:id', component: './content/Category/Form', authority: ['admin', 'editor'] },
          {
            path: '/content/tasks',
            name: '每日任务管理',
            icon: 'check-square',
            component: './content/Task',
            authority: ['admin', 'operator'],
          },
          { path: '/content/tasks/new', component: './content/Task/Form', authority: ['admin', 'operator'] },
          { path: '/content/tasks/:id', component: './content/Task/Form', authority: ['admin', 'operator'] },
          {
            path: '/content/raffles',
            name: '抽奖转盘管理',
            icon: 'compass',
            component: './content/Raffle',
            authority: ['admin', 'operator'],
          },
          { path: '/content/raffles/new', component: './content/Raffle/Form', authority: ['admin', 'operator'] },
          { path: '/content/raffles/:id', component: './content/Raffle/Form', authority: ['admin', 'operator'] },
        ],
      },
      // custom
      {
        path: '/custom',
        name: '用户管理',
        icon: 'setting',
        authority: ['admin'],
        routes: [
          {
            path: '/custom/users',
            name: '用户管理',
            icon: 'user',
            component: './custom/User',
          },
          { path: '/custom/users/new', component: './custom/User/Form' },
          { path: '/custom/users/:id', component: './custom/User/Form' },
          {
            path: '/custom/actions',
            name: '行为记录',
            icon: 'bars',
            component: './custom/Action',
          },
          {
            path: '/custom/tasks',
            name: '任务记录',
            icon: 'bars',
            component: './custom/Task',
          },
        ],
      },
      // product
      {
        path: '/product',
        name: '产品管理',
        icon: 'shop',
        authority: ['admin'],
        routes: [
          {
            path: '/product/g4',
            name: '小猪消消乐',
            icon: 'build',
            routes: [
              {
                path: '/product/g4/configs',
                name: '配置列表',
                icon: 'bars',
                component: './product/g4/Config',
              },
              { path: '/product/g4/configs/new', component: './product/g4/Config/Form' },
              { path: '/product/g4/configs/:id', component: './product/g4/Config/Form' },
              {
                path: '/product/g4/tasks',
                name: '每日任务',
                icon: 'check-square',
                component: './product/g4/Task',
              },
              { path: '/product/g4/tasks/new', component: './product/g4/Task/Form' },
              { path: '/product/g4/tasks/:id', component: './product/g4/Task/Form' },
              {
                path: '/product/g4/users',
                name: '玩家列表',
                icon: 'bars',
                component: './product/g4/User',
              },
              {
                path: '/product/g4/userlogs',
                name: '玩家金币记录',
                icon: 'wallet',
                component: './product/g4/UserLog',
              },
              {
                path: '/product/g4/usertasks',
                name: '玩家任务记录',
                icon: 'bars',
                component: './product/g4/UserTask',
              },
            ]
          },
        ],
      },
      // market
      {
        path: '/market',
        name: '营销管理',
        icon: 'deployment-unit',
        authority: ['admin', 'operator', 'cooperator'],
        routes: [
          {
            path: '/market/unions',
            name: '交叉营销管理',
            icon: 'block',
            component: './market/Union',
          },
          { path: '/market/unions/new', component: './market/Union/Form', authority: ['admin', 'operator'] },
          { path: '/market/unions/:id', component: './market/Union/Form', authority: ['admin', 'operator'] },
          { path: '/market/unions/:id/reports', component: './market/Union/Report' },
          { path: '/market/unions/:id/atlases', component: './market/Union/Atlas' },
          // reports
          {
            path: '/market/reports',
            name: '交叉营销记录',
            icon: 'bars',
            component: './market/Report',
          },
          // traces
          {
            path: '/market/traces',
            name: '渠道营销记录',
            icon: 'bars',
            component: './market/Trace',
          },
        ],
      },
      // system
      {
        path: '/system',
        name: '系统管理',
        icon: 'setting',
        authority: ['admin'],
        routes: [
          {
            path: '/system/administrators',
            name: '系统用户',
            icon: 'user',
            component: './system/Administrator',
          },
          { path: '/system/administrators/new', component: './system/Administrator/Form' },
          { path: '/system/administrators/:id', component: './system/Administrator/Form' },
          {
            path: '/system/loginlogs',
            name: '登录日志',
            icon: 'bars',
            component: './system/LoginLog',
          },
          {
            path: '/system/accesslogs',
            name: '操作日志',
            icon: 'bars',
            component: './system/AccessLog',
          },
        ],
      },
      // exceptions
      { path: '/exception/403', component: './misc/Exception/403' },
      { path: '/exception/500', component: './misc/Exception/500' },
      {
        component: './misc/Exception/404',
      },
    ],
  },
];
