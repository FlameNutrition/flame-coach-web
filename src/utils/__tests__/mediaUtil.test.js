import { useMediaQuery } from '@material-ui/core';
import { useIsMobile, useIsMediumMobile } from '../mediaUtil';

jest.mock('@material-ui/core', () => ({
  useMediaQuery: jest.fn()
}));

describe('mediaUtil tests', () => {
  it('test useIsMobile', async () => {
    useMediaQuery.mockReset();
    useMediaQuery.mockImplementation(() => true);

    const result = useIsMobile();

    expect(useMediaQuery)
      .toHaveBeenCalledWith('(max-width:600px)');
    expect(result)
      .toBeTruthy();
  });

  it('test useIsMediumMobile', async () => {
    useMediaQuery.mockReset();
    useMediaQuery.mockImplementation(() => true);

    const result = useIsMediumMobile();

    expect(useMediaQuery)
      .toHaveBeenCalledWith('(max-width:800px)');
    expect(result)
      .toBeTruthy();
  });
});
