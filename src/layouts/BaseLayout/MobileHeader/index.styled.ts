import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    boxShadow: 'unset',
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
  },
  drawer: {
    height: 'calc(100dvh - 60px)',
    top: 60,
    zIndex: 1000,
  },
  drawerPaper: {
    top: 60,
    height: 'calc(100dvh - 60px)',
    width: '100dvw',
    boxShadow: 'none',
  },
  toolbar: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 'unset!important',
  },
  imgLink: {
    lineHeight: 0,
  },
  searchBtn: {
    border: `1px solid ${theme.palette.grey[300]}`,
  },
  signInBtn: {
    padding: theme.spacing(0.5, 2),
  },
}))
