import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  page: {
    backgroundColor: '#fff',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundImage:
      'radial-gradient(50% 50% at 50% 50%,rgba(160,51,255,.024) 0%,rgba(160,51,255,0) 50%),radial-gradient(50% 50% at 50% 50%,rgba(160,51,255,.04) 0%,rgba(160,51,255,0) 75%),radial-gradient(50% 50% at 50% 50%,rgba(160,51,255,.064) 0%,rgba(160,51,255,0) 100%),radial-gradient(50% 50% at 50% 50%,rgba(24,119,242,.024) 0%,rgba(24,119,242,0) 50%),radial-gradient(50% 50% at 50% 50%,rgba(24,119,242,.04) 0%,rgba(24,119,242,0) 75%),radial-gradient(50% 50% at 50% 50%,rgba(24,119,242,.064) 0%,rgba(24,119,242,0) 100%),radial-gradient(50% 50% at 50% 50%,rgba(255,108,92,.024) 0%,rgba(255,108,92,0) 50%),radial-gradient(50% 50% at 50% 50%,rgba(255,108,92,.04) 0%,rgba(255,108,92,0) 75%),radial-gradient(50% 50% at 50% 50%,rgba(255,108,92,.064) 0%,rgba(255,108,92,0) 100%),radial-gradient(50% 50% at 50% 50%,rgba(245,206,51,.024) 0%,rgba(245,206,51,0) 50%),radial-gradient(50% 50% at 50% 50%,rgba(245,206,51,.04) 0%,rgba(245,206,51,0) 75%),radial-gradient(50% 50% at 50% 50%,rgba(245,206,51,.064) 0%,rgba(245,206,51,0) 100%),radial-gradient(50% 50% at 50% 50%,rgba(37,211,102,.024) 0%,rgba(37,211,102,0) 50%),radial-gradient(50% 50% at 50% 50%,rgba(37,211,102,.04) 0%,rgba(37,211,102,0) 75%),radial-gradient(50% 50% at 50% 50%,rgba(37,211,102,.064) 0%,rgba(37,211,102,0) 100%),radial-gradient(50% 50% at 50% 50%,rgba(24,119,242,.024) 0%,rgba(24,119,242,0) 50%),radial-gradient(50% 50% at 50% 50%,rgba(24,119,242,.04) 0%,rgba(24,119,242,0) 75%),radial-gradient(50% 50% at 50% 50%,rgba(24,119,242,.064) 0%,rgba(24,119,242,0) 100%)',
    backgroundPosition:
      '37.97vw calc(((300vw - 100vh) / 2 - 85.77vw) * -1),37.97vw calc(((300vw - 100vh) / 2 - 85.77vw) * -1),37.97vw calc(((300vw - 100vh) / 2 - 85.77vw) * -1),-100vw calc(((300vw - 100vh) / 2 - 154.56vw) * -1),-100vw calc(((300vw - 100vh) / 2 - 154.56vw) * -1),-100vw calc(((300vw - 100vh) / 2 - 154.56vw) * -1),13.34vw calc(((300vw - 100vh) / 2 - 53.88vw) * -1),13.34vw calc(((300vw - 100vh) / 2 - 53.88vw) * -1),13.34vw calc(((300vw - 100vh) / 2 - 53.88vw) * -1),10.64vw calc(((300vw - 100vh) / 2 - 17.19vw) * -1),10.64vw calc(((300vw - 100vh) / 2 - 17.19vw) * -1),10.64vw calc(((300vw - 100vh) / 2 - 17.19vw) * -1),-49vw calc(((300vw - 100vh) / 2 - 41.1vw) * -1),-49vw calc(((300vw - 100vh) / 2 - 41.1vw) * -1),-49vw calc(((300vw - 100vh) / 2 - 41.1vw) * -1),-100vw calc(((300vw - 100vh) / 2 - 78vw) * -1),-100vw calc(((300vw - 100vh) / 2 - 78vw) * -1),-100vw calc(((300vw - 100vh) / 2 - 78vw) * -1)',
    backgroundSize:
      '156.45vw 99.03vw,156.45vw 99.03vw,156.45vw 99.03vw,226.86vw 145.44vw,226.86vw 145.44vw,226.86vw 145.44vw,171.96vw 110.31vw,171.96vw 110.31vw,171.96vw 110.31vw,130.29vw 83.58vw,130.29vw 83.58vw,130.29vw 83.58vw,198vw 126.9vw,198vw 126.9vw,198vw 126.9vw,300vw 192vw,300vw 192vw,300vw 192vw',
  },
  pageMuted: {
    backgroundImage:
      'radial-gradient(50% 50% at 50% 50%,rgba(160,51,255,.012) 0%,rgba(160,51,255,0) 50%),radial-gradient(50% 50% at 50% 50%,rgba(160,51,255,.02) 0%,rgba(160,51,255,0) 75%),radial-gradient(50% 50% at 50% 50%,rgba(160,51,255,.032) 0%,rgba(160,51,255,0) 100%),radial-gradient(50% 50% at 50% 50%,rgba(24,119,242,.012) 0%,rgba(24,119,242,0) 50%),radial-gradient(50% 50% at 50% 50%,rgba(24,119,242,.02) 0%,rgba(24,119,242,0) 75%),radial-gradient(50% 50% at 50% 50%,rgba(24,119,242,.032) 0%,rgba(24,119,242,0) 100%),radial-gradient(50% 50% at 50% 50%,rgba(255,108,92,.012) 0%,rgba(255,108,92,0) 50%),radial-gradient(50% 50% at 50% 50%,rgba(255,108,92,.02) 0%,rgba(255,108,92,0) 75%),radial-gradient(50% 50% at 50% 50%,rgba(255,108,92,.032) 0%,rgba(255,108,92,0) 100%),radial-gradient(50% 50% at 50% 50%,rgba(245,206,51,.012) 0%,rgba(245,206,51,0) 50%),radial-gradient(50% 50% at 50% 50%,rgba(245,206,51,.02) 0%,rgba(245,206,51,0) 75%),radial-gradient(50% 50% at 50% 50%,rgba(245,206,51,.032) 0%,rgba(245,206,51,0) 100%),radial-gradient(50% 50% at 50% 50%,rgba(37,211,102,.012) 0%,rgba(37,211,102,0) 50%),radial-gradient(50% 50% at 50% 50%,rgba(37,211,102,.02) 0%,rgba(37,211,102,0) 75%),radial-gradient(50% 50% at 50% 50%,rgba(37,211,102,.032) 0%,rgba(37,211,102,0) 100%),radial-gradient(50% 50% at 50% 50%,rgba(24,119,242,.012) 0%,rgba(24,119,242,0) 50%),radial-gradient(50% 50% at 50% 50%,rgba(24,119,242,.02) 0%,rgba(24,119,242,0) 75%),radial-gradient(50% 50% at 50% 50%,rgba(24,119,242,.032) 0%,rgba(24,119,242,0) 100%)',
  },
  pageDark: {
    backgroundColor: '#1c2b33',
  },
});

export const GeoPrivateCompanyGradientXStyleSelector = ({ isMuted = false, isDark = false }) => {
  return [styles.page, isMuted ? styles.pageMuted : null, isDark ? styles.pageDark : null].filter(Boolean);
};
