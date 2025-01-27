import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  descriptionPoints: {
    li: {
      width: '100%',
    },
    paddingLeft: 15,
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '20px',
  },
}))
