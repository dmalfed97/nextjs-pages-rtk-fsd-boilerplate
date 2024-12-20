import type { FC } from 'react'
import React, { useEffect, useRef } from 'react'
import type { LottieComponentProps, LottieRefCurrentProps } from 'lottie-light-react'
import Lottie from 'lottie-light-react'
import { Skeleton } from '@mui/material'
import type { SkeletonProps } from '@mui/material'

interface ILottieComponentProps extends LottieComponentProps {
  isPaused?: boolean
  isStopped?: boolean
}

const LottieComponent: FC<ILottieComponentProps> = ({
  isPaused = false,
  isStopped = false,
  ...props
}) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null)

  useEffect(() => {
    if (isStopped) return

    if (isPaused) {
      lottieRef.current?.pause()
    } else {
      lottieRef.current?.play()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused])

  useEffect(() => {
    if (isPaused) return

    if (isStopped) {
      lottieRef.current?.stop()
    } else {
      lottieRef.current?.play()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStopped])

  return <Lottie lottieRef={lottieRef} {...props} />
}

interface PromiseAnimationProps extends Omit<ILottieComponentProps, 'animationData'> {
  animationData: Promise<any>
  loaderClassName: SkeletonProps['className']
  loaderSx: SkeletonProps['sx']
}

const PromiseLottieComponent: FC<PromiseAnimationProps> = ({
  animationData: animationDataPromise,
  loaderClassName,
  loaderSx,
  ...rest
}) => {
  const [animationData, setAnimationData] = React.useState<any>(null)

  useEffect(() => {
    const loadAnimation = async () => {
      const data = await animationDataPromise

      setAnimationData(data)
    }

    void loadAnimation()
  }, [animationDataPromise])

  // Renders
  if (!animationData) {
    return <Skeleton variant="rectangular" sx={loaderSx} className={loaderClassName} />
  }
  return <LottieComponent {...rest} animationData={animationData} />
}

export { PromiseLottieComponent }
