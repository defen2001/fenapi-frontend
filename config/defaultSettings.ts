import { ProLayoutProps } from '@ant-design/pro-components';
/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: true,
  title: 'Fen API',
  siderMenuType: 'sub',
  pwa: true,
  logo: "https://image-fenapi-1319981817.cos.ap-guangzhou.myqcloud.com/imageHost/mj9v7syE-%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20230824105503.png?q-sign-algorithm=sha1&q-ak=AKIDPBtoNL48AOhy_RDf-0d9AcwoowxPa1vK08M1NuIrAOFDS4nPBkArOvRstpVwAyKm&q-sign-time=1694671795;1694675395&q-key-time=1694671795;1694675395&q-header-list=host&q-url-param-list=ci-process&q-signature=fbd577afc122337455ec5ca332177d0a58544603&x-cos-security-token=51lkHTvgLuqwKEaQdlSoA2PBkJ5VHjma77b7a64ccdd7a886d1ae62e1e1fb74b2DEhbIeul-ONxsB21FRiWn3J4L7iZCqEYE1bB8cihTMhYTpUW7I2WhGQ-s7zdykhF_qAA4Cs18kjHsRa47CUjNpHTv-7_Gj1FH8RjnldG_6DtEMBNkXlODPbZkbhJCq6dJEPSWLBIS3wruHH3RGVZQB3spziWc1w30vGkBYIpYl4F6GYaY-v7TvlP0Qh1QCbx&ci-process=originImage",
  iconfontUrl: '',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
  },
  splitMenus: false,
};
export default Settings;
