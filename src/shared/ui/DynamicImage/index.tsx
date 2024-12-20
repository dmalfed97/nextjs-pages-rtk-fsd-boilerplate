import React from 'react'
import type { FC } from 'react'
import Image from 'next/image'
import type { ImageProps } from 'next/image'

const DynamicImage: FC<ImageProps> = ({ alt, ...rest }) => (
  <Image alt={alt} {...rest} width={1920} height={0} />
)

export { DynamicImage }
