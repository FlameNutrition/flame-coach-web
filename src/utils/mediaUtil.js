import useMediaQuery from '@material-ui/core/useMediaQuery';

const WIDTH_600 = '600px';
const WIDTH_800 = '800px';

const useIsMobile = () => {
  return useMediaQuery(`(max-width:${WIDTH_600})`);
};

const useIsMediumMobile = () => {
  return useMediaQuery(`(max-width:${WIDTH_800})`);
};

export {
  useIsMobile,
  useIsMediumMobile
};
