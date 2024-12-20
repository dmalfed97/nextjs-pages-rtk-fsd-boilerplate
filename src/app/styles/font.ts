import localFont from 'next/font/local'

export const stolziFont = localFont({
  src: [
    {
      path: 'fonts/Stolzl-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: 'fonts/Stolzl-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: 'fonts/Stolzl-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/Stolzl-Book.woff2',
      weight: '300',
      style: 'normal',
    },
  ],
})
