import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  select: {
    '& .MuiTextField-root': {
      width: '100%',
      color: theme.palette.text.primary,
    },
    '& .MuiInputBase-root': {
      borderRadius: 8,
      background: theme.palette.background.paper,
    },
    '& .MuiIconButton-root': {
      marginRight: -5,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.grey[300],
    },
    '& .MuiSvgIcon-root': {
      color: theme.palette.grey[300],
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`,
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`,
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
}))
