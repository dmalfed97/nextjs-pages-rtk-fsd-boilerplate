// import type { ReactElement, PropsWithChildren, SyntheticEvent, ReactNode } from 'react'
// import React, { memo } from 'react'
// import { makeStyles } from 'tss-react/mui'
// import { Accordion, AccordionDetails, AccordionSummary, Stack, Box } from '@mui/material'
// import { ExpandMore as ExpandMoreIcon, Warning as WarningIcon } from '@mui/icons-material'
//
// interface QAccordionProps extends PropsWithChildren {
//   error?: boolean
//   expanded?: boolean
//   onChange: (event: SyntheticEvent, expanded: boolean) => void
//   summaryContent?: ReactNode
// }
//
// const QAccordion = memo(
//   ({ children, onChange, expanded, summaryContent, error }: QAccordionProps): ReactElement => {
//     const { classes } = useStyles()
//
//     // Renders
//     return (
//       <Accordion className={classes.accordion} onChange={onChange} expanded={expanded}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Stack direction="row" justifyContent="stretch" gap={2} width="100%">
//             <Box flex={1}>{summaryContent}</Box>
//
//             {error && <WarningIcon style={{ marginRight: 10, color: 'red' }} />}
//           </Stack>
//         </AccordionSummary>
//
//         {expanded && <AccordionDetails sx={{ mt: '-50px' }}>{children}</AccordionDetails>}
//       </Accordion>
//     )
//   }
// )
//
// const useStyles = makeStyles()(() => ({
//   accordion: {
//     borderRadius: '20px!important',
//     padding: 10,
//     ':before': { backgroundColor: 'transparent' },
//   },
// }))
//
// export { QAccordion }
